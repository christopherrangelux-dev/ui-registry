import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="space-y-3">
      <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
        {title}
      </h2>
      <div className="flex flex-wrap items-center gap-3">{children}</div>
    </section>
  )
}

const COLOR_SCALES = [
  "gray",
  "blue",
  "red",
  "amber",
  "green",
  "teal",
  "purple",
  "pink",
] as const

function ColorScale({ name }: { name: string }) {
  const steps = Array.from({ length: 12 }, (_, i) => i + 1)
  return (
    <div className="flex items-center gap-3">
      <span className="w-16 shrink-0 text-sm font-medium capitalize">
        {name}
      </span>
      <div className="flex flex-1 overflow-hidden rounded-md">
        {steps.map((step) => (
          <div
            key={step}
            className="h-8 flex-1"
            style={{ background: `var(--${name}-${step})` }}
            title={`--${name}-${step}`}
          />
        ))}
      </div>
    </div>
  )
}

function App() {
  return (
    <div className="mx-auto max-w-3xl space-y-10 px-6 py-12">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold">ui-registry</h1>
        <p className="text-muted-foreground">
          Personal component registry &mdash; preview of every component
          available via{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm">
            npx shadcn add @me/&lt;name&gt;
          </code>
          .
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
          Colors
        </h2>
        <div className="space-y-2">
          {COLOR_SCALES.map((name) => (
            <ColorScale key={name} name={name} />
          ))}
        </div>
      </section>

      <Section title="Button">
        <Button>Default</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="destructive">Destructive</Button>
      </Section>

      <Section title="Badge">
        <Badge>Default</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="outline">Outline</Badge>
        <Badge variant="destructive">Destructive</Badge>
      </Section>

      <Section title="Input">
        <Input placeholder="you@example.com" className="max-w-xs" />
      </Section>

      <Section title="Card">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Card title</CardTitle>
            <CardDescription>Card description goes here.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm">Card body content.</p>
          </CardContent>
        </Card>
      </Section>

      <Section title="Dialog">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Open dialog</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Dialog title</DialogTitle>
              <DialogDescription>
                Dialog description goes here.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button>Confirm</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </Section>

      <Section title="Switch / Checkbox">
        <Switch defaultChecked />
        <Checkbox defaultChecked />
      </Section>

      <Section title="Avatar">
        <Avatar>
          <AvatarFallback>CR</AvatarFallback>
        </Avatar>
      </Section>

      <Section title="Progress">
        <Progress value={66} className="max-w-xs" />
      </Section>

      <Section title="Tooltip">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline">Hover me</Button>
          </TooltipTrigger>
          <TooltipContent>Tooltip content</TooltipContent>
        </Tooltip>
      </Section>

      <section className="space-y-3">
        <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
          Alert
        </h2>
        <Alert>
          <AlertTitle>Heads up</AlertTitle>
          <AlertDescription>Alert description goes here.</AlertDescription>
        </Alert>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
          Tabs
        </h2>
        <Tabs defaultValue="one" className="max-w-sm">
          <TabsList>
            <TabsTrigger value="one">One</TabsTrigger>
            <TabsTrigger value="two">Two</TabsTrigger>
          </TabsList>
          <TabsContent value="one">Tab one content.</TabsContent>
          <TabsContent value="two">Tab two content.</TabsContent>
        </Tabs>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
          Accordion
        </h2>
        <Accordion type="single" collapsible className="max-w-sm">
          <AccordionItem value="item-1">
            <AccordionTrigger>Section one</AccordionTrigger>
            <AccordionContent>Section one content.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Section two</AccordionTrigger>
            <AccordionContent>Section two content.</AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      <Separator />

      <p className="text-sm text-muted-foreground">
        56 components total — see{" "}
        <a
          href="https://github.com/christopherrangelux-dev/ui-registry"
          className="underline"
        >
          the repo
        </a>{" "}
        for the full list available via{" "}
        <code className="rounded bg-muted px-1.5 py-0.5">
          npx shadcn add @me/&lt;name&gt;
        </code>
        .
      </p>
    </div>
  )
}

function AppWithProviders() {
  return (
    <TooltipProvider>
      <App />
    </TooltipProvider>
  )
}

export default AppWithProviders
