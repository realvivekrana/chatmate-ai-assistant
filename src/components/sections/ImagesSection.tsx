import { ArrowLeft, Download, X } from "lucide-react";
import { galleryImages, PLACEHOLDER_IMAGE } from "@/data/galleryData";
import { useState } from "react";

interface ImagesSectionProps {
  onBack: () => void;
}

const ImagesSection = ({ onBack }: ImagesSectionProps) => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});
  const [imageLoading, setImageLoading] = useState<Record<number, boolean>>({});

  const handleImageError = (id: number) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }));
    setImageLoading((prev) => ({ ...prev, [id]: false }));
  };

  const handleImageLoad = (id: number) => {
    setImageLoading((prev) => ({ ...prev, [id]: false }));
  };

  const handleDownload = (image: typeof galleryImages[0]) => {
    // Simulate download
    const link = document.createElement("a");
    link.href = imageErrors[image.id] ? PLACEHOLDER_IMAGE : image.image;
    link.download = `${image.title.replace(/\s+/g, "_")}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Header with Back Button */}
      <div className="p-3 sm:p-4 border-b border-border bg-background/95 backdrop-blur">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-foreground hover:bg-muted rounded-lg transition-colors mb-3"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        <h1 className="text-xl sm:text-2xl font-semibold text-foreground">AI Generated Images</h1>
        <p className="text-xs sm:text-sm text-muted-foreground mt-1">
          Explore beautiful AI-generated artwork and illustrations
        </p>
      </div>

      {/* Images Grid */}
      <div className="flex-1 overflow-y-auto p-3 sm:p-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 max-w-7xl mx-auto">
          {galleryImages.map((image) => (
            <div
              key={image.id}
              onClick={() => setSelectedImage(image.id)}
              className="group relative aspect-square rounded-xl overflow-hidden border border-border
                       hover:border-primary/50 transition-all hover:shadow-xl hover:shadow-primary/10
                       hover:-translate-y-1 cursor-pointer bg-muted"
            >
              {/* Loading skeleton */}
              {imageLoading[image.id] !== false && (
                <div className="absolute inset-0 bg-muted animate-pulse" />
              )}

              {/* Image */}
              <img
                src={imageErrors[image.id] ? PLACEHOLDER_IMAGE : image.image}
                alt={image.title}
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
                onError={(e) => {
                  handleImageError(image.id);
                  const target = e.target as HTMLImageElement;
                  target.src = PLACEHOLDER_IMAGE;
                }}
                onLoad={() => handleImageLoad(image.id)}
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/50 to-transparent
                            opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                  <h3 className="text-xs sm:text-sm font-semibold text-foreground mb-1">
                    {image.title}
                  </h3>
                  <p className="text-[10px] sm:text-xs text-muted-foreground mb-2 line-clamp-2">
                    {image.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="inline-block px-2 py-1 bg-primary/20 text-primary text-[10px] sm:text-xs rounded-full">
                      {image.category}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedImage(image.id);
                      }}
                      className="px-2 py-1 bg-primary text-primary-foreground text-[10px] sm:text-xs rounded-full hover:bg-primary/90 transition-colors"
                    >
                      View
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 p-2 bg-muted hover:bg-muted/80 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            {galleryImages
              .filter((img) => img.id === selectedImage)
              .map((image) => (
                <div key={image.id} className="bg-card border border-border rounded-xl overflow-hidden shadow-2xl">
                  <div className="relative bg-muted">
                    <img
                      src={imageErrors[image.id] ? PLACEHOLDER_IMAGE : image.image}
                      alt={image.title}
                      className="w-full h-auto max-h-[70vh] object-contain"
                      onError={(e) => {
                        handleImageError(image.id);
                        const target = e.target as HTMLImageElement;
                        target.src = PLACEHOLDER_IMAGE;
                      }}
                    />
                  </div>
                  <div className="p-4 sm:p-6">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div className="flex-1">
                        <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-2">
                          {image.title}
                        </h2>
                        <p className="text-sm sm:text-base text-muted-foreground mb-3">
                          {image.description}
                        </p>
                        <span className="inline-block px-3 py-1.5 bg-primary/20 text-primary text-xs sm:text-sm rounded-full">
                          {image.category}
                        </span>
                      </div>
                      <button
                        onClick={() => handleDownload(image)}
                        className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
                      >
                        <Download className="w-4 h-4" />
                        <span className="hidden sm:inline">Download</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImagesSection;
