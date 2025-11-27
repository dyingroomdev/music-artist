// path: frontend/src/components/Navbar.tsx
import React, { useEffect, useState } from "react";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Biography", href: "#about" },
  { label: "Discography", href: "#releases" },
  { label: "Shows", href: "#shows" }
];

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all ${
        scrolled ? "bg-slate-950/70 backdrop-blur-xl" : "bg-slate-950/30 backdrop-blur-xl"
      }`}
    >
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 md:px-8 md:py-4">
        <div className="flex items-center gap-3">
          <a href="#home" aria-label="Back to top">
            <img
              src="/logo.png"
              alt="Mehreen logo"
              className="w-[100px] md:w-[150px] h-auto max-h-12 md:max-h-16 object-contain drop-shadow-[0_0_18px_rgba(56,189,248,0.7)]"
            />
          </a>
        </div>

        {/* Desktop nav */}
        <div className="hidden items-center gap-6 text-sm font-semibold text-slate-200 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="transition hover:text-white hover:drop-shadow-[0_0_10px_rgba(94,234,212,0.6)]"
            >
              {item.label}
            </a>
          ))}
          <div className="flex items-center gap-4 text-slate-300">
            <a
              href="https://open.spotify.com/artist/1R7tq9CfGc6ohah9L9VGuL"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Spotify"
              className="hover:text-white"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                <path d="M12 1.5C6.21 1.5 1.5 6.21 1.5 12S6.21 22.5 12 22.5 22.5 17.79 22.5 12 17.79 1.5 12 1.5zm4.4 14.33a.75.75 0 0 1-1.03.26c-2.82-1.72-6.37-2.1-10.56-1.14a.75.75 0 1 1-.32-1.46c4.56-1.04 8.48-.6 11.68 1.31.36.22.47.69.23 1.03zM17.7 12.9a.9.9 0 0 1-1.25.31c-2.56-1.57-6.47-2.02-9.51-1.09a.9.9 0 0 1-.52-1.72c3.49-1.05 7.83-.54 10.8 1.24a.9.9 0 0 1 .48 1.26zm.08-2.76c-3.08-1.83-8.16-2-11.07-1.09a1.05 1.05 0 0 1-.6-2.01c3.35-1.01 8.03-.78 11.61 1.31a1.05 1.05 0 1 1-1.08 1.79z" />
              </svg>
            </a>
            <a
              href="https://soundcloud.com/mehreenofficial"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="SoundCloud"
              className="hover:text-white"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                <path d="M4.5 13.5c0-.65.53-1.18 1.18-1.18.09 0 .18.01.26.03a2.84 2.84 0 0 1 5.56.6v3.04H5.68A1.18 1.18 0 0 1 4.5 14.8v-1.3zm7.35-2.75a3.4 3.4 0 0 1 2.45-1.05 3.4 3.4 0 0 1 3.2 2.2c.33-.13.69-.2 1.05-.2 1.6 0 2.9 1.3 2.9 2.9s-1.3 2.9-2.9 2.9h-6.7v-6.75z" />
              </svg>
            </a>
            <a
              href="https://smarturl.it/MehreenDisco"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Discography"
              className="hover:text-white"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 7a3 3 0 1 1-3 3 .75.75 0 1 1 1.5 0 1.5 1.5 0 1 0 1.5-1.5.75.75 0 1 1 0-1.5z" />
              </svg>
            </a>
            <a
              href="https://youtube.com/@mehreenofficial"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="hover:text-white"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                <path d="M21.6 7.2s-.2-1.4-.8-2c-.7-.8-1.6-.8-2-0.9C16 4 12 4 12 4h-.1s-4 0-6.7.3c-.4.1-1.3.1-2 .9-.6.6-.8 2-.8 2S2 8.8 2 10.4v1.2c0 1.6.2 3.2.2 3.2s.2 1.4.8 2c.7.8 1.6.8 2 .9 1.5.1 6.5.3 6.5.3s4 0 6.7-.3c.4-.1 1.3-.1 2-.9.6-.6.8-2 .8-2s.2-1.6.2-3.2v-1.2c0-1.6-.2-3.2-.2-3.2zM10 14.7V8.8l5.3 2.95L10 14.7z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Mobile burger */}
        <button
          className="md:hidden inline-flex h-10 w-10 flex-col items-center justify-center gap-1 rounded-full border border-slate-700/60 bg-slate-900/60 text-slate-200"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle navigation"
        >
          <span className="block h-0.5 w-5 bg-current transition-all" />
          <span className="block h-0.5 w-5 bg-current transition-all" />
          <span className="block h-0.5 w-5 bg-current transition-all" />
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-slate-800/70 bg-slate-950/90 backdrop-blur-lg px-4 pb-4">
          <div className="flex flex-col gap-3 pt-3 text-slate-200">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="py-2 text-base font-semibold hover:text-white"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <div className="mt-2 flex items-center gap-4 text-slate-300">
              <a
                href="https://open.spotify.com/artist/1R7tq9CfGc6ohah9L9VGuL"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Spotify"
                className="hover:text-white"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                  <path d="M12 1.5C6.21 1.5 1.5 6.21 1.5 12S6.21 22.5 12 22.5 22.5 17.79 22.5 12 17.79 1.5 12 1.5zm4.4 14.33a.75.75 0 0 1-1.03.26c-2.82-1.72-6.37-2.1-10.56-1.14a.75.75 0 1 1-.32-1.46c4.56-1.04 8.48-.6 11.68 1.31.36.22.47.69.23 1.03zM17.7 12.9a.9.9 0 0 1-1.25.31c-2.56-1.57-6.47-2.02-9.51-1.09a.9.9 0 0 1-.52-1.72c3.49-1.05 7.83-.54 10.8 1.24a.9.9 0 0 1 .48 1.26zm.08-2.76c-3.08-1.83-8.16-2-11.07-1.09a1.05 1.05 0 0 1-.6-2.01c3.35-1.01 8.03-.78 11.61 1.31a1.05 1.05 0 1 1-1.08 1.79z" />
                </svg>
              </a>
              <a
                href="https://soundcloud.com/mehreenofficial"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="SoundCloud"
                className="hover:text-white"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                  <path d="M4.5 13.5c0-.65.53-1.18 1.18-1.18.09 0 .18.01.26.03a2.84 2.84 0 0 1 5.56.6v3.04H5.68A1.18 1.18 0 0 1 4.5 14.8v-1.3zm7.35-2.75a3.4 3.4 0 0 1 2.45-1.05 3.4 3.4 0 0 1 3.2 2.2c.33-.13.69-.2 1.05-.2 1.6 0 2.9 1.3 2.9 2.9s-1.3 2.9-2.9 2.9h-6.7v-6.75z" />
                </svg>
              </a>
              <a
                href="https://smarturl.it/MehreenDisco"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Discography"
                className="hover:text-white"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                  <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 7a3 3 0 1 1-3 3 .75.75 0 1 1 1.5 0 1.5 1.5 0 1 0 1.5-1.5.75.75 0 1 1 0-1.5z" />
                </svg>
              </a>
              <a
                href="https://youtube.com/@mehreenofficial"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="hover:text-white"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                  <path d="M21.6 7.2s-.2-1.4-.8-2c-.7-.8-1.6-.8-2-0.9C16 4 12 4 12 4h-.1s-4 0-6.7.3c-.4.1-1.3.1-2 .9-.6.6-.8 2-.8 2S2 8.8 2 10.4v1.2c0 1.6.2 3.2.2 3.2s.2 1.4.8 2c.7.8 1.6.8 2 .9 1.5.1 6.5.3 6.5.3s4 0 6.7-.3c.4-.1 1.3-.1 2-.9.6-.6.8-2 .8-2s.2-1.6.2-3.2v-1.2c0-1.6-.2-3.2-.2-3.2zM10 14.7V8.8l5.3 2.95L10 14.7z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
