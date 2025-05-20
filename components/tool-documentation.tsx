import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { InfoIcon, Terminal } from "lucide-react"

interface ToolDocumentationProps {
  tool: string
}

export function ToolDocumentation({ tool }: ToolDocumentationProps) {
  const toolDocs = getToolDocumentation(tool)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-emerald-400">{toolDocs.name}</h2>
        <p className="text-gray-400 mt-1">{toolDocs.description}</p>
      </div>

      <Alert className="bg-gray-900 border-emerald-800">
        <InfoIcon className="h-4 w-4 text-emerald-400" />
        <AlertTitle>Installation Note</AlertTitle>
        <AlertDescription>
          This tool requires {toolDocs.name} to be installed on your server. If you haven't installed it yet, please
          follow the installation instructions for your operating system.
        </AlertDescription>
      </Alert>

      <div>
        <h3 className="text-lg font-semibold mb-2">Common Usage</h3>
        <div className="bg-gray-900 p-3 rounded-md border border-gray-800 font-mono text-sm">{toolDocs.usage}</div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Common Options</h3>
        <div className="space-y-2">
          {toolDocs.options.map((option, index) => (
            <div key={index} className="bg-gray-900 p-3 rounded-md border border-gray-800">
              <div className="font-mono text-emerald-400">{option.flag}</div>
              <div className="text-sm text-gray-300 mt-1">{option.description}</div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Examples</h3>
        <div className="space-y-3">
          {toolDocs.examples.map((example, index) => (
            <div key={index} className="space-y-1">
              <div className="font-mono text-sm bg-gray-900 p-2 rounded-md border border-gray-800 flex items-center">
                <Terminal className="h-3 w-3 mr-2 text-emerald-400" />
                {example.command}
              </div>
              <p className="text-sm text-gray-400">{example.description}</p>
              <Separator className="bg-gray-800 my-2" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function getToolDocumentation(tool: string) {
  const docs = {
    nmap: {
      name: "Nmap",
      description: "Network Mapper - A powerful network scanning and host discovery tool",
      usage: "nmap [Scan Type] [Options] {target}",
      options: [
        { flag: "-sS", description: "TCP SYN scan (Default)" },
        { flag: "-sV", description: "Version detection" },
        { flag: "-p <port ranges>", description: "Only scan specified ports" },
        { flag: "-A", description: "Enable OS detection, version detection, script scanning, and traceroute" },
        { flag: "-T<0-5>", description: "Set timing template (higher is faster)" },
      ],
      examples: [
        {
          command: "nmap -sV -p 1-1000 192.168.1.1",
          description: "Scan ports 1-1000 on 192.168.1.1 and determine service versions",
        },
        {
          command: "nmap -A 192.168.1.0/24",
          description: "Aggressive scan of entire subnet",
        },
        {
          command: "nmap -sS -T4 example.com",
          description: "Fast SYN scan of a domain",
        },
      ],
    },
    subfinder: {
      name: "Subfinder",
      description: "A subdomain discovery tool that discovers valid subdomains for websites",
      usage: "subfinder -d <domain>",
      options: [
        { flag: "-d", description: "Domain to find subdomains for" },
        { flag: "-o", description: "File to write output to" },
        { flag: "-silent", description: "Show only subdomains in output" },
        { flag: "-all", description: "Use all sources for enumeration" },
        { flag: "-t", description: "Number of concurrent threads" },
      ],
      examples: [
        {
          command: "subfinder -d example.com",
          description: "Find subdomains for example.com",
        },
        {
          command: "subfinder -d example.com -o results.txt",
          description: "Save results to a file",
        },
        {
          command: "subfinder -d example.com -silent | httpx",
          description: "Pipe results to httpx to check for live subdomains",
        },
      ],
    },
    httpx: {
      name: "Httpx",
      description: "A fast and multi-purpose HTTP toolkit that allows running multiple probes",
      usage: "httpx -u <url> [options]",
      options: [
        { flag: "-u", description: "URL to probe" },
        { flag: "-l", description: "File containing URLs to probe" },
        { flag: "-silent", description: "Silent mode" },
        { flag: "-title", description: "Extract page title" },
        { flag: "-status-code", description: "Display status code" },
      ],
      examples: [
        {
          command: "httpx -u https://example.com",
          description: "Probe a single URL",
        },
        {
          command: "cat domains.txt | httpx -silent",
          description: "Probe multiple domains from a file",
        },
        {
          command: "subfinder -d example.com -silent | httpx -title -status-code",
          description: "Chain with subfinder to find live subdomains with titles and status codes",
        },
      ],
    },
    gobuster: {
      name: "Gobuster",
      description: "Directory/file & DNS busting tool written in Go",
      usage: "gobuster [mode] [options]",
      options: [
        { flag: "dir", description: "Directory/file enumeration mode" },
        { flag: "dns", description: "DNS subdomain enumeration mode" },
        { flag: "-u", description: "URL to scan" },
        { flag: "-w", description: "Wordlist to use" },
        { flag: "-t", description: "Number of concurrent threads" },
      ],
      examples: [
        {
          command: "gobuster dir -u https://example.com -w /usr/share/wordlists/dirb/common.txt",
          description: "Directory scan using common wordlist",
        },
        {
          command: "gobuster dns -d example.com -w subdomains.txt",
          description: "DNS subdomain enumeration",
        },
        {
          command: "gobuster dir -u https://example.com -w wordlist.txt -t 50",
          description: "Directory scan with 50 threads",
        },
      ],
    },
    ffuf: {
      name: "Ffuf",
      description: "Fast web fuzzer written in Go",
      usage: "ffuf -u <url> -w <wordlist>",
      options: [
        { flag: "-u", description: "Target URL" },
        { flag: "-w", description: "Wordlist file path and position (e.g., -w wordlist.txt:FUZZ)" },
        { flag: "-c", description: "Colorize output" },
        { flag: "-v", description: "Verbose output" },
        { flag: "-mc", description: "Match HTTP status codes" },
      ],
      examples: [
        {
          command: "ffuf -u https://example.com/FUZZ -w /path/to/wordlist.txt",
          description: "Basic directory fuzzing",
        },
        {
          command: "ffuf -u https://example.com/FUZZ -w wordlist.txt -mc 200,301",
          description: "Only show responses with status codes 200 and 301",
        },
        {
          command: "ffuf -u https://example.com/api/v1/FUZZ -w params.txt -X POST -d 'id=FUZZ'",
          description: "Fuzz POST parameters",
        },
      ],
    },
    nuclei: {
      name: "Nuclei",
      description: "Fast and customizable vulnerability scanner based on templates",
      usage: "nuclei -u <url> [options]",
      options: [
        { flag: "-u", description: "Target URL" },
        { flag: "-l", description: "Path to file containing URLs/hosts to scan" },
        { flag: "-t", description: "Template or template directory to use" },
        { flag: "-c", description: "Maximum number of templates to execute in parallel" },
        { flag: "-severity", description: "Filter by severity (info, low, medium, high, critical)" },
      ],
      examples: [
        {
          command: "nuclei -u https://example.com",
          description: "Scan a target with default templates",
        },
        {
          command: "nuclei -l urls.txt -t cves/ -severity critical,high",
          description: "Scan multiple targets with CVE templates, only showing critical and high severity findings",
        },
        {
          command: "nuclei -u https://example.com -t exposures/",
          description: "Scan for exposed sensitive files and directories",
        },
      ],
    },
    theharvester: {
      name: "TheHarvester",
      description: "Tool for gathering e-mail accounts, subdomains, and names from different public sources",
      usage: "theharvester -d <domain> -b <source>",
      options: [
        { flag: "-d", description: "Domain to search" },
        { flag: "-b", description: "Data source (google, linkedin, github, etc.)" },
        { flag: "-l", description: "Limit results" },
        { flag: "-f", description: "Save results to file" },
        { flag: "-c", description: "Perform DNS brute force" },
      ],
      examples: [
        {
          command: "theharvester -d example.com -b google",
          description: "Search for example.com in Google",
        },
        {
          command: "theharvester -d example.com -b all -l 500",
          description: "Search all sources with a limit of 500 results",
        },
        {
          command: "theharvester -d example.com -b linkedin -f output.html",
          description: "Search LinkedIn and save results to HTML file",
        },
      ],
    },
    dnsx: {
      name: "Dnsx",
      description: "Fast and multi-purpose DNS toolkit designed for running DNS queries",
      usage: "dnsx -l <list> [options]",
      options: [
        { flag: "-l", description: "File containing list of domains to resolve" },
        { flag: "-a", description: "Display A record" },
        { flag: "-aaaa", description: "Display AAAA record" },
        { flag: "-cname", description: "Display CNAME record" },
        { flag: "-resp", description: "Display DNS response" },
      ],
      examples: [
        {
          command: "dnsx -l domains.txt -a -resp",
          description: "Resolve A records for domains in file and show responses",
        },
        {
          command: "echo example.com | dnsx -a -aaaa -cname",
          description: "Get A, AAAA, and CNAME records for a single domain",
        },
        {
          command: "subfinder -d example.com | dnsx -silent -a -resp",
          description: "Chain with subfinder to resolve discovered subdomains",
        },
      ],
    },
    nikto: {
      name: "Nikto",
      description: "Web server scanner which performs comprehensive tests against web servers for multiple items",
      usage: "nikto -h <host>",
      options: [
        { flag: "-h", description: "Target host" },
        { flag: "-p", description: "Port to use (default 80)" },
        { flag: "-ssl", description: "Force SSL mode" },
        { flag: "-Tuning", description: "Scan tuning options" },
        { flag: "-output", description: "Write output to a file" },
      ],
      examples: [
        {
          command: "nikto -h example.com",
          description: "Basic scan of a website",
        },
        {
          command: "nikto -h example.com -p 443 -ssl",
          description: "Scan HTTPS site on port 443",
        },
        {
          command: "nikto -h example.com -Tuning x6 -output nikto-results.txt",
          description: "Scan for XSS vulnerabilities and save results to file",
        },
      ],
    },
  }

  return (
    docs[tool as keyof typeof docs] || {
      name: tool,
      description: "Documentation not available",
      usage: `${tool} [options]`,
      options: [{ flag: "--help", description: "Show help" }],
      examples: [{ command: `${tool} --help`, description: "Show help information" }],
    }
  )
}
