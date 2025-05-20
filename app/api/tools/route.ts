import { exec } from "child_process"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { command } = await request.json()

    if (!command) {
      return NextResponse.json({ error: "Command is required" }, { status: 400 })
    }

    // Execute the command
    const output = await executeCommand(command)

    return NextResponse.json({ output })
  } catch (error) {
    console.error("Error executing command:", error)
    return NextResponse.json({ error: "Failed to execute command" }, { status: 500 })
  }
}

function executeCommand(command: string): Promise<string> {
  return new Promise((resolve, reject) => {
    exec(command, { maxBuffer: 1024 * 1024 * 10 }, (error, stdout, stderr) => {
      if (error && !stdout) {
        reject(`Error: ${error.message}\n${stderr}`)
        return
      }

      // Return both stdout and stderr if available
      const output = stdout + (stderr ? `\nStderr: ${stderr}` : "")
      resolve(output)
    })
  })
}
