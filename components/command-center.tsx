"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Terminal, Play, Copy, Save, FileText, HelpCircle, AlertTriangle } from "lucide-react"
import { CommandInput } from "@/components/command-input"
import { CommandOutput } from "@/components/command-output"
import { ToolDocumentation } from "@/components/tool-documentation"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { toast } from "@/hooks/use-toast"

interface CommandCenterProps {
  currentTool: string
}

export function CommandCenter({ currentTool }: CommandCenterProps) {
  const [activeTab, setActiveTab] = useState("terminal")
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [outputContent, setOutputContent] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleCommandSubmit = async (command: string) => {
    setIsLoading(true)
    setError(null)

    try {
      // Parse the command to separate the tool name and parameters
      const fullCommand = command.trim()
      let toolName = currentTool
      let parameters = fullCommand

      // If the command starts with a tool name, use that instead of the current tool
      const allTools = ["nmap", "subfinder", "httpx", "gobuster", "ffuf", "nuclei", "theharvester", "dnsx", "nikto"]
      for (const tool of allTools) {
        if (fullCommand.startsWith(tool + " ")) {
          toolName = tool
          parameters = fullCommand.substring(tool.length).trim()
          break
        }
      }

      // Add command to history
      setCommandHistory((prev) => [...prev, fullCommand])

      // Update output with command being executed
      setOutputContent((prev) => `${prev ? prev + "\n\n" : ""}$ ${fullCommand}\n\nExecuting command...\n`)

      // Send the command to the appropriate route handler
      const response = await fetch(`/api/tools/${toolName}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ parameters }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to execute command")
      }

      // Update output with command result
      setOutputContent((prev) => {
        // Remove the "Executing command..." line
        const prevWithoutExecuting = prev.replace("Executing command...\n", "")
        return `${prevWithoutExecuting}${data.output}`
      })
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred"
      setError(errorMessage)
      setOutputContent((prev) => {
        // Remove the "Executing command..." line
        const prevWithoutExecuting = prev.replace("Executing command...\n", "")
        return `${prevWithoutExecuting}Error: ${errorMessage}`
      })

      toast({
        title: "Command Execution Failed",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleCopyOutput = () => {
    navigator.clipboard.writeText(outputContent)
    toast({
      title: "Copied to clipboard",
      description: "Command output has been copied to clipboard",
    })
  }

  const handleSaveOutput = () => {
    const blob = new Blob([outputContent], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${currentTool}-output-${new Date().toISOString().slice(0, 10)}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast({
      title: "Output saved",
      description: "Command output has been saved to a file",
    })
  }

  return (
    <div className="flex flex-col flex-1 h-full">
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <h2 className="text-lg font-semibold text-emerald-400">Command Center</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" className="border-gray-700 bg-gray-900 hover:bg-gray-800">
            <HelpCircle className="h-4 w-4 mr-2" />
            Help
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-gray-700 bg-gray-900 hover:bg-gray-800"
            onClick={handleSaveOutput}
            disabled={!outputContent}
          >
            <Save className="h-4 w-4 mr-2" />
            Save Session
          </Button>
        </div>
      </div>

      <Tabs defaultValue="terminal" className="flex-1 flex flex-col" onValueChange={setActiveTab}>
        <div className="border-b border-gray-800">
          <TabsList className="bg-gray-900 p-0">
            <TabsTrigger value="terminal" className="data-[state=active]:bg-gray-800">
              <Terminal className="h-4 w-4 mr-2" />
              Terminal
            </TabsTrigger>
            <TabsTrigger value="docs" className="data-[state=active]:bg-gray-800">
              <FileText className="h-4 w-4 mr-2" />
              Documentation
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="terminal" className="flex-1 flex flex-col p-0 m-0">
          <div className="flex-1 flex flex-col">
            <ScrollArea className="flex-1 p-4">
              {error && (
                <Alert variant="destructive" className="mb-4">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <CommandOutput content={outputContent} />
            </ScrollArea>

            <div className="p-4 border-t border-gray-800">
              <CommandInput onSubmit={handleCommandSubmit} isLoading={isLoading} currentTool={currentTool} />

              <div className="flex items-center justify-between mt-2">
                <div className="text-xs text-gray-500">
                  {currentTool && (
                    <span>
                      Current tool: <span className="text-emerald-400">{currentTool}</span>
                    </span>
                  )}
                </div>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-8 border-gray-700 bg-gray-900 hover:bg-gray-800"
                    onClick={handleCopyOutput}
                    disabled={!outputContent}
                  >
                    <Copy className="h-3.5 w-3.5 mr-1" />
                    Copy
                  </Button>
                  <Button
                    size="sm"
                    className="h-8 bg-emerald-600 hover:bg-emerald-700"
                    onClick={() => {
                      const inputElement = document.querySelector("textarea") as HTMLTextAreaElement
                      if (inputElement && inputElement.value) {
                        handleCommandSubmit(inputElement.value)
                      }
                    }}
                    disabled={isLoading}
                  >
                    <Play className="h-3.5 w-3.5 mr-1" />
                    Run
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="docs" className="flex-1 p-0 m-0">
          <ScrollArea className="h-full p-4">
            <ToolDocumentation tool={currentTool} />
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  )
}
