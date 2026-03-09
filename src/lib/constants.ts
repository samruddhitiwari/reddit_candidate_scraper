// Keywords to search for on Reddit
export const SEARCH_KEYWORDS = [
  "looking for internship",
  "looking for frontend job",
  "looking for backend job",
  "looking for ML internship",
  "looking for junior developer role",
  "looking for junior developer job",
  "looking for fullstack job",
  "looking for data science internship",
  "looking for software engineering internship",
  "seeking internship",
  "seeking junior developer",
  "need internship",
  "want internship",
  "searching for internship",
  "looking for entry level developer",
  "looking for remote developer job",
];

// Subreddits to scan
export const TARGET_SUBREDDITS = [
  "cscareerquestions",
  "forhire",
  "internships",
  "learnprogramming",
  "remotejs",
  "webdev",
  "MachineLearning",
  "datascience",
  "reactjs",
  "node",
];

// Role detection patterns
export const ROLE_PATTERNS: { role: string; patterns: string[] }[] = [
  {
    role: "Frontend",
    patterns: ["frontend", "front-end", "front end", "react", "vue", "angular", "css", "html", "ui developer", "ui engineer"],
  },
  {
    role: "Backend",
    patterns: ["backend", "back-end", "back end", "node", "django", "flask", "express", "api developer", "server side"],
  },
  {
    role: "Fullstack",
    patterns: ["fullstack", "full-stack", "full stack"],
  },
  {
    role: "ML/AI",
    patterns: ["machine learning", "ml ", "deep learning", "ai ", "artificial intelligence", "nlp", "computer vision"],
  },
  {
    role: "Data Science",
    patterns: ["data science", "data analyst", "data engineering", "analytics"],
  },
  {
    role: "DevOps",
    patterns: ["devops", "cloud", "aws", "azure", "kubernetes", "docker", "sre", "infrastructure"],
  },
  {
    role: "Mobile",
    patterns: ["mobile", "ios", "android", "react native", "flutter", "swift", "kotlin"],
  },
  {
    role: "General SWE",
    patterns: ["software engineer", "software developer", "developer", "programmer", "coding", "swe"],
  },
];

// Detect role from text
export function detectRole(text: string): string {
  const lowerText = text.toLowerCase();
  for (const { role, patterns } of ROLE_PATTERNS) {
    for (const pattern of patterns) {
      if (lowerText.includes(pattern)) {
        return role;
      }
    }
  }
  return "General SWE";
}

// Plan limits
export const PLAN_LIMITS = {
  free: 10,
  pro: Infinity,
} as const;
