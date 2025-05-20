"use client"

import { useEffect, useRef } from "react"

interface CommandOutputProps {
  content: string
}

export function CommandOutput({ content }: CommandOutputProps) {
  const outputRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight
    }
  }, [content])

  if (!content) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        <p>No command output yet. Enter a command to get started.</p>
      </div>
    )
  }

  // Process the content to add styling
  const processedContent = content
    .split("\n")
    .map((line, index) => {
      if (line.startsWith("$")) {
        return `<span class="command">${line}</span>`
      } else if (line.toLowerCase().includes("error") || line.toLowerCase().includes("failed")) {
        return `<span class="error">${line}</span>`
      } else if (line.toLowerCase().includes("warning")) {
        return `<span class="warning">${line}</span>`
      } else if (line.toLowerCase().includes("success") || line.toLowerCase().includes("completed")) {
        return `<span class="success">${line}</span>`
      } else if (line.startsWith("Executing")) {
        return `<span class="info">${line}</span>`
      }
      return line
    })
    .join("\n")

  return (
    <div
      ref={outputRef}
      className="terminal-output font-mono text-sm whitespace-pre-wrap bg-gray-950 p-4 rounded-md border border-gray-800"
      dangerouslySetInnerHTML={{ __html: processedContent }}
    />
  )
}
