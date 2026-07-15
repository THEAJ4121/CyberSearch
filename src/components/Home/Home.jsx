import "./Home.css";

export const Home = () => {
    return (
        <div className="home-page">
            <h1>Cyber Search: Explore the Security Arsenal</h1>
            <section className="about">
            <div className="features">
                <div className="feature-card">
                    <h3>Discover Security Tools</h3>
                    <p>Cyber Search helps cybersecurity professionals, students, and enthusiasts quickly find the tools they need. Explore resources for penetration testing, network analysis, digital forensics, threat hunting, and more through a fast and intuitive search experience.</p>
                </div>
                <div className="feature-card">
                    <h3>Organized for Efficiency</h3>
                    <p>Browse a growing collection of cybersecurity tools categorized by purpose and specialty. From OSINT and vulnerability assessment to malware analysis and incident response, every resource is structured to make discovery simple and efficient.</p>
                </div>
                <div className="feature-card">
                    <h3>Built for Learning & Defense</h3>
                    <p>Whether you're learning cybersecurity fundamentals or managing enterprise security operations, Cyber Search provides easy access to trusted tools and resources. Stay informed, improve productivity, and strengthen your security workflow.</p>
                </div>
            </div>  
            </section>          
        </div>
    );
};