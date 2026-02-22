import { Heart } from 'lucide-react';

function Footer() {
  const currentYear = new Date().getFullYear();
  const appIdentifier = typeof window !== 'undefined' 
    ? encodeURIComponent(window.location.hostname) 
    : 'dark-killzone';

  return (
    <footer className="py-6 px-4 bg-black/70 backdrop-blur-md border-t border-danger/20">
      <div className="container mx-auto text-center">
        <p className="text-white/70 text-sm flex items-center justify-center gap-2">
          © {currentYear} Dark KillZone. Built with{' '}
          <Heart className="h-4 w-4 text-danger fill-danger animate-pulse" />{' '}
          using{' '}
          <a
            href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appIdentifier}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-danger hover:text-danger/80 transition-colors underline"
          >
            caffeine.ai
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
