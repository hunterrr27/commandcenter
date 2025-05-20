import { exec } from "child_process"
import { type NextRequest, NextResponse } from "next/server"

// Define tool-specific validation and execution logic
const toolHandlers: Record<string, (params: string) => { command: string; isValid: boolean; error?: string }> = {
  nmap: (params) => {
    // Basic validation for nmap
    if (params.includes("--script=http-vuln")) {
      return {
        command: `nmap ${params}`,
        isValid: true,
      }
    }
    return {
      command: `nmap ${params}`,
      isValid: true,
    }
  },

  subfinder: (params) => {
    // Ensure domain is provided
    if (!params.includes("-d ")) {
      return {
        command: "",
        isValid: false,
        error: "Domain parameter (-d) is required for subfinder",
      }
    }
    return {
      command: `subfinder ${params}`,
      isValid: true,
    }
  },

  httpx: (params) => {
    return {
      command: `httpx ${params}`,
      isValid: true,
    }
  },

  gobuster: (params) => {
    // Ensure mode and URL are provided
    if (!params.match(/(dir|dns|vhost|fuzz)\s/)) {
      return {
        command: "",
        isValid: false,
        error: "Mode (dir, dns, vhost, fuzz) is required for gobuster",
      }
    }
    if (!params.includes("-u ")) {
      return {
        command: "",
        isValid: false,
        error: "URL parameter (-u) is required for gobuster",
      }
    }
    return {
      command: `gobuster ${params}`,
      isValid: true,
    }
  },

  ffuf: (params) => {
    // Ensure URL is provided
    if (!params.includes("-u ")) {
      return {
        command: "",
        isValid: false,
        error: "URL parameter (-u) is required for ffuf",
      }
    }
    return {
      command: `ffuf ${params}`,
      isValid: true,
    }
  },

  nuclei: (params) => {
    // Ensure target is provided
    if (!params.includes("-u ") && !params.includes("-l ")) {
      return {
        command: "",
        isValid: false,
        error: "Target parameter (-u or -l) is required for nuclei",
      }
    }
    return {
      command: `nuclei ${params}`,
      isValid: true,
    }
  },

  theharvester: (params) => {
    // Ensure domain is provided
    if (!params.includes("-d ")) {
      return {
        command: "",
        isValid: false,
        error: "Domain parameter (-d) is required for theharvester",
      }
    }
    return {
      command: `theHarvester ${params}`,
      isValid: true,
    }
  },

  dnsx: (params) => {
    return {
      command: `dnsx ${params}`,
      isValid: true,
    }
  },

  nikto: (params) => {
    // Ensure host is provided
    if (!params.includes("-h ")) {
      return {
        command: "",
        isValid: false,
        error: "Host parameter (-h) is required for nikto",
      }
    }
    return {
      command: `nikto ${params}`,
      isValid: true,
    }
  },
}

export async function POST(request: NextRequest, { params }: { params: { tool: string } }) {
  try {
    const { tool } = await params
    const { parameters } = await request.json()

    // Check if the tool is supported
    if (!toolHandlers[tool]) {
      return NextResponse.json({ error: `Unsupported tool: ${tool}` }, { status: 400 })
    }

    // Validate and build the command
    const { command, isValid, error } = toolHandlers[tool](parameters)

    if (!isValid) {
      return NextResponse.json({ error }, { status: 400 })
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
