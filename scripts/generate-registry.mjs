#!/usr/bin/env node
// Regenerates registry.json from the actual component/hook source files,
// so adding a new component never requires hand-editing a manifest.
import { readdirSync, readFileSync, writeFileSync } from "node:fs"
import { join } from "node:path"

const ROOT = process.cwd()
const UI_DIR = "src/components/ui"
const HOOKS_DIR = "src/hooks"
const REGISTRY_ALIAS = "@me"
const HOMEPAGE = "https://christopherrangelux-dev.github.io/ui-registry/"

function listItemNames(dir, ext) {
  return readdirSync(join(ROOT, dir))
    .filter((f) => f.endsWith(ext))
    .map((f) => f.slice(0, -ext.length))
    .sort()
}

const uiNames = listItemNames(UI_DIR, ".tsx")
const hookNames = listItemNames(HOOKS_DIR, ".ts")
// "utils" is published as our own registry:lib item (src/lib/utils.ts) so
// every dependency resolves against @me instead of falling back to the
// default shadcn registry.
const knownItemNames = new Set([...uiNames, ...hookNames, "utils"])

function toPackageName(source) {
  const parts = source.split("/")
  return source.startsWith("@") ? parts.slice(0, 2).join("/") : parts[0]
}

function titleCase(name) {
  return name
    .split("-")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ")
}

function buildItem(name, relPath, type) {
  const content = readFileSync(join(ROOT, relPath), "utf8")
  const sources = [...content.matchAll(/from\s+["']([^"']+)["']/g)].map(
    (m) => m[1]
  )

  const dependencies = new Set()
  const registryDependencies = new Set()

  for (const source of sources) {
    if (
      source.startsWith("@/components/ui/") ||
      source.startsWith("@/hooks/") ||
      source === "@/lib/utils"
    ) {
      const depName = source.split("/").pop()
      if (knownItemNames.has(depName) && depName !== name) {
        registryDependencies.add(`${REGISTRY_ALIAS}/${depName}`)
      }
    } else if (source.startsWith("@/") || source.startsWith(".")) {
      // internal alias/relative import with no registry counterpart - skip
    } else if (source !== "react" && source !== "react-dom") {
      dependencies.add(toPackageName(source))
    }
  }

  return {
    name,
    type,
    title: titleCase(name),
    description: `${titleCase(name)} component.`,
    ...(registryDependencies.size && {
      registryDependencies: [...registryDependencies].sort(),
    }),
    ...(dependencies.size && { dependencies: [...dependencies].sort() }),
    files: [{ path: relPath, type }],
  }
}

const items = [
  buildItem("utils", "src/lib/utils.ts", "registry:lib"),
  ...uiNames.map((name) => buildItem(name, `${UI_DIR}/${name}.tsx`, "registry:ui")),
  ...hookNames.map((name) => buildItem(name, `${HOOKS_DIR}/${name}.ts`, "registry:hook")),
]

const registry = {
  $schema: "https://ui.shadcn.com/schema/registry.json",
  name: "ui-registry",
  homepage: HOMEPAGE,
  items,
}

writeFileSync(join(ROOT, "registry.json"), JSON.stringify(registry, null, 2) + "\n")
console.log(`Generated registry.json with ${items.length} items.`)
