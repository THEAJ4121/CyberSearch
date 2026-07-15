import { Link } from 'react-router-dom';
import { FiShield, FiGithub, FiTwitter, FiLinkedin, FiHeart } from 'react-icons/fi';

const FOOTER_LINKS = {
  Tools: [
    { label: 'Penetration Testing', to: '/search?category=Penetration+Testing' },
    { label: 'Network Security', to: '/search?category=Network+Security' },
    { label: 'OSINT', to: '/search?category=OSINT' },
    { label: 'Malware Analysis', to: '/search?category=Malware+Analysis' },
  ],
  Resources: [
    { label: 'All Categories', to: '/categories' },
    { label: 'Featured Tools', to: '/search?featured=true' },
    { label: 'Open Source Only', to: '/search?openSource=true' },
  ],
  Platform: [
    { label: 'Login', to: '/login' },
    { label: 'Register', to: '/register' },
  ],
};

function Footer() {
  return (
    <footer className="border-t border-cyber-border bg-cyber-dark mt-auto">
      <div className="section-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <FiShield className="text-neon-blue w-6 h-6" />
              <span className="font-orbitron font-black text-lg">
                <span className="text-white">CYBER</span>
                <span className="text-neon-blue">SEARCH</span>
              </span>
            </Link>
            <p className="text-cyber-muted text-sm font-rajdhani leading-relaxed">
              The ultimate directory for cybersecurity tools, resources, and frameworks.
              Built for security professionals and enthusiasts.
            </p>
            {/* Socials */}
            <div className="flex gap-3 mt-4">
              {[
                { icon: FiGithub, href: 'https://github.com', label: 'GitHub' },
                { icon: FiTwitter, href: 'https://twitter.com', label: 'Twitter' },
                { icon: FiLinkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
              ].map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  className="p-2 text-cyber-muted hover:text-neon-blue border border-cyber-border hover:border-neon-blue rounded-lg transition-all duration-200"
                  aria-label={label}>
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([section, links]) => (
            <div key={section}>
              <h3 className="font-orbitron text-xs text-neon-blue uppercase tracking-widest mb-4">
                {section}
              </h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to}
                      className="text-sm font-rajdhani text-cyber-muted hover:text-cyber-text transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-cyber-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-cyber-muted text-xs font-rajdhani">
            © {new Date().getFullYear()} CyberSearch. For educational and ethical use only.
          </p>
          <p className="text-cyber-muted text-xs font-rajdhani flex items-center gap-1">
            Made with <FiHeart className="text-neon-pink w-3 h-3" /> for the security community
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
