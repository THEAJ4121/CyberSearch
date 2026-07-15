import "./AboutUs.css";

export const About = () => {
  return (
    <div className="about-page">
      <h1>About Cyber Search</h1>

      <p className="about-intro">
        Cyber Search is a platform dedicated to helping cybersecurity
        professionals, students, researchers, and enthusiasts discover the
        right security tools quickly and efficiently.
      </p>

      <div className="about-grid">
        <div className="about-card">
          <h2>Our Mission</h2>
          <p>
            Our mission is to simplify cybersecurity tool discovery by
            providing a centralized platform where users can search, explore,
            and learn about industry-leading security resources.
          </p>
        </div>

        <div className="about-card">
          <h2>What We Offer</h2>
          <p>
            Cyber Search organizes tools across categories such as
            penetration testing, digital forensics, malware analysis,
            OSINT, vulnerability assessment, network security, and
            incident response.
          </p>
        </div>

        <div className="about-card">
          <h2>Who It's For</h2>
          <p>
            Whether you're a beginner learning cybersecurity concepts,
            a student preparing for certifications, or a professional
            security analyst, Cyber Search helps you find the tools
            you need.
          </p>
        </div>
      </div>
    </div>
  );
};