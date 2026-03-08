export interface ResearchResult {
  topic: string;
  summary: string;
  keyPoints: string[];
  relatedTopics: string[];
  sources: string[];
}

export const generateResearchResult = (topic: string): ResearchResult => {
  return {
    topic,
    summary: `${topic} is a fascinating subject that encompasses multiple dimensions and perspectives. Recent developments have shown significant progress in understanding and applying concepts related to this field. This research provides a comprehensive overview of the current state of knowledge.`,
    keyPoints: [
      `${topic} has evolved significantly over the past decade`,
      "Multiple approaches and methodologies are currently being explored",
      "Practical applications are being developed across various industries",
      "Future research directions show promising potential",
      "Interdisciplinary collaboration is key to advancement",
    ],
    relatedTopics: [
      `History of ${topic}`,
      `${topic} in modern context`,
      `Future of ${topic}`,
      `${topic} applications`,
      `${topic} best practices`,
    ],
    sources: [
      "Academic Research Database",
      "Industry Publications",
      "Expert Interviews",
      "Case Studies",
      "Technical Documentation",
    ],
  };
};

export const sampleResearchTopics = [
  "Artificial Intelligence",
  "Climate Change",
  "Quantum Computing",
  "Renewable Energy",
  "Space Exploration",
  "Biotechnology",
  "Cybersecurity",
  "Machine Learning",
];
