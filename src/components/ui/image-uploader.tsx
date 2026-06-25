"use client";

import { Button } from "@/components/ui/button";
import { Image as ImageIcon, Loader2, X } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";

interface ImageUploaderProps {
  name: string;
  defaultValue?: string | null;
}

export function ImageUploader({ name, defaultValue }: ImageUploaderProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(defaultValue || null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate it's an image
    if (!file.type.startsWith("image/")) {
      setError("Please select an image file.");
      return;
    }

    setIsUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();

      if (res.ok && result.success && result.url) {
        setImageUrl(result.url);
      } else {
        setError(result.error || "Failed to upload image.");
      }
    } catch (err: any) {
      setError("An unexpected error occurred during upload.");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = ""; // reset input
      }
    }
  };

  const handleRemove = () => {
    setImageUrl(null);
  };

  return (
    <div className="space-y-4">
      {/* Hidden input to pass the actual URL to the parent form's server action */}
      <input type="hidden" name={name} value={imageUrl || ""} />

      {imageUrl ? (
        <div className="relative rounded-lg overflow-hidden border border-white/10 bg-black group max-w-sm">
          <div className="aspect-video relative">
            <Image
              src={imageUrl}
              alt="Uploaded Preview"
              fill
              sizes="(max-width: 640px) 100vw, 640px"
              className="object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={handleRemove}
              className="flex items-center gap-2"
            >
              <X className="w-4 h-4" /> Remove Image
            </Button>
          </div>
        </div>
      ) : (
        <div
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-colors max-w-sm
            ${isUploading ? "border-primary/50 bg-primary/5" : "border-white/10 hover:border-primary/50 hover:bg-white/5"}
          `}
        >
          {isUploading ? (
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="w-8 h-8 text-primary animate-spin" />
              <p className="text-sm text-gray-400">
                Uploading to Cloudinary...
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                <ImageIcon className="w-6 h-6 text-gray-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-white mb-1">
                  Click to upload image
                </p>
                <p className="text-xs text-gray-500">
                  PNG, JPG, WebP up to 5MB
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {error && <p className="text-sm text-destructive font-medium">{error}</p>}

      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
        disabled={isUploading}
      />
    </div>
  );
}
