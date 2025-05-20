import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart3,
  BookMarked,
  Calendar,
  Clock,
  Code2,
  Cog,
  FileText,
  History,
  LayoutGrid,
  Lightbulb,
  Repeat,
  Share2,
  Sparkles,
  Target,
  Workflow,
} from "lucide-react"

export function FeatureSuggestions() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-emerald-400 mb-6">Potential Features</h2>

      <Tabs defaultValue="productivity">
        <TabsList className="bg-gray-900 mb-6">
          <TabsTrigger value="productivity">Productivity</TabsTrigger>
          <TabsTrigger value="visualization">Visualization</TabsTrigger>
          <TabsTrigger value="collaboration">Collaboration</TabsTrigger>
          <TabsTrigger value="customization">Customization</TabsTrigger>
        </TabsList>

        <TabsContent value="productivity" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <FeatureCard
              icon={<BookMarked className="h-5 w-5 text-emerald-400" />}
              title="Command Templates"
              description="Save and reuse common command patterns with variable placeholders"
            />
            <FeatureCard
              icon={<Workflow className="h-5 w-5 text-emerald-400" />}
              title="Command Chaining"
              description="Create workflows by chaining multiple tools together with piping"
            />
            <FeatureCard
              icon={<Repeat className="h-5 w-5 text-emerald-400" />}
              title="Scheduled Scans"
              description="Set up recurring scans to run at specified intervals"
            />
            <FeatureCard
              icon={<History className="h-5 w-5 text-emerald-400" />}
              title="Advanced History"
              description="Search, filter, and reuse commands from your history"
            />
            <FeatureCard
              icon={<Target className="h-5 w-5 text-emerald-400" />}
              title="Target Management"
              description="Save and organize target information for quick access"
            />
            <FeatureCard
              icon={<Clock className="h-5 w-5 text-emerald-400" />}
              title="Background Jobs"
              description="Run commands in the background and get notified when complete"
            />
          </div>
        </TabsContent>

        <TabsContent value="visualization" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <FeatureCard
              icon={<BarChart3 className="h-5 w-5 text-emerald-400" />}
              title="Result Visualization"
              description="View scan results as interactive charts and graphs"
            />
            <FeatureCard
              icon={<LayoutGrid className="h-5 w-5 text-emerald-400" />}
              title="Split View"
              description="Run and view multiple commands side by side"
            />
            <FeatureCard
              icon={<FileText className="h-5 w-5 text-emerald-400" />}
              title="Report Generation"
              description="Create professional PDF reports from scan results"
            />
            <FeatureCard
              icon={<Calendar className="h-5 w-5 text-emerald-400" />}
              title="Timeline View"
              description="View scan history and changes over time"
            />
            <FeatureCard
              icon={<Sparkles className="h-5 w-5 text-emerald-400" />}
              title="Diff Comparison"
              description="Compare results between different scans to identify changes"
            />
          </div>
        </TabsContent>

        <TabsContent value="collaboration" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <FeatureCard
              icon={<Share2 className="h-5 w-5 text-emerald-400" />}
              title="Team Sharing"
              description="Share results and workflows with team members"
            />
            <FeatureCard
              icon={<Lightbulb className="h-5 w-5 text-emerald-400" />}
              title="Command Suggestions"
              description="AI-powered suggestions based on your usage patterns"
            />
            <FeatureCard
              icon={<FileText className="h-5 w-5 text-emerald-400" />}
              title="Collaborative Reports"
              description="Create and edit reports with team members in real-time"
            />
          </div>
        </TabsContent>

        <TabsContent value="customization" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <FeatureCard
              icon={<Code2 className="h-5 w-5 text-emerald-400" />}
              title="Custom Tool Integration"
              description="Add your own tools and scripts to the platform"
            />
            <FeatureCard
              icon={<Cog className="h-5 w-5 text-emerald-400" />}
              title="Keyboard Shortcuts"
              description="Customize keyboard shortcuts for faster workflow"
            />
            <FeatureCard
              icon={<Workflow className="h-5 w-5 text-emerald-400" />}
              title="Custom Workflows"
              description="Create and save complex multi-tool workflows"
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          {icon}
          <CardTitle className="text-base">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-gray-400">{description}</CardDescription>
      </CardContent>
    </Card>
  )
}
