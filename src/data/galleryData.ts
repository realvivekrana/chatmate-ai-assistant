export interface GalleryImage {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
}

export const galleryImages: GalleryImage[] = [
  {
    id: 1,
    title: "AI Robot",
    description: "Futuristic artificial intelligence robot",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
    category: "Technology"
  },
  {
    id: 2,
    title: "Cyberpunk City",
    description: "Neon futuristic cityscape",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80",
    category: "Sci-Fi"
  },
  {
    id: 3,
    title: "Digital Art Portrait",
    description: "AI generated digital portrait",
    image: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=800&q=80",
    category: "Art"
  },
  {
    id: 4,
    title: "Space Landscape",
    description: "Sci-fi planetary landscape",
    image: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800&q=80",
    category: "Space"
  },
  {
    id: 5,
    title: "AI Animal",
    description: "Artificial intelligence generated animal",
    image: "https://images.unsplash.com/photo-1517849845537-4d257902454a?w=800&q=80",
    category: "Nature"
  },
  {
    id: 6,
    title: "Futuristic Technology",
    description: "High tech AI system",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80",
    category: "Technology"
  },
  {
    id: 7,
    title: "Neural Network",
    description: "Abstract neural network visualization",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80",
    category: "Technology"
  },
  {
    id: 8,
    title: "Digital Ocean",
    description: "Surreal digital ocean waves",
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80",
    category: "Nature"
  },
  {
    id: 9,
    title: "Abstract Art",
    description: "Colorful abstract digital art",
    image: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=800&q=80",
    category: "Art"
  },
  {
    id: 10,
    title: "Futuristic Architecture",
    description: "Modern architectural design",
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&q=80",
    category: "Architecture"
  },
  {
    id: 11,
    title: "Neon Lights",
    description: "Vibrant neon light patterns",
    image: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=800&q=80",
    category: "Abstract"
  },
  {
    id: 12,
    title: "Virtual Reality",
    description: "VR technology concept",
    image: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=800&q=80",
    category: "Technology"
  }
];

export const PLACEHOLDER_IMAGE = "https://via.placeholder.com/600x400/1a1a1a/666666?text=AI+Image";
