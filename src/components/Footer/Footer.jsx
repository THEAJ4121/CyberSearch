import { Link } from 'react-router-dom';
import { FiShield, FiGithub, FiTwitter } from 'react-icons/fi';

function Footer() {
  return (
    <footer className="border-t border-border bg-background mt-auto">
      <div className="container-base py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 group mb-4">
              <div className="relative flex items-center justify-center bg-surface p-1.5 rounded-lg border border-border group-hover:border-primary/50 transition-colors">
                <FiShield className="text-primary w-5 h-5 shadow-glow-sm" />
              </div>
              <span className="font-display font-semibold text-lg tracking-tight">
                <span className="text-text-main">Cyber</span><span className="text-primary font-bold">Search</span>
              </span>
            </Link>
            <p className="text-text-muted text-sm max-w-xs mb-6">
              The modern platform for discovering the latest cybersecurity tools, exploits, and frameworks. Built for security professionals.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="p-2 bg-surface border border-border rounded-full text-text-muted hover:text-primary hover:border-primary/50 transition-colors">
                <FiGithub className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-surface border border-border rounded-full text-text-muted hover:text-primary hover:border-primary/50 transition-colors">
                <FiTwitter className="w-4 h-4" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-text-main mb-4 font-display">Resources</h4>
            <ul className="space-y-3">
              <li><Link to="/search" className="text-text-muted hover:text-primary text-sm transition-colors">Search Tools</Link></li>
              <li><Link to="/categories" className="text-text-muted hover:text-primary text-sm transition-colors">Categories</Link></li>
              <li><a href="#" className="text-text-muted hover:text-primary text-sm transition-colors">API Documentation</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-text-main mb-4 font-display">Company</h4>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-text-muted hover:text-primary text-sm transition-colors">About Us</Link></li>
              <li><a href="#" className="text-text-muted hover:text-primary text-sm transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-text-muted hover:text-primary text-sm transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-text-muted">
          <p>© {new Date().getFullYear()} CyberSearch. All rights reserved.</p>
          <p className="mt-2 md:mt-0">Designed for modern security engineering.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
