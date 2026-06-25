"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Play, X } from "lucide-react";

interface VideoModalProps {
  youtubeEmbedUrl: string;
  thumbnailUrl?: string | null;
  projectTitle: string;
}

function getYoutubeThumbnail(embedUrl: string): string | null {
  // Extract video ID from embed URL like https://www.youtube.com/embed/VIDEO_ID
  const match = embedUrl.match(/\/embed\/([^?&/]+)/);
  if (match && match[1]) {
    return `https://img.youtube.com/vi/${match[1]}/maxresdefault.jpg`;
  }
  return null;
}

export function VideoModal({ youtubeEmbedUrl, thumbnailUrl, projectTitle }: VideoModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [isOpen, close]);

  const ytThumbnail = getYoutubeThumbnail(youtubeEmbedUrl);
  const displayThumbnail = thumbnailUrl || ytThumbnail;

  // Append autoplay to the embed URL
  const autoplayUrl = youtubeEmbedUrl.includes("?")
    ? `${youtubeEmbedUrl}&autoplay=1`
    : `${youtubeEmbedUrl}?autoplay=1`;

  return (
    <>
      {/* Thumbnail with Play Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="relative w-full h-full group cursor-pointer"
        aria-label={`Play ${projectTitle} video`}
      >
        {displayThumbnail ? (
          <Image
            src={displayThumbnail}
            alt={projectTitle}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] flex items-center justify-center">
            <span className="text-white/20 font-bold uppercase tracking-widest text-xl">{projectTitle}</span>
          </div>
        )}

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-300" />

        {/* Play Icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:bg-primary/80 group-hover:border-primary/50 group-hover:scale-110 transition-all duration-300 shadow-2xl">
            <Play className="w-8 h-8 text-white fill-white ml-1" />
          </div>
        </div>
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
          onClick={close}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/90 backdrop-blur-sm animate-in fade-in duration-200" />

          {/* Close Button */}
          <button
            onClick={close}
            className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors cursor-pointer"
            aria-label="Close video"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Video Container */}
          <div
            className="relative w-full max-w-5xl aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl z-10 animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={autoplayUrl}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </>
  );
}
