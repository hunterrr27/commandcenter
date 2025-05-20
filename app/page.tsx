"use client"

import { useState } from "react"
import { CommandCenter } from "@/components/command-center"
import { ToolsSidebar } from "@/components/tools-sidebar"
import { Button } from "@/components/ui/button"
import { Lightbulb } from "lucide-react"
import { useRouter } from "next/navigation"

export default function HomePage() {
  const [currentTool, setCurrentTool] = useState("nmap")
  const router = useRouter()

  return (
    <div className="flex h-screen bg-black text-gray-200">
      <ToolsSidebar currentTool={currentTool} onToolSelect={setCurrentTool} />
      <div className="flex flex-col flex-1">
        <div className="absolute top-4 right-4 z-10">
          <Button
            variant="outline"
            size="sm"
            className="border-gray-700 bg-gray-900 hover:bg-gray-800"
            onClick={() => router.push("/features")}
          >
            <Lightbulb className="h-4 w-4 mr-2 text-yellow-400" />
            Feature Ideas
          </Button>
        </div>
        <CommandCenter currentTool={currentTool} />
      </div>
    </div>
  )
}
