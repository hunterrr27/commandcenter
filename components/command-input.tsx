"use client"

import { useState, type KeyboardEvent, useEffect } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Loader2 } from "lucide-react"

interface CommandInputProps {
  onSubmit: (command: string) => void
  isLoading?: boolean
  currentTool: string
}

export function CommandInput({ onSubmit, isLoading = false, currentTool }: CommandInputProps) {
  const [command, setCommand] = useState("")

  // Update placeholder based on current tool
  const getPlaceholder = () => {
    switch (currentTool) {
      case "nmap":
        return "Enter nmap command (e.g., -sV 192.168.1.1)"
      case "subfinder":
        return "Enter subfinder command (e.g., -d example.com)"
      case "httpx":
        return "Enter httpx command (e.g., -u https://example.com)"
      case "gobuster":
        return "Enter gobuster command (e.g., dir -u https://example.com -w wordlist.txt)"
      case "ffuf":
        return "Enter ffuf command (e.g., -u https://example.com/FUZZ -w wordlist.txt)"
      case "nuclei":
        return "Enter nuclei command (e.g., -u https://example.com)"
      case "theharvester":
        return "Enter theharvester command (e.g., -d example.com -b google)"
      case "dnsx":
        return "Enter dnsx command (e.g., -a -resp -l domains.txt)"
      case "nikto":
        return "Enter nikto command (e.g., -h example.com)"
      default:
        return "Enter command..."
    }
  }

  // Update command when tool changes to prepend the tool name if not already present
  useEffect(() => {
    if (command && !command.startsWith(currentTool)) {
      // Only prepend if the command doesn't already start with a tool name
      const allTools = ["nmap", "subfinder", "httpx", "gobuster", "ffuf", "nuclei", "theharvester", "dnsx", "nikto"]
      const startsWithTool = allTools.some((tool) => command.startsWith(tool + " "))

      if (!startsWithTool) {
        setCommand(`${currentTool} ${command}`)
      }
    }
  }, [currentTool])

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      if (command.trim() && !isLoading) {
        onSubmit(command)
        setCommand("")
      }
    }
  }

  return (
    <div className="relative">
      <Textarea
        value={command}
        onChange={(e) => setCommand(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={getPlaceholder()}
        className="min-h-[60px] bg-gray-900 border-gray-700 text-gray-100 font-mono resize-none focus-visible:ring-emerald-500"
        disabled={isLoading}
      />
      {isLoading ? (
        <div className="absolute bottom-2 right-2 flex items-center text-xs text-gray-500">
          <Loader2 className="h-3 w-3 mr-1 animate-spin" />
          Executing...
        </div>
      ) : (
        <div className="absolute bottom-2 right-2 text-xs text-gray-500">Press Enter to execute</div>
      )}
    </div>
  )
}
