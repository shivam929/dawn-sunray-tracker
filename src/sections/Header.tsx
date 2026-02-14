import { useState, useEffect } from 'react';
import { Menu, X, ExternalLink } from 'lucide-react';

const navItems = [
  { label: 'Checker', href: '#checker' },
  { label: 'Leaderboard', href: '#leaderboard' },
  { label: 'Tiers', href: '#tiers' },
  { label: 'Winners', href: '#winners' },
  { label: 'Guide', href: '#guide' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-black/80 backdrop-blur-xl border-b border-orange-500/20'
          : 'bg-transparent'
      }`}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img
              src="/assets/logo.png"
              alt="DAWN Logo"
              className="h-8 w-auto"
            />
            <span className="text-white font-bold text-lg hidden sm:block">
              DAWN
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => scrollToSection(item.href)}
                className="text-gray-300 hover:text-orange-400 font-medium text-sm transition-colors duration-200 relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="https://x.com/Bunnyyxtan"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-orange-400 text-sm transition-colors"
            >
              Created by BUNNYY
            </a>
            <a
              href="https://magiceden.io/collections/ethereum/0x97bF3e18C4b4A65e8B7Ef5942c4448a59C399E16"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-premium text-sm flex items-center gap-2"
            >
              Dawn NFT
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white p-2"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-xl border-b border-orange-500/20">
          <nav className="flex flex-col px-4 py-4 gap-2">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => scrollToSection(item.href)}
                className="text-gray-300 hover:text-orange-400 font-medium py-3 px-4 rounded-lg hover:bg-orange-500/10 transition-all text-left"
              >
                {item.label}
              </button>
            ))}
            <div className="border-t border-white/10 my-2" />
            <a
              href="https://x.com/Bunnyyxtan"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-orange-400 text-sm py-2 px-4"
            >
              Created by BUNNYY
            </a>
            <a
              href="https://magiceden.io/collections/ethereum/0x97bF3e18C4b4A65e8B7Ef5942c4448a59C399E16"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-premium text-sm flex items-center justify-center gap-2 mx-4 mt-2"
            >
              Dawn NFT
              <ExternalLink className="w-4 h-4" />
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
