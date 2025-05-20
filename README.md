````markdown
# InsiderLab Command Center - Security CLI Tools Aggregator

<p align="center">
  <img src="/images/InsiderLab Command Center-banner.png" alt="InsiderLab Command Center Banner">
</p>

InsiderLab Command Center is an open-source web application that aggregates common hacking and bug bounty CLI tools into a single, user-friendly interface. It empowers security professionals to execute various security tools directly from their browser while harnessing the full potential of command-line utilities.

## 🚀 Features

- **Unified Interface**: Access a multitude of security tools from a centralized dashboard.
- **Tool Documentation**: Integrated documentation for all supported tools at your fingertips.
- **Command History**: Effortlessly track and reuse your previous commands.
- **Output Management**: Conveniently save, copy, and format command outputs.
- **Terminal Experience**: Enjoy a familiar terminal-like interface enhanced with the Ubuntu Mono font.

## 📋 Supported Tools

### Network Tools
- **nmap**: Network scanning and host discovery powerhouse.
- **dnsx**: Versatile DNS toolkit for executing various DNS queries.

### Web Tools
- **httpx**: Robust HTTP toolkit for probing and analyzing web servers.
- **gobuster**: Efficient directory, file, and DNS busting tool.
- **ffuf**: Lightning-fast web fuzzer for content discovery.
- **nikto**: Comprehensive web server scanner for identifying vulnerabilities.

### Reconnaissance Tools
- **subfinder**: Advanced subdomain discovery tool for expanding your attack surface knowledge.
- **theharvester**: Powerful tool for gathering critical intelligence like emails, subdomains, and names.

### Vulnerability Scanning
- **nuclei**: Rapid and highly customizable vulnerability scanner leveraging template-based detection.

## 🔧 Installation

### Prerequisites

- **Node.js**: Version 18.x or higher is required.
- **Security Tools**: Ensure the security tools you intend to use are already installed on your server.

### Installing InsiderLab Command Center

1. **Clone the Repository**:
   ```bash
   git clone [https://github.com/yourusername/InsiderLab](https://github.com/yourusername/InsiderLab) Command Center.git
   cd InsiderLab Command Center
````

2.  **Install Dependencies**:

    ```bash
    npm install
    ```

3.  **Build the Application**:

    ```bash
    npm run build
    ```

4.  **Start the Server**:

    ```bash
    npm start
    ```

5.  **Access the Application**: Open your web browser and navigate to `http://localhost:3000`.

### Installing Security Tools

For InsiderLab Command Center to function correctly, the underlying security tools must be installed on your server's operating system. Below are installation guides for popular tools on common platforms.

#### Ubuntu/Debian

```bash
# Update package lists
sudo apt update

# Install nmap
sudo apt install nmap

# Install nikto
sudo apt install nikto

# Install Go (required for many modern security tools)
sudo apt install golang-go

# Install Go-based tools
go install -v [github.com/projectdiscovery/subfinder/v2/cmd/subfinder@latest](https://github.com/projectdiscovery/subfinder/v2/cmd/subfinder@latest)
go install -v [github.com/projectdiscovery/httpx/cmd/httpx@latest](https://github.com/projectdiscovery/httpx/cmd/httpx@latest)
go install -v [github.com/projectdiscovery/dnsx/cmd/dnsx@latest](https://github.com/projectdiscovery/dnsx/cmd/dnsx@latest)
go install -v [github.com/projectdiscovery/nuclei/v2/cmd/nuclei@latest](https://github.com/projectdiscovery/nuclei/v2/cmd/nuclei@latest)
go install -v [github.com/OJ/gobuster/v3@latest](https://github.com/OJ/gobuster/v3@latest)
go install -v [github.com/ffuf/ffuf@latest](https://github.com/ffuf/ffuf@latest)

# Ensure Go binaries are in your PATH
echo 'export PATH=$PATH:~/go/bin' >> ~/.bashrc
source ~/.bashrc

# Install TheHarvester
git clone [https://github.com/laramies/theHarvester.git](https://github.com/laramies/theHarvester.git)
cd theHarvester
pip3 install -r requirements.txt
```

#### macOS

```bash
# Install Homebrew if not already installed
/bin/bash -c "$(curl -fsSL [https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh](https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh))"

# Install tools
brew install nmap nikto
brew install go

# Install Go-based tools
go install -v [github.com/projectdiscovery/subfinder/v2/cmd/subfinder@latest](https://github.com/projectdiscovery/subfinder/v2/cmd/subfinder@latest)
go install -v [github.com/projectdiscovery/httpx/cmd/httpx@latest](https://github.com/projectdiscovery/httpx/cmd/httpx@latest)
go install -v [github.com/projectdiscovery/dnsx/cmd/dnsx@latest](https://github.com/projectdiscovery/dnsx/cmd/dnsx@latest)
go install -v [github.com/projectdiscovery/nuclei/v2/cmd/nuclei@latest](https://github.com/projectdiscovery/nuclei/v2/cmd/nuclei@latest)
go install -v [github.com/OJ/gobuster/v3@latest](https://github.com/OJ/gobuster/v3@latest)
go install -v [github.com/ffuf/ffuf@latest](https://github.com/ffuf/ffuf@latest)

# Ensure Go binaries are in your PATH
echo 'export PATH=$PATH:~/go/bin' >> ~/.zshrc
source ~/.zshrc

# Install TheHarvester
git clone [https://github.com/laramies/theHarvester.git](https://github.com/laramies/theHarvester.git)
cd theHarvester
pip3 install -r requirements.txt
```

## 📖 How to Use InsiderLab Command Center

### Basic Usage

1.  **Select a Tool**: Choose your desired security tool from the intuitive sidebar.
2.  **Enter Command**: Type your command directly into the input field.
      - The selected tool's name is automatically prefixed if you don't include it.
      - **Example (nmap):** Instead of `nmap -sV 192.168.1.1`, simply type `-sV 192.168.1.1`.
3.  **Execute**: Press the Enter key or click the "Run" button to initiate the command.
4.  **View Results**: The command output will be displayed in the designated output area.
5.  **Save/Copy**: Utilize the provided buttons to save the output to a file or copy it to your clipboard.

### Working with Wordlists

Many powerful security tools, such as gobuster, ffuf, and others, rely on wordlists for tasks like brute-forcing directories, subdomains, or various input values. Here's how to effectively manage and use wordlists within InsiderLab Command Center.

#### Where to Store Wordlists

Since InsiderLab Command Center operates on your server, you need to store your wordlist files in a accessible directory on the server's file system. Creating a dedicated directory for wordlists is highly recommended for organization:

```bash
# Create a dedicated directory for wordlists
mkdir -p /opt/wordlists
```

Common and convenient locations for storing wordlists include:

  - `/opt/wordlists/` (a common location for optional software)
  - `/usr/share/wordlists/` (often the default location on Kali Linux and other security-focused distributions)
  - `~/wordlists/` (a directory within your user's home directory)

#### Common Wordlists

Here are some popular and valuable wordlist collections you might want to download and utilize:

```bash
# SecLists (a comprehensive and highly recommended collection of wordlists for various purposes)
git clone [https://github.com/danielmiessler/SecLists.git](https://github.com/danielmiessler/SecLists.git) /opt/wordlists/SecLists

# Download dirb wordlists (common for web content discovery)
sudo apt install dirb
# These wordlists will be available at /usr/share/dirb/wordlists/

# Download dirbuster wordlists (another set of web content discovery wordlists)
sudo apt install dirbuster
# These wordlists will be located at /usr/share/dirbuster/wordlists/
```

#### Using Wordlists in Commands

When executing tools that require wordlists, simply provide the full path to the desired wordlist file as an argument to the tool's command:

**Gobuster Example (Directory Brute-forcing):**

```
gobuster dir -u [https://example.com](https://example.com) -w /opt/wordlists/SecLists/Discovery/Web-Content/common.txt
```

**Ffuf Example (Path Fuzzing):**

```
ffuf -u [https://example.com/FUZZ](https://example.com/FUZZ) -w /opt/wordlists/SecLists/Discovery/Web-Content/api-endpoints.txt
```

**Subfinder Example (Using Custom Resolver List):**

```
subfinder -d example.com -rL /opt/wordlists/resolvers.txt
```

### Command Examples for Each Tool

#### nmap

```
# Basic scan to identify open ports
nmap 192.168.1.1

# Service version detection to identify running services and their versions
nmap -sV 192.168.1.1

# Aggressive scan enabling OS detection, version detection, script scanning, and traceroute
nmap -A 192.168.1.0/24

# Scan specific ports (e.g., HTTP, HTTPS, and a common alternative HTTP port)
nmap -p 80,443,8080 192.168.1.1
```

#### subfinder

```
# Basic subdomain enumeration for a given domain
subfinder -d example.com

# Silent output, displaying only the discovered subdomains without extra information
subfinder -d example.com -silent

# Save the discovered subdomains to a text file
subfinder -d example.com -o subdomains.txt
```

#### httpx

```
# Probe a list of domains from a file to check for live HTTP/HTTPS servers
httpx -l domains.txt

# Check for specific HTTP status codes (e.g., 200 OK, 301 Moved Permanently, 302 Found)
httpx -l domains.txt -status-code -mc 200,301,302

# Extract the titles of the web pages from a list of domains
httpx -l domains.txt -title
```

#### gobuster

```
# Perform directory brute-forcing against a target website using a common wordlist
gobuster dir -u [https://example.com](https://example.com) -w /opt/wordlists/SecLists/Discovery/Web-Content/common.txt

# Perform subdomain brute-forcing for a given domain using a top subdomain wordlist
gobuster dns -d example.com -w /opt/wordlists/SecLists/Discovery/DNS/subdomains-top1million-5000.txt

# Increase the number of concurrent threads to speed up the scanning process
gobuster dir -u [https://example.com](https://example.com) -w /opt/wordlists/SecLists/Discovery/Web-Content/common.txt -t 50
```

#### ffuf

```
# Basic directory fuzzing, replacing 'FUZZ' in the URL with entries from the wordlist
ffuf -u [https://example.com/FUZZ](https://example.com/FUZZ) -w /opt/wordlists/SecLists/Discovery/Web-Content/common.txt

# Parameter fuzzing, attempting to discover hidden or vulnerable parameters
ffuf -u [https://example.com/api?FUZZ=value](https://example.com/api?FUZZ=value) -w /opt/wordlists/SecLists/Discovery/Web-Content/burp-parameter-names.txt

# Value fuzzing, injecting potentially malicious payloads into a known parameter
ffuf -u [https://example.com/api?param=FUZZ](https://example.com/api?param=FUZZ) -w /opt/wordlists/SecLists/Fuzzing/XSS/XSS-Jhaddix.txt
```

#### nuclei

```
# Basic scan against a single target URL using default templates
nuclei -u [https://example.com](https://example.com)

# Scan a target URL using templates from a specific category (e.g., common vulnerabilities and exposures)
nuclei -u [https://example.com](https://example.com) -t cves/

# Scan a target URL, filtering for vulnerabilities with critical and high severity levels
nuclei -u [https://example.com](https://example.com) -severity critical,high
```

#### theharvester

```
# Perform a basic information gathering search for a domain using the Google search engine
theharvester -d example.com -b google

# Search for information using multiple data sources (Google, LinkedIn, and GitHub in this example)
theharvester -d example.com -b google,linkedin,github

# Limit the number of results returned by the tool
theharvester -d example.com -b all -l 100
```

#### dnsx

```
# Resolve the A records for a list of domains from a file
dnsx -l domains.txt -a

# Get the CNAME records for a list of domains
dnsx -l domains.txt -cname

# Show the full DNS responses for a list of domains
dnsx -l domains.txt -resp
```

#### nikto

```
# Perform a basic security scan against a target hostname
nikto -h example.com

# Scan an HTTPS website
nikto -h example.com -ssl

# Scan a website on a specific port
nikto -h example.com -p 8443
```

## 🔒 Security Considerations

As InsiderLab Command Center executes commands directly on your server, it's crucial to implement robust security measures:

1.  **Controlled Environment**: Deploy and run InsiderLab Command Center exclusively on servers you have full control over and trust implicitly.
2.  **User Authentication**: Implement strong authentication mechanisms to restrict access to authorized users only.
3.  **Input Validation**: While the application includes basic input validation, exercise caution and sanitize all command inputs to prevent potential command injection vulnerabilities.
4.  **Network Isolation**: Consider deploying InsiderLab Command Center within an isolated network segment to limit the potential impact of any security breaches.
5.  **Legal Compliance**: Ensure you have explicit permission to test the target systems before using any of the integrated security tools. Unauthorized use is illegal and unethical.

## ⚠️ Disclaimer

InsiderLab Command Center is intended for use by security professionals, penetration testers, and bug bounty hunters on systems they have obtained explicit permission to test. Utilizing these tools against systems without proper authorization is strictly prohibited and may have severe legal consequences.

## 🔧 Troubleshooting

### Common Issues

1.  **Command Not Found Errors**:

      - Verify that the specific security tool you are trying to use is correctly installed on your server.
      - Ensure that the tool's executable directory is included in your system's PATH environment variable.

2.  **Permission Denied**:

      - Some security tools require elevated privileges (root or administrator) to execute certain functions.
      - Run the InsiderLab Command Center server with appropriate permissions if necessary.

3.  **Slow Performance**:

      - Executing large-scale scans can be resource-intensive and may lead to performance degradation.
      - Consider using more specific and targeted scan parameters to optimize performance.

### Logs

Application logs can provide valuable insights for troubleshooting:

  - **Development**: Logs are typically outputted to the console where you started the server.
  - **Production**: If configured, logs may be written to a dedicated log file, often located at `/var/log/InsiderLab Command Center/`.

## 🤝 Contributing

We warmly welcome contributions from the community\! If you have ideas for new features, bug fixes, or improvements, please feel free to submit a Pull Request.

1.  **Fork the Repository**: Create your own copy of the InsiderLab Command Center repository.
2.  **Create Your Feature Branch**: `git checkout -b feature/amazing-feature`
3.  **Commit Your Changes**: `git commit -m 'Add some amazing feature'`
4.  **Push to the Branch**: `git push origin feature/amazing-feature`
5.  **Open a Pull Request**: Submit your changes for review and inclusion in the main repository.

## 📄 License

This project is proudly licensed under the MIT License - please refer to the `LICENSE` file for the complete terms and conditions.

## 🙏 Acknowledgments

  - We extend our sincere gratitude to the developers and maintainers of all the incredible open-source security tools that InsiderLab Command Center aggregates.
  - We deeply appreciate the continuous contributions and collaborative spirit of the security community.

-----

Built with ❤️ for the security community
