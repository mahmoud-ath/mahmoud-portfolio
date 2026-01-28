Here's a comprehensive prompt you can use to transform README files into the JSON data format:

```
You are an expert at extracting structured data from project README files. I need to convert README files into a specific JSON format for my portfolio website.

**Instructions:**

1. Read the provided README content carefully
2. Extract relevant information to fill this TypeScript interface:

```typescript
interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: "web-dev" | "data-science" | "mobile" | "other";
  tags: string[];
  image: string;
  images: string[];
  featured: boolean;
  links: {
    github: string;
    demo: string;
  };
  videos: string[];
  documentation: string;
  tier: "flagship" | "standard" | "experimental";
  impactScore: number; // 1-100
  projectType: "personal" | "client" | "academic" | "open-source";
  difficulty: number; // 1-5 scale
  isNew: boolean;
  isTrending: boolean;
  createdAt: string; // YYYY-MM-DD
  completedAt: string; // YYYY-MM-DD
}
```

3. Follow these extraction rules:

**Title & ID:**
- `title`: Extract from main heading or project name
- `id`: Convert title to kebab-case (lowercase, hyphenated)
- `slug`: Same as id

**Description:**
- Use the project overview or first meaningful paragraph (2-3 sentences)
- Keep concise and highlight key features

**Category (choose ONE):**
- `web-dev`: Websites, web apps, frontend/backend
- `data-science`: ML, AI, data analysis, visualization
- `mobile`: iOS/Android apps
- `other`: Everything else

**Tags:**
- Extract from technologies mentioned (frameworks, languages, tools)
- Include project domain/topic tags
- 5-10 relevant tags
- Use kebab-case

**Images:**
- `image`: Use main project image or screenshot reference
- `images`: Array of 3-6 relevant image paths mentioned
- Format: `/projects/{slug}/{filename.ext}`

**Links:**
- `github`: Repository link from README
- `demo`: Live demo URL if mentioned, otherwise empty string

**Metadata:**
- `featured`: true for important/complete projects
- `tier`: "flagship" for major projects, "standard" for typical, "experimental" for small/PoC
- `impactScore`: Estimate 10-30 based on project scope
- `projectType`: Infer from context (personal, client, academic)
- `difficulty`: 1-5 based on technical complexity
- `isNew`: true if created within last 6 months
- `isTrending`: true if uses popular tech or solves trendy problem
- `createdAt`/`completedAt`: Extract from dates in README or estimate

**Special notes:**
- If README mentions a video, add to `videos` array
- If README links to documentation, add URL to `documentation`
- For missing info, make reasonable assumptions
- Always output in valid TypeScript array format

**Output format:**
```typescript
import { Project } from '../../types/Project_Section';

export const projectsData: Project[] = [
  // Your generated project objects here
];
```

**Example README to process:**
[Paste the README content here]

**Example output:**
[Generate the TypeScript array based on the README]
```

---

**Shorter version for quick use:**

```
Extract project data from this README and format it into this TypeScript structure:

```typescript
{
  id: "kebab-case-title",
  slug: "same-as-id",
  title: "Project Name",
  description: "2-3 sentence summary",
  category: "web-dev" | "data-science" | "mobile" | "other",
  tags: ["tech-stack", "keywords"],
  image: "/projects/slug/main-image.jpg",
  images: ["/projects/slug/screenshot1.jpg", ...],
  featured: true,
  links: {
    github: "repo-url",
    demo: "live-demo-url"
  },
  tier: "flagship" | "standard" | "experimental",
  projectType: "personal" | "client" | "academic",
  difficulty: 1-5,
  isNew: true/false,
  isTrending: true/false,
  createdAt: "YYYY-MM-DD",
  completedAt: "YYYY-MM-DD"
}
```

Make reasonable assumptions for missing info. Output as TypeScript array.
```

---

**For ChatGPT/Claude specifically:**

```
I need to convert this project README into structured JSON data for my portfolio. Please extract:

1. Project title and concise description
2. Technologies/tags used 
3. GitHub and demo links
4. Project type (personal/client/academic)
5. Difficulty level (1-5)
6. Appropriate category (web-dev, data-science, mobile, other)
7. Any dates mentioned
8. Image references

Format the output as a TypeScript object matching this interface:

```typescript
{
  id: string;
  slug: string;
  title: string;
  description: string;
  category: "web-dev" | "data-science" | "mobile" | "other";
  tags: string[];
  image: string;
  images: string[];
  featured: boolean;
  links: { github: string; demo: string; };
  tier: "flagship" | "standard" | "experimental";
  impactScore: number;
  projectType: "personal" | "client" | "academic";
  difficulty: number;
  isNew: boolean;
  isTrending: boolean;
  createdAt: string;
  completedAt: string;
}
```

Make educated guesses for any missing information. Output the complete TypeScript array.

READEME:
[PASTE HERE]
```

These prompts will help you consistently convert any README into the structured format you need for your portfolio!