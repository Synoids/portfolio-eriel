"use client";

import { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { Project } from "@/data/projects";
import { useLanguage } from "@/components/ui/LanguageProvider";

interface CaseStudyGalleryProps {
  gallery: NonNullable<Project["gallery"]>;
}

export default function CaseStudyGallery({ gallery }: CaseStudyGalleryProps) {
  const { lang } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (!gallery || gallery.length === 0) return null;

  return (
    <div className="my-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {gallery.map((item, idx) => (
          <div key={idx} className="flex flex-col gap-3 group">
            <div 
              className="relative w-full aspect-video rounded-xl overflow-hidden border border-foreground/10 bg-foreground/5 cursor-zoom-in"
              onClick={() => setSelectedImage(item.image)}
            >
              <Image
                src={item.image}
                alt={item.title?.[lang] || "Gallery image"}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              />
            </div>
            {item.title && (
              <div className="text-sm">
                <span className="font-semibold text-foreground">{item.title[lang]}</span>
                {item.description && (
                  <span className="text-foreground/60 ml-2">— {item.description[lang]}</span>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm p-4 md:p-12 cursor-zoom-out"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-6 right-6 p-2 rounded-full bg-foreground/10 text-foreground hover:bg-foreground/20 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImage(null);
            }}
          >
            <X size={24} />
          </button>
          <div className="relative w-full h-full max-w-6xl max-h-screen">
            <Image
              src={selectedImage}
              alt="Expanded view"
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}
