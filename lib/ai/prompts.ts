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

export function resumeToJSONPrompt(resumeText: string) {
  return `
You are an expert ATS resume parser.

Your task is to convert the provided resume text into a standardized JSON document.

IMPORTANT RULES:

1. Return ONLY valid JSON.
2. Do NOT include markdown.
3. Do NOT wrap response inside \`\`\`.
4. Do NOT invent information.
5. If a field is unavailable, use null, empty string "", or [].
6. Normalize different section names into the standardized schema.
7. Preserve all meaningful information.
8. Unknown sections must be placed inside "customSections".

--------------------------------------------------
SECTION NORMALIZATION RULES
--------------------------------------------------

The following section names should map to the same fields:

Skills, Technical Skills, Tech Stack, Technologies,
Competencies, Expertise, Tools, Languages Known
→ skills

Experience, Work Experience, Employment,
Professional Experience, Internship Experience
→ experience

Projects, Personal Projects, Academic Projects,
Relevant Projects
→ projects

Education, Academic Background, Qualifications
→ education

Certificates, Certifications, Licenses
→ certifications

Achievements, Awards, Honors
→ achievements

Volunteer Experience, Leadership, Open Source,
Publications, Extracurricular Activities, Positions
of Responsibility or any unknown section
→ customSections

--------------------------------------------------
SKILL EXTRACTION RULES
--------------------------------------------------

1. Extract all technical skills.
2. Standardize skill names.

Examples:

"node", "NodeJS", "node js"
→ "Node.js"

"reactjs", "React JS"
→ "React"

"mongodb database"
→ "MongoDB"

"js"
→ "JavaScript"

3. Remove duplicate skills.
4. Return skills as a unique array.

--------------------------------------------------
DATE RULES
--------------------------------------------------

Convert dates into the following format whenever possible:

"MMM YYYY"

Examples:
"Jan 2024"
"May 2026"
"Present"

If exact month is unavailable:

"2024"

--------------------------------------------------
PROJECT RULES
--------------------------------------------------

For each project extract:

- title
- description
- technologies used
- github url if available
- live url if available

--------------------------------------------------
EXPERIENCE RULES
--------------------------------------------------

For each experience extract:

- company
- role
- employmentType
- location
- startDate
- endDate
- currentlyWorking
- description
- technologies

If currently employed:

endDate = "Present"
currentlyWorking = true

--------------------------------------------------
EDUCATION RULES
--------------------------------------------------

For each education entry extract:

- institution
- degree
- fieldOfStudy
- startDate
- endDate
- grade (CGPA/Percentage if available)

--------------------------------------------------
OUTPUT SCHEMA
--------------------------------------------------

{
  "basics": {
    "name": "",
    "email": "",
    "phone": "",
    "location": "",
    "summary": "",
    "linkedin": "",
    "github": "",
    "portfolio": ""
  },

  "skills": [],

  "experience": [
    {
      "company": "",
      "role": "",
      "employmentType": "",
      "location": "",
      "startDate": "",
      "endDate": "",
      "currentlyWorking": false,
      "description": "",
      "technologies": []
    }
  ],

  "education": [
    {
      "institution": "",
      "degree": "",
      "fieldOfStudy": "",
      "startDate": "",
      "endDate": "",
      "grade": ""
    }
  ],

  "projects": [
    {
      "title": "",
      "description": "",
      "technologies": [],
      "githubUrl": "",
      "liveUrl": ""
    }
  ],

  "certifications": [
    {
      "name": "",
      "issuer": "",
      "issueDate": "",
      "credentialUrl": ""
    }
  ],

  "achievements": [],

  "languages": [],

  "customSections": {}
}


  `;
}

export function coverLetterPrompt() {
  return ``;
}
