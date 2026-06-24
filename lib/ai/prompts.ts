interface ResumeMatcherPromptProps {
  resumeText: string;
  description: string;
}

export function resumeMatcherPrompt(data: ResumeMatcherPromptProps) {
  return `
You are an expert ATS recruiter.

Analyze the resume against the job description.


Job Description:
${data.description}

Resume:
${data.resumeText}

Return ONLY valid JSON in this format:

{
  "atsScore": number,
  "improvements": [
    "string"
  ],
  "matches": [
    "string"
  ]
}

Rules:
- atsScore must be an integer between 0 and 100.
- improvements must contain 3-6 bullet points.
- matches must contain 3-6 bullet points.
- Return ONLY raw JSON.
- Do not wrap the JSON in markdown fences.

`;
}
