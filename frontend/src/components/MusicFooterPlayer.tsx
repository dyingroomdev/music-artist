// path: frontend/src/components/MusicFooterPlayer.tsx
import React, { useEffect, useRef, useState } from "react";

// Derive media base from API base (strip trailing /api)
const apiBase = import.meta.env.VITE_API_BASE_URL?.replace(/\/api\/?$/, "") || "";
const MEDIA_BASE = `${apiBase}/media`;
const AUDIO_SRC = `${MEDIA_BASE}/SHE%20GAANER%20PAKHI.mp3`;
const TRACK_TITLE = "She Gaaner Pakhi";
const TRACK_ARTIST = "Mehreen";
const COVER_IMAGE = `${MEDIA_BASE}/cover.heic`;

export const MusicFooterPlayer: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.6);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = volume;
    audio.play().catch(() => setPlaying(false));
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    }
  };

  const onTimeUpdate = () => {
    const audio = audioRef.current;
    if (!audio) return;
    setProgress(audio.currentTime);
    setDuration(audio.duration || 0);
  };

  const onSeek = (value: number) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;
    audio.currentTime = (value / 100) * duration;
  };

  const onVolumeChange = (value: number) => {
    const audio = audioRef.current;
    const vol = value / 100;
    setVolume(vol);
    if (audio) audio.volume = vol;
  };

  const formatTime = (secs: number) => {
    if (!secs || Number.isNaN(secs)) return "0:00";
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60)
      .toString()
      .padStart(2, "0");
    return `${m}:${s}`;
  };

  const progressPct = duration ? Math.min(100, (progress / duration) * 100) : 0;

  return (
    <div className="w-full rounded-xl bg-[#04070f] px-5 py-4 shadow-[0_10px_40px_rgba(0,0,0,0.35)] border border-slate-900 text-white flex flex-col md:flex-row md:items-center gap-4">
      <div className="flex items-center gap-3 flex-1">
        <img
          src={COVER_IMAGE}
          alt="Cover"
          className="h-14 w-14 rounded-md border border-slate-800 object-cover bg-slate-900"
        />
        <div className="flex flex-col">
          <div className="text-sm font-semibold">{TRACK_TITLE}</div>
          <div className="text-xs text-slate-300">{TRACK_ARTIST}</div>
        </div>
      </div>
      <div className="flex flex-1 items-center gap-3 text-xs text-slate-300">
        <button
          onClick={togglePlay}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-slate-900 shadow"
          aria-label={playing ? "Pause" : "Play"}
        >
          {playing ? (
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
              <path d="M7 5h4v14H7zm6 0h4v14h-4z" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>
        <span>{formatTime(progress)}</span>
        <input
          type="range"
          min={0}
          max={100}
          value={progressPct}
          onChange={(e) => onSeek(Number(e.target.value))}
          className="flex-1 accent-blue-400"
        />
        <span>{formatTime(duration)}</span>
      </div>
      <div className="flex items-center gap-2">
        <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current text-slate-300">
          <path d="M7 9v6h4l5 5V4l-5 5H7z" />
        </svg>
        <input
          type="range"
          min={0}
          max={100}
          value={volume * 100}
          onChange={(e) => onVolumeChange(Number(e.target.value))}
          className="w-24 accent-blue-400"
        />
      </div>
      <audio
        ref={audioRef}
        src={AUDIO_SRC}
        preload="auto"
        autoPlay
        loop
        onTimeUpdate={onTimeUpdate}
        onLoadedMetadata={onTimeUpdate}
      />
    </div>
  );
};

export default MusicFooterPlayer;
