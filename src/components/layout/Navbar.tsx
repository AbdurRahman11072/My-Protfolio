import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 backdrop-blur-md bg-black/50 border-b border-white/5">
      <div className="flex items-center gap-2 text-2xl font-semibold tracking-tighter">
        {/* Placeholder for Signature Logo */}
        <span className="text-white italic font-serif">MD Abdur Rahman</span>
      </div>
      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
        <Link href="#home" className="hover:text-primary transition-colors">Home</Link>
        <Link href="#about" className="hover:text-primary transition-colors">About</Link>
        <Link href="#skills" className="hover:text-primary transition-colors">Skills</Link>
        <Link href="#projects" className="hover:text-primary transition-colors">Projects</Link>
        <Link href="#contact" className="hover:text-primary transition-colors">Contact</Link>
      </div>
      <Button className="bg-primary text-black hover:bg-primary/90 rounded-full px-6 font-medium">
        Let's Talk
      </Button>
    </nav>
  );
}
