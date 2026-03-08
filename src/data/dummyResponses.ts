/** Simulated AI responses for demo purposes */
const dummyResponses = [
  "That's a great question! Let me think about that for a moment.\n\nBased on my analysis, I'd suggest breaking the problem down into smaller, manageable parts. This approach often leads to more elegant solutions.",
  "I'd be happy to help with that! Here are some key points to consider:\n\n1. **Start with the fundamentals** — understanding the basics is crucial\n2. **Practice regularly** — consistency beats intensity\n3. **Build real projects** — nothing beats hands-on experience",
  "Interesting thought! There are multiple ways to approach this.\n\nThe most common approach is to use a structured methodology that allows for iterative improvements. Would you like me to elaborate on any specific aspect?",
  "Here's what I know about that topic:\n\nThe field has evolved significantly over the past few years. Modern approaches tend to favor simplicity and maintainability over clever but complex solutions.\n\nWould you like me to dive deeper into any particular area?",
  "Great question! Let me provide a comprehensive answer.\n\n**Short answer:** Yes, absolutely.\n\n**Long answer:** The key is to understand the trade-offs involved. Every decision has pros and cons, and the best choice depends on your specific context and requirements.",
  "I understand what you're looking for. Here's my recommendation:\n\n```javascript\n// Example approach\nconst solution = problems\n  .map(analyze)\n  .filter(isViable)\n  .sort(byEfficiency)\n  .slice(0, 3);\n```\n\nThis pattern helps you systematically evaluate options and pick the best ones.",
  "That's a fascinating topic! Here are some insights:\n\n- **Performance matters** but premature optimization is the root of all evil\n- **Readability** should always be prioritized\n- **Testing** is not optional — it's an investment\n\nLet me know if you want to explore any of these points further!",
  "Absolutely! I can help with that.\n\nThe most effective strategy involves three phases:\n\n1. **Planning** — Define clear goals and constraints\n2. **Execution** — Implement with focus on quality\n3. **Review** — Iterate based on feedback\n\nEach phase is equally important for success.",
  "Here's a clean React component example:\n\n```typescript\nimport { useState } from 'react';\n\ninterface Props {\n  initialCount?: number;\n}\n\nexport const Counter = ({ initialCount = 0 }: Props) => {\n  const [count, setCount] = useState(initialCount);\n\n  return (\n    <div>\n      <p>Count: {count}</p>\n      <button onClick={() => setCount(count + 1)}>\n        Increment\n      </button>\n    </div>\n  );\n};\n```\n\nThis demonstrates proper TypeScript typing and React hooks usage.",
  "For API calls, I recommend this pattern:\n\n```python\nimport requests\nfrom typing import Dict, Optional\n\ndef fetch_data(url: str, params: Optional[Dict] = None) -> Dict:\n    try:\n        response = requests.get(url, params=params, timeout=10)\n        response.raise_for_status()\n        return response.json()\n    except requests.RequestException as e:\n        print(f\"Error fetching data: {e}\")\n        return {}\n```\n\nAlways include error handling and timeouts!",
];

/** Returns a random AI response */
export function getRandomResponse(): string {
  return dummyResponses[Math.floor(Math.random() * dummyResponses.length)];
}

/** Simulates AI thinking time (1-3 seconds) */
export function getResponseDelay(): number {
  return 1000 + Math.random() * 2000;
}
