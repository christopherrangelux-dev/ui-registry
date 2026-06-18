# ui-registry

Personal shadcn-style component registry. Components in `src/components/ui/`
are customized once, here, and reused across every other project in this
workspace via the shadcn CLI — instead of re-customizing shadcn/ui from
scratch each time a new project starts.

The site itself (deployed via GitHub Pages) doubles as a live style guide
(`src/App.tsx`) so you can see the current look at a glance.

## Status

The component *pipeline* is set up (init → customize → build → publish), but
the actual color/spacing "vibe" still uses shadcn's default tokens in
`src/index.css`. Customizing those values is the next step — either by hand
(OKLCH color vars under `:root` / `.dark`), or via a tool like
[tweakcn](https://tweakcn.com) that exports this same CSS-variable format.

## Adding/updating components

```bash
npx shadcn@latest add <component>   # pull in a new base component to customize
npm run registry:build              # regenerate public/r/*.json from registry.json
```

Don't forget to add new components to `registry.json` so they're included in
the build.

## Using this registry from another project

In any new project's `components.json`, add:

```json
{
  "registries": {
    "@me": "https://christopherrangelux-dev.github.io/ui-registry/r/{name}.json"
  }
}
```

Then pull components the same way you would from the official registry:

```bash
npx shadcn@latest add @me/button
```
