interface CoverLetterPromptProps {
  company: string;
  role: string;
  skills: string[];
  experience?: string;
  tone: string;
  jobDescription: string;
}

// export function buildCoverLetterPrompt(data: CoverLetterPromptProps) {
//   return `
// Write a modern, concise and ATS-friendly cover letter.

// Company:
// ${data.company}

// Role:
// ${data.role}

// Skills:
// ${data.skills.join(', ')}

// Experience:
// ${data.experience}

// Tone:
// ${data.tone}

// Job Description:
// ${data.jobDescription}

// Requirements:
// - Under 100 words
// - Professional but human
// - Avoid generic buzzwords
// - Mention technical strengths naturally
// - Keep paragraphs short
// `;
// }

export function buildCoverLetterPrompt() {
  return `
You are an expert career assistant.

Write a concise and modern cover letter based on the following information.

Company:
Zomato

Role:
Frontend Developer Intern

Skills:
React, Next.js, TypeScript, Tailwind CSS, Node.js

Experience:
Built multiple full-stack web applications including an AI-powered job tracker using Next.js, MongoDB, and Vercel AI SDK. Participated in hackathons and focused on responsive UI and clean backend architecture.

Job Description:
We are looking for a Frontend Developer Intern with strong React and modern JavaScript skills. The candidate should be comfortable building responsive interfaces, integrating APIs, and collaborating in a fast-paced startup environment.

Requirements:
- Under 100 words
- Professional but human
- Avoid generic buzzwords
- Mention technical strengths naturally
- Keep paragraphs short
- Sound confident and realistic
- Return only the cover letter text
`;
}
