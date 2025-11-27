// path: frontend/src/components/Footer.tsx
import React from "react";
import MusicFooterPlayer from "./MusicFooterPlayer";

const socialLinks = [
  { name: "Spotify", url: "https://open.spotify.com/artist/1R7tq9CfGc6ohah9L9VGuL", icon: "spotify" },
  { name: "SoundCloud", url: "https://soundcloud.com/mehreenofficial", icon: "soundcloud" },
  { name: "YouTube", url: "https://youtube.com/@mehreenofficial", icon: "youtube" },
  { name: "Instagram", url: "https://www.instagram.com/mehreen.music", icon: "instagram" },
  { name: "Facebook", url: "https://facebook.com/mehreenofficial", icon: "facebook" },
  { name: "Wikipedia", url: "https://en.wikipedia.org/wiki/Mehreen_Mahmud", icon: "wiki" },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/mehreen-mahmud-a67b6511", icon: "linkedin" }
];

const Icon = ({ type }: { type: string }) => {
  switch (type) {
    case "spotify":
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
          <path d="M12 1.5C6.21 1.5 1.5 6.21 1.5 12S6.21 22.5 12 22.5 22.5 17.79 22.5 12 17.79 1.5 12 1.5zm4.4 14.33a.75.75 0 0 1-1.03.26c-2.82-1.72-6.37-2.1-10.56-1.14a.75.75 0 1 1-.32-1.46c4.56-1.04 8.48-.6 11.68 1.31.36.22.47.69.23 1.03zM17.7 12.9a.9.9 0 0 1-1.25.31c-2.56-1.57-6.47-2.02-9.51-1.09a.9.9 0 0 1-.52-1.72c3.49-1.05 7.83-.54 10.8 1.24a.9.9 0 0 1 .48 1.26zm.08-2.76c-3.08-1.83-8.16-2-11.07-1.09a1.05 1.05 0 0 1-.6-2.01c3.35-1.01 8.03-.78 11.61 1.31a1.05 1.05 0 1 1-1.08 1.79z" />
        </svg>
      );
    case "soundcloud":
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
          <path d="M4.5 13.5c0-.65.53-1.18 1.18-1.18.09 0 .18.01.26.03a2.84 2.84 0 0 1 5.56.6v3.04H5.68A1.18 1.18 0 0 1 4.5 14.8v-1.3zm7.35-2.75a3.4 3.4 0 0 1 2.45-1.05 3.4 3.4 0 0 1 3.2 2.2c.33-.13.69-.2 1.05-.2 1.6 0 2.9 1.3 2.9 2.9s-1.3 2.9-2.9 2.9h-6.7v-6.75z" />
        </svg>
      );
    case "youtube":
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
          <path d="M21.6 7.2s-.2-1.4-.8-2c-.7-.8-1.6-.8-2-0.9C16 4 12 4 12 4h-.1s-4 0-6.7.3c-.4.1-1.3.1-2 .9-.6.6-.8 2-.8 2S2 8.8 2 10.4v1.2c0 1.6.2 3.2.2 3.2s.2 1.4.8 2c.7.8 1.6.8 2 .9 1.5.1 6.5.3 6.5.3s4 0 6.7-.3c.4-.1 1.3-.1 2-.9.6-.6.8-2 .8-2s.2-1.6.2-3.2v-1.2c0-1.6-.2-3.2-.2-3.2zM10 14.7V8.8l5.3 2.95L10 14.7z" />
        </svg>
      );
    case "instagram":
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
          <path d="M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 1.6a3.4 3.4 0 1 1 0 6.8 3.4 3.4 0 0 1 0-6.8zm6.35-1.91a1.17 1.17 0 1 1-2.34 0 1.17 1.17 0 0 1 2.34 0z" />
          <path d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9A5.5 5.5 0 0 1 16.5 22h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2zm0 1.5A4 4 0 0 0 3.5 7.5v9A4 4 0 0 0 7.5 20.5h9a4 4 0 0 0 4-4v-9a4 4 0 0 0-4-4h-9z" />
        </svg>
      );
    case "facebook":
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
          <path d="M13 10h2.5l.5-3H13V5.5c0-.9.3-1.5 1.6-1.5H16V1.1C15.4 1 14.3 1 13.2 1 10.5 1 9 2.6 9 5.2V7H6.5v3H9v9h4v-9z" />
        </svg>
      );
    case "linkedin":
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
          <path d="M5.2 21H2V8.5h3.2V21zM3.6 6.9C2.5 6.9 2 6.1 2 5.2c0-1 .6-1.7 1.7-1.7 1.1 0 1.6.7 1.7 1.7 0 .9-.6 1.7-1.8 1.7zM22 21h-3.2v-6.5c0-1.6-.6-2.6-1.9-2.6-1 0-1.6.7-1.9 1.4-.1.2-.1.5-.1.8V21H11V8.5h3.2v1.7c.4-.6 1.3-1.8 3.1-1.8 2.3 0 4.7 1.5 4.7 5.3V21z" />
        </svg>
      );
    case "wiki":
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
          <path d="M4 5h16v1.5h-2.4L13 18h-1.6L8.4 6.5H6V5zm4.7 1.5 2.5 7 2.5-7h-5z" />
        </svg>
      );
    default:
      return null;
  }
};

export const Footer: React.FC = () => {
  return (
    <footer className="mt-20 w-full border-t border-slate-800/50 bg-slate-950/90 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8 text-sm text-slate-200 md:px-8">
        <div className="flex flex-col items-center gap-3 md:flex-row md:items-center md:justify-between">
          <img
            src="/logo.png"
            alt="Mehreen logo"
            className="w-[120px] md:w-[150px] h-auto max-h-16 object-contain drop-shadow-[0_0_12px_rgba(56,189,248,0.5)]"
          />
          <div className="text-slate-400">
            Developed by{" "}
            <a
              href="https://dyingroomdev.xyz/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-blue-300 hover:text-blue-200"
            >
              DyinGroom
            </a>
          </div>
        </div>
        <div className="w-full flex justify-center">
          <MusicFooterPlayer />
        </div>
        <div className="flex flex-wrap items-center justify-center gap-6 text-slate-200">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full px-2 py-1 transition hover:text-white"
              aria-label={link.name}
            >
              <Icon type={link.icon} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
