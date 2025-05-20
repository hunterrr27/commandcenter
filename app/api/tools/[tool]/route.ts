import { exec } from "child_process";
import { type NextRequest, NextResponse } from "next/server";
import path from "path";

const wordlistDir = path.join(process.cwd(), "wordlists");

// Define tool-specific validation and execution logic
const toolHandlers: Record<string, (params: string) => { command: string; isValid: boolean; error?: string }> = {
  nmap: (params) => {
    return { command: `nmap ${params}`, isValid: true };
  },

  subfinder: (params) => {
    if (!params.includes("-d ")) {
      return { command: "", isValid: false, error: "Domain parameter (-d) is required for subfinder" };
    }
    return { command: `subfinder ${params}`, isValid: true };
  },

  httpx: (params) => {
    return { command: `httpx ${params}`, isValid: true };
  },

  gobuster: (params) => {
    const modeMatch = params.match(/^(dir|dns|vhost|fuzz)/);
    const mode = modeMatch?.[1];

    if (!mode) {
      return { command: "", isValid: false, error: "Mode (dir, dns, vhost, fuzz) is required for gobuster" };
    }

    const requiresUrl = ["dir", "vhost", "fuzz"].includes(mode);
    const requiresDomain = mode === "dns";

    if (requiresUrl && !params.includes("-u ")) {
      return { command: "", isValid: false, error: "URL parameter (-u) is required for gobuster in this mode" };
    }

    if (requiresDomain && !params.includes("-d ")) {
      return { command: "", isValid: false, error: "Domain parameter (-d) is required for gobuster dns mode" };
    }

    const hasWordlist = params.includes("-w ");
    const defaultWordlist = path.join(wordlistDir, `${mode}-small.txt`);
    const finalParams = hasWordlist ? params : `${params} -w ${defaultWordlist}`;

    return {
      command: `gobuster ${finalParams}`,
      isValid: true,
    };
  },

  ffuf: (params) => {
    if (!params.includes("-u ")) {
      return { command: "", isValid: false, error: "URL parameter (-u) is required for ffuf" };
    }
    return { command: `ffuf ${params}`, isValid: true };
  },

  nuclei: (params) => {
    if (!params.includes("-u ") && !params.includes("-l ")) {
      return { command: "", isValid: false, error: "Target parameter (-u or -l) is required for nuclei" };
    }
    return { command: `nuclei ${params}`, isValid: true };
  },

  theharvester: (params) => {
    if (!params.includes("-d ")) {
      return { command: "", isValid: false, error: "Domain parameter (-d) is required for theharvester" };
    }
    return { command: `theHarvester ${params}`, isValid: true };
  },

  dnsx: (params) => {
    return { command: `dnsx ${params}`, isValid: true };
  },

  nikto: (params) => {
    if (!params.includes("-h ")) {
      return { command: "", isValid: false, error: "Host parameter (-h) is required for nikto" };
    }
    return { command: `nikto ${params}`, isValid: true };
  },
};

export async function POST(request: NextRequest, { params }: { params: { tool: string } }) {
  try {
    const { tool } = params;
    const { parameters } = await request.json();

    if (!toolHandlers[tool]) {
      return NextResponse.json({ error: `Unsupported tool: ${tool}` }, { status: 400 });
    }

    const { command, isValid, error } = toolHandlers[tool](parameters);

    if (!isValid) {
      return NextResponse.json({ error }, { status: 400 });
    }

    const output = await executeCommand(command);
    return NextResponse.json({ output });
  } catch (error) {
    console.error("Error executing command:", error);
    return NextResponse.json({ error: "Failed to execute command" }, { status: 500 });
  }
}

function executeCommand(command: string): Promise<string> {
  return new Promise((resolve, reject) => {
    exec(command, { maxBuffer: 1024 * 1024 * 10 }, (error, stdout, stderr) => {
      if (error && !stdout) {
        reject(`Error: ${error.message}\n${stderr}`);
        return;
      }
      const output = stdout + (stderr ? `\nStderr: ${stderr}` : "");
      resolve(output);
    });
  });
}
