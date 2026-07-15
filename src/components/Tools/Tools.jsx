import "./Tools.css";

export const Tools = () => {
  const tools = [
    {
      name: "Nmap",
      category: "Network Scanning",
      description:
        "A powerful network discovery and security auditing tool."
    },
    {
      name: "Wireshark",
      category: "Packet Analysis",
      description:
        "Analyze network traffic and troubleshoot communication issues."
    },
    {
      name: "Metasploit",
      category: "Penetration Testing",
      description:
        "Framework used for vulnerability testing and exploitation."
    },
    {
      name: "Burp Suite",
      category: "Web Security",
      description:
        "Comprehensive toolkit for web application security testing."
    },
    {
      name: "John the Ripper",
      category: "Password Security",
      description:
        "Popular password-cracking and auditing tool."
    },
    {
      name: "Autopsy",
      category: "Digital Forensics",
      description:
        "Open-source platform for digital forensic investigations."
    }
  ];

  return (
    <div className="tools-page">
      <h1>Cybersecurity Tools</h1>

      <p className="tools-intro">
        Browse popular cybersecurity tools used for penetration testing,
        network monitoring, digital forensics, vulnerability assessment,
        and incident response.
      </p>

      <div className="tools-grid">
        {tools.map((tool, index) => (
          <div key={index} className="tool-card">
            <h2>{tool.name}</h2>
            <span className="category">{tool.category}</span>
            <p>{tool.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};