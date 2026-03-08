export const generateAIResponse = (message: string): string => {
  const lowerMessage = message.toLowerCase();

  // React related
  if (lowerMessage.includes("react") || lowerMessage.includes("hooks")) {
    return `React is a powerful JavaScript library for building user interfaces. Here are some key concepts:

**React Hooks** are functions that let you use state and other React features in functional components:
- \`useState\`: Manages component state
- \`useEffect\`: Handles side effects
- \`useContext\`: Accesses context values
- \`useRef\`: Creates mutable references

Example:
\`\`\`javascript
import { useState, useEffect } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    document.title = \`Count: \${count}\`;
  }, [count]);
  
  return <button onClick={() => setCount(count + 1)}>Count: {count}</button>;
}
\`\`\`

Would you like to know more about any specific hook?`;
  }

  // JavaScript related
  if (lowerMessage.includes("javascript") || lowerMessage.includes("js")) {
    return `JavaScript is a versatile programming language. Here are some fundamental concepts:

**Variables**: \`let\`, \`const\`, \`var\`
**Functions**: Arrow functions, async/await
**Arrays**: map, filter, reduce
**Objects**: Destructuring, spread operator
**Promises**: Handling asynchronous operations

Example:
\`\`\`javascript
// Arrow function with array methods
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
console.log(doubled); // [2, 4, 6, 8, 10]

// Async/await
async function fetchData() {
  const response = await fetch('api/data');
  const data = await response.json();
  return data;
}
\`\`\`

What specific JavaScript topic would you like to explore?`;
  }

  // Python related
  if (lowerMessage.includes("python")) {
    return `Python is a high-level, interpreted programming language known for its simplicity and readability.

**Key Features**:
- Clean, readable syntax
- Extensive standard library
- Great for data science, web development, automation
- Dynamic typing

**Common Use Cases**:
- Web development (Django, Flask)
- Data analysis (Pandas, NumPy)
- Machine learning (TensorFlow, PyTorch)
- Automation scripts

Example:
\`\`\`python
# List comprehension
numbers = [1, 2, 3, 4, 5]
squared = [n**2 for n in numbers]
print(squared)  # [1, 4, 9, 16, 25]

# Function with type hints
def greet(name: str) -> str:
    return f"Hello, {name}!"
\`\`\`

What would you like to learn about Python?`;
  }

  // Startup related
  if (lowerMessage.includes("startup") || lowerMessage.includes("business idea")) {
    return `Here are some innovative startup ideas for 2026:

🚀 **AI-Powered Solutions**
- Personal AI assistant for elderly care
- AI-driven content creation platform
- Automated code review and optimization tool

💡 **Sustainability**
- Carbon footprint tracking app
- Sustainable packaging marketplace
- Green energy consulting platform

🏥 **Health & Wellness**
- Mental health chatbot companion
- Personalized nutrition planning app
- Telemedicine platform for rural areas

🎓 **Education**
- Interactive coding bootcamp for kids
- Language learning with AI tutors
- Skill-sharing marketplace

💼 **Productivity**
- Remote team collaboration tool
- AI meeting summarizer
- Freelancer project management platform

Which industry interests you most?`;
  }

  // Health related
  if (lowerMessage.includes("health") || lowerMessage.includes("fitness") || lowerMessage.includes("wellness")) {
    return `Here are some general health and wellness tips:

🏃 **Physical Health**
- Aim for 150 minutes of moderate exercise per week
- Stay hydrated (8 glasses of water daily)
- Get 7-9 hours of quality sleep
- Maintain a balanced diet with fruits and vegetables

🧠 **Mental Health**
- Practice mindfulness or meditation
- Take regular breaks from screens
- Connect with friends and family
- Engage in hobbies you enjoy

💪 **Daily Habits**
- Take short walks throughout the day
- Practice good posture
- Stretch regularly
- Limit processed foods and sugar

⚠️ **Important**: For personalized medical advice, always consult with a qualified healthcare professional.

What specific aspect of health would you like to know more about?`;
  }

  // Coding/Programming general
  if (lowerMessage.includes("code") || lowerMessage.includes("programming") || lowerMessage.includes("debug")) {
    return `Let me help you with coding! Here are some general programming tips:

🐛 **Debugging Strategies**
- Use console.log() or print() statements
- Check for typos in variable names
- Verify data types and values
- Use browser DevTools or IDE debuggers
- Read error messages carefully

✨ **Best Practices**
- Write clean, readable code
- Use meaningful variable names
- Comment complex logic
- Follow DRY principle (Don't Repeat Yourself)
- Test your code regularly

📚 **Learning Resources**
- Practice on coding platforms (LeetCode, HackerRank)
- Build real projects
- Read documentation
- Join developer communities

What specific coding challenge are you facing?`;
  }

  // Design related
  if (lowerMessage.includes("design") || lowerMessage.includes("ui") || lowerMessage.includes("ux")) {
    return `UI/UX design is crucial for creating great user experiences. Here are key principles:

🎨 **Design Principles**
- Consistency: Use uniform patterns
- Hierarchy: Guide user attention
- Contrast: Make important elements stand out
- Whitespace: Give content room to breathe
- Accessibility: Design for everyone

🛠️ **Popular Tools**
- Figma: Collaborative design
- Adobe XD: Prototyping
- Sketch: UI design
- Tailwind CSS: Utility-first CSS

💡 **Tips**
- Start with user research
- Create wireframes first
- Test with real users
- Iterate based on feedback
- Keep mobile-first in mind

What aspect of design would you like to explore?`;
  }

  // AI/ML related
  if (lowerMessage.includes("ai") || lowerMessage.includes("machine learning") || lowerMessage.includes("artificial intelligence")) {
    return `Artificial Intelligence and Machine Learning are transforming technology:

🤖 **AI Fundamentals**
- Machine Learning: Systems that learn from data
- Deep Learning: Neural networks with multiple layers
- Natural Language Processing: Understanding human language
- Computer Vision: Analyzing images and videos

📊 **Common Algorithms**
- Linear Regression
- Decision Trees
- Neural Networks
- K-Means Clustering
- Random Forests

🔧 **Popular Frameworks**
- TensorFlow
- PyTorch
- Scikit-learn
- Keras

💼 **Applications**
- Chatbots and virtual assistants
- Image recognition
- Recommendation systems
- Autonomous vehicles
- Predictive analytics

What specific AI topic interests you?`;
  }

  // Database related
  if (lowerMessage.includes("database") || lowerMessage.includes("sql")) {
    return `Databases are essential for storing and managing data:

🗄️ **Database Types**
- **SQL (Relational)**: MySQL, PostgreSQL, SQLite
- **NoSQL**: MongoDB, Redis, Cassandra
- **Cloud**: Firebase, AWS DynamoDB

📝 **SQL Basics**
\`\`\`sql
-- Create table
CREATE TABLE users (
  id INT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100)
);

-- Insert data
INSERT INTO users (id, name, email)
VALUES (1, 'John Doe', 'john@example.com');

-- Query data
SELECT * FROM users WHERE id = 1;
\`\`\`

🔑 **Key Concepts**
- Primary Keys: Unique identifiers
- Foreign Keys: Relationships between tables
- Indexes: Speed up queries
- Transactions: Ensure data integrity

What database topic would you like to learn more about?`;
  }

  // Default response
  return `That's an interesting question! I'm here to help you with:

💻 **Programming**: JavaScript, Python, React, and more
🚀 **Startups**: Business ideas and strategies
🏥 **Health**: General wellness tips
🎨 **Design**: UI/UX principles
🤖 **AI/ML**: Artificial intelligence concepts
🗄️ **Databases**: SQL and NoSQL

Feel free to ask me anything about these topics, or share what you'd like to learn about!`;
};
