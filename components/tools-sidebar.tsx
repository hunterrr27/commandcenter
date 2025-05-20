"use client"

import { Separator } from "@/components/ui/separator"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Bug, Globe, Network, Search, Shield } from "lucide-react"

const networkTools = [
  { name: "nmap", description: "Network scanning tool" },
  { name: "dnsx", description: "DNS toolkit" },
]

const webTools = [
  { name: "httpx", description: "HTTP probing tool" },
  { name: "gobuster", description: "Directory/file brute forcing" },
  { name: "ffuf", description: "Fast web fuzzer" },
  { name: "nikto", description: "Web server scanner" },
]

const reconTools = [
  { name: "subfinder", description: "Subdomain discovery tool" },
  { name: "theharvester", description: "Email and subdomain harvesting" },
]

const vulnTools = [{ name: "nuclei", description: "Vulnerability scanner" }]

interface ToolsSidebarProps {
  currentTool: string
  onToolSelect: (tool: string) => void
}

export function ToolsSidebar({ currentTool, onToolSelect }: ToolsSidebarProps) {
  return (
    <Sidebar variant="sidebar" className="border-r border-gray-800 bg-gray-950">
      <SidebarHeader className="py-4">
        <div className="flex items-center px-4">
          <Shield className="h-6 w-6 text-emerald-500" />
          <h1 className="ml-2 text-xl font-bold text-emerald-500">InsiderLab</h1>
        </div>
      </SidebarHeader>
      <Separator className="bg-gray-800" />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-400">Network Tools</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {networkTools.map((tool) => (
                <SidebarMenuItem key={tool.name}>
                  <SidebarMenuButton
                    tooltip={tool.description}
                    isActive={currentTool === tool.name}
                    onClick={() => onToolSelect(tool.name)}
                  >
                    <Network className="h-4 w-4 text-blue-400" />
                    <span>{tool.name}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-400">Web Tools</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {webTools.map((tool) => (
                <SidebarMenuItem key={tool.name}>
                  <SidebarMenuButton
                    tooltip={tool.description}
                    isActive={currentTool === tool.name}
                    onClick={() => onToolSelect(tool.name)}
                  >
                    <Globe className="h-4 w-4 text-purple-400" />
                    <span>{tool.name}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-400">Reconnaissance</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {reconTools.map((tool) => (
                <SidebarMenuItem key={tool.name}>
                  <SidebarMenuButton
                    tooltip={tool.description}
                    isActive={currentTool === tool.name}
                    onClick={() => onToolSelect(tool.name)}
                  >
                    <Search className="h-4 w-4 text-yellow-400" />
                    <span>{tool.name}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-400">Vulnerability Scanning</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {vulnTools.map((tool) => (
                <SidebarMenuItem key={tool.name}>
                  <SidebarMenuButton
                    tooltip={tool.description}
                    isActive={currentTool === tool.name}
                    onClick={() => onToolSelect(tool.name)}
                  >
                    <Bug className="h-4 w-4 text-red-400" />
                    <span>{tool.name}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
