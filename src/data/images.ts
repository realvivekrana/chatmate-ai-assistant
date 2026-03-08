export interface AIImage {
  id: string;
  title: string;
  description: string;
  category: string;
  color: string;
}

export const aiImages: AIImage[] = [
  {
    id: "1",
    title: "Futuristic City",
    description: "Neon-lit cyberpunk metropolis at night",
    category: "Architecture",
    color: "from-blue-500 to-purple-600",
  },
  {
    id: "2",
    title: "Robot Illustration",
    description: "Friendly AI robot assistant",
    category: "Character",
    color: "from-green-500 to-teal-600",
  },
  {
    id: "3",
    title: "Digital Painting",
    description: "Abstract digital art with vibrant colors",
    category: "Abstract",
    color: "from-pink-500 to-orange-600",
  },
  {
    id: "4",
    title: "Space Explorer",
    description: "Astronaut floating in cosmic nebula",
    category: "Sci-Fi",
    color: "from-indigo-500 to-blue-600",
  },
  {
    id: "5",
    title: "Nature Scene",
    description: "Serene forest with magical lighting",
    category: "Landscape",
    color: "from-emerald-500 to-green-600",
  },
  {
    id: "6",
    title: "AI Art Portrait",
    description: "Stylized portrait with geometric patterns",
    category: "Portrait",
    color: "from-purple-500 to-pink-600",
  },
  {
    id: "7",
    title: "Ocean Depths",
    description: "Underwater scene with bioluminescent creatures",
    category: "Nature",
    color: "from-cyan-500 to-blue-600",
  },
  {
    id: "8",
    title: "Mountain Vista",
    description: "Majestic peaks at golden hour",
    category: "Landscape",
    color: "from-amber-500 to-red-600",
  },
];
