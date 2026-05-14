export const xpLevels = [
  { name: "Recruit", min: 0, max: 300, color: "#f5f5f5", rarity: "Common", perk: "Access daily quests" },
  { name: "Code Runner", min: 300, max: 1000, color: "#ff3b3b", rarity: "Uncommon", perk: "Unlock project streak rewards" },
  { name: "AI Operator", min: 1000, max: 2500, color: "#ff1744", rarity: "Rare", perk: "Unlock automation analytics" },
  { name: "Cyber Builder", min: 2500, max: 5000, color: "#ff5c5c", rarity: "Epic", perk: "Unlock launch dashboard" },
  { name: "System Architect", min: 5000, max: 10000, color: "#ffffff", rarity: "Legendary", perk: "All systems unlocked" },
];

export const phases = [
  {
    id: "foundation",
    num: 1,
    days: "1-30",
    title: "Foundation",
    subtitle: "Build the base, install the systems, ship every day.",
    accent: "#ff2d2d",
    goals: [
      "Set up GitHub and portfolio",
      "HTML, CSS, JavaScript fundamentals",
      "Ollama and local AI basics",
      "Apply to 3-5 roles per week",
      "Reach Builder at 300 XP",
    ],
  },
  {
    id: "momentum",
    num: 2,
    days: "31-60",
    title: "Momentum",
    subtitle: "Build real projects, automate workflows, post proof.",
    accent: "#ff1744",
    goals: [
      "DOM, APIs, and practical JavaScript",
      "n8n automation workflows",
      "AI video and content pipeline",
      "Portfolio live with case studies",
      "Reach Operator at 1000 XP",
    ],
  },
  {
    id: "launch",
    num: 3,
    days: "61-90",
    title: "Launch",
    subtitle: "Package your work, pitch clients, and prove value.",
    accent: "#ffffff",
    goals: [
      "Full AI-powered web app",
      "Freelance profile and proposals",
      "Content system automated",
      "LinkedIn authority built",
      "Reach Creator at 2500 XP",
    ],
  },
];

const firstWeek = [
  {
    day: 1,
    title: "System Boot",
    mission: "Install your entire learning system.",
    xp: 70,
    hours: 6.5,
    priority: "High",
    track: "Systems",
    tasks: [
      "Create GitHub plus two repositories",
      "Build your first HTML page",
      "Install Ollama and run Llama locally",
      "Update your LinkedIn headline",
      "Set up your XP tracker",
    ],
    tool: "Ollama - run a local model for the first time.",
    challenge: "Push a page with your name, mission, and 90-day goal to GitHub.",
  },
  {
    day: 2,
    title: "HTML Builder",
    mission: "Learn HTML properly and build a real page.",
    xp: 65,
    hours: 6,
    priority: "Medium",
    track: "Web Dev",
    tasks: [
      "Practice div, section, header, nav, and footer",
      "Build a three-section intro page",
      "Generate one AI visual asset",
      "Study two viral reel hooks",
      "Save five job listings to your tracker",
    ],
    tool: "Leonardo.ai - generate your first project asset.",
    challenge: "Build an HTML resume page and push it to GitHub.",
  },
  {
    day: 3,
    title: "CSS Enters",
    mission: "Make your HTML feel intentional with CSS.",
    xp: 70,
    hours: 6.5,
    priority: "High",
    track: "Web Dev",
    tasks: [
      "Learn colors, type, spacing, and box model",
      "Style your Day 2 page fully",
      "Compare two local AI models",
      "Try one AI video generation tool",
      "Post your first public learning update",
    ],
    tool: "Runway or Kling AI - generate a short cinematic clip.",
    challenge: "Create a dark themed page with clean spacing and a real font stack.",
  },
  {
    day: 4,
    title: "Flexbox Day",
    mission: "Master layout and apply for your first role.",
    xp: 75,
    hours: 6,
    priority: "High",
    track: "Web Dev",
    tasks: [
      "Practice direction, justify, align, wrap, and gap",
      "Build a navbar and hero with Flexbox",
      "Start your portfolio homepage layout",
      "Apply to two jobs from your saved list",
      "Write three short-form video hooks",
    ],
    tool: "Perplexity AI - research AI operations roles.",
    challenge: "Build a three-column card layout using Flexbox only.",
  },
  {
    day: 5,
    title: "JavaScript Begins",
    mission: "Write your first interactive logic.",
    xp: 85,
    hours: 6.5,
    priority: "High",
    track: "JavaScript",
    tasks: [
      "Learn variables, conditions, and functions",
      "Build a three-question quiz",
      "Explore five n8n templates",
      "Record a short Day 5 progress clip",
      "Study three AI short films",
    ],
    tool: "n8n - explore workflow templates.",
    challenge: "Build a dark and light mode toggle with JavaScript.",
  },
  {
    day: 6,
    title: "Build Day",
    mission: "Stop collecting. Start shipping.",
    xp: 90,
    hours: 5,
    priority: "High",
    track: "Projects",
    tasks: [
      "Build a full portfolio homepage",
      "Generate AI assets for your portfolio",
      "Apply to two more roles",
      "Post a progress update with a screenshot",
      "Make one clean GitHub commit",
    ],
    tool: "Leonardo.ai - create portfolio visuals.",
    challenge: "Ship a portfolio with nav, hero, about, skills, contact, and one interaction.",
  },
  {
    day: 7,
    title: "Weekly Review",
    mission: "Review, fix gaps, plan the next week, and recover.",
    xp: 60,
    hours: 4,
    priority: "Medium",
    track: "Review",
    tasks: [
      "Complete the weekly review checklist",
      "Improve one weak part from this week",
      "Plan Week 2 tasks and priorities",
      "Post a Week 1 recap",
      "Count total XP and check your level",
    ],
    tool: "Notion or Sheets - review XP, streak, and output.",
    challenge: "Post a public Week 1 recap with one screenshot or clip.",
  },
];

const phaseBlueprints = {
  foundation: {
    tracks: ["HTML", "CSS", "JavaScript", "GitHub", "Portfolio", "Career", "Review"],
    titles: [
      "Markup Sprint",
      "Layout Lab",
      "JavaScript Core",
      "GitHub Proof",
      "Portfolio Polish",
      "Career Outreach",
      "Weekly Review",
    ],
    tasks: [
      "Complete one focused fundamentals lesson",
      "Ship one small visible improvement",
      "Commit the work with a clear message",
      "Apply or save at least one relevant role",
      "Write one public learning note",
    ],
  },
  momentum: {
    tracks: ["DOM", "APIs", "Automation", "AI Tools", "Content", "Projects", "Review"],
    titles: [
      "DOM Builder",
      "API Connector",
      "Automation Sprint",
      "AI Tool Deep Dive",
      "Content System",
      "Project Shipping",
      "Weekly Review",
    ],
    tasks: [
      "Build one feature with real user value",
      "Use an API, model, or automation tool",
      "Record what worked and what failed",
      "Publish one proof-of-work update",
      "Apply to at least one role or send one outreach message",
    ],
  },
  launch: {
    tracks: ["Product", "Freelance", "Case Study", "Automation", "Content", "Sales", "Review"],
    titles: [
      "Product Sprint",
      "Client Offer",
      "Case Study Work",
      "Workflow Upgrade",
      "Authority Post",
      "Proposal Day",
      "Weekly Review",
    ],
    tasks: [
      "Improve your flagship AI builder project",
      "Package one result as a case study",
      "Send one proposal or warm outreach message",
      "Automate one repeated step in your workflow",
      "Publish a useful build note",
    ],
  },
};

function getPhaseForDay(day) {
  if (day <= 30) return phases[0];
  if (day <= 60) return phases[1];
  return phases[2];
}

function buildGeneratedDay(day) {
  const phase = getPhaseForDay(day);
  const blueprint = phaseBlueprints[phase.id];
  const slot = (day - 1) % 7;
  const week = Math.ceil(day / 7);
  const isReview = slot === 6;

  return {
    day,
    title: blueprint.titles[slot],
    mission: isReview
      ? `Review Week ${week}, close gaps, and set the next target.`
      : `${blueprint.tracks[slot]} execution day for the ${phase.title.toLowerCase()} phase.`,
    xp: isReview ? 60 : 70 + ((day + slot) % 4) * 5,
    hours: isReview ? 4 : 5.5 + (slot % 2) * 0.5,
    priority: isReview ? "Medium" : slot < 3 ? "High" : "Medium",
    track: blueprint.tracks[slot],
    tasks: blueprint.tasks,
    tool:
      phase.id === "foundation"
        ? "Claude, VS Code, GitHub, and Ollama - build with assistance but understand each step."
        : phase.id === "momentum"
          ? "n8n, APIs, Cursor, and local AI - connect systems into working workflows."
          : "GitHub Pages, LinkedIn, Contra, and AI tools - package proof into opportunity.",
    challenge: isReview
      ? "Write a short review: what shipped, what stalled, what changes tomorrow."
      : "Ship one public artifact before the day ends.",
  };
}

export const roadmapDays = Array.from({ length: 90 }, (_, index) => {
  const day = index + 1;
  return firstWeek[index] ?? buildGeneratedDay(day);
});

export const xpActions = [
  { id: "easy-task", label: "Easy task", xp: 5 },
  { id: "medium-task", label: "Medium task", xp: 10 },
  { id: "hard-task", label: "Hard task", xp: 20 },
  { id: "project-done", label: "Project shipped", xp: 50 },
  { id: "github-push", label: "GitHub push", xp: 10, tracker: "githubPushes" },
  { id: "job-application", label: "Job applied", xp: 5, tracker: "jobApplications" },
  { id: "content-post", label: "Content posted", xp: 15, tracker: "contentPosts" },
  { id: "ai-tool", label: "AI tool explored", xp: 15, tracker: "aiToolsExplored" },
  { id: "automation", label: "Automation built", xp: 20, tracker: "automationsBuilt" },
  { id: "daily-bonus", label: "Full day bonus", xp: 25 },
];

export const tools = [
  { name: "VS Code", category: "Code", desc: "Primary editor for daily shipping." },
  { name: "GitHub", category: "Proof", desc: "Version control, commits, and portfolio receipts." },
  { name: "Ollama", category: "AI", desc: "Run local models and learn AI tooling deeply." },
  { name: "Claude", category: "AI", desc: "Pair on code, strategy, writing, and debugging." },
  { name: "n8n", category: "Automation", desc: "Build practical workflows and integrations." },
  { name: "Perplexity", category: "Research", desc: "Market research and role discovery." },
  { name: "GitHub Pages", category: "Deploy", desc: "Host portfolio and case-study projects." },
  { name: "Figma", category: "Design", desc: "Sketch product flows and polish UI decisions." },
  { name: "CapCut", category: "Content", desc: "Turn build progress into short-form proof." },
  { name: "Kling AI", category: "Video", desc: "Experiment with AI video creation." },
  { name: "Leonardo.ai", category: "Visuals", desc: "Generate project visuals and thumbnails." },
  { name: "Cursor", category: "Code", desc: "AI-assisted IDE for production workflows." },
];

export const learningTracks = [
  { name: "Web Dev", color: "bg-violet-400", target: 90, items: ["HTML", "CSS", "JavaScript", "APIs", "Deploy"] },
  { name: "AI + Automation", color: "bg-sky-400", target: 90, items: ["Ollama", "n8n", "Agents", "Prompting", "Tool use"] },
  { name: "Projects", color: "bg-emerald-400", target: 90, items: ["Portfolio", "AI tools", "Case studies", "Apps"] },
  { name: "Career", color: "bg-amber-400", target: 90, items: ["LinkedIn", "Applications", "Outreach", "Freelance"] },
  { name: "Content", color: "bg-rose-400", target: 90, items: ["Posts", "Shorts", "Build notes", "Storytelling"] },
];

export const jobs = [
  {
    role: "Customer Success Associate",
    match: 95,
    where: "LinkedIn / Internshala",
    note: "Strong fit with remote operations and communication experience.",
  },
  {
    role: "AI Content Operator",
    match: 92,
    where: "Wellfound / Remote.co",
    note: "AI tools plus content ops makes this a natural hybrid target.",
  },
  {
    role: "Operations Executive",
    match: 86,
    where: "Naukri / LinkedIn",
    note: "Project coordination background maps well to this lane.",
  },
  {
    role: "Social Media + AI Assistant",
    match: 82,
    where: "Remote.co / Contra",
    note: "Use AI workflows and posting systems as the edge.",
  },
  {
    role: "Junior Web Developer",
    match: 66,
    where: "LinkedIn / Company sites",
    note: "Target harder after Day 45 with portfolio proof.",
  },
];

export const habits = [
  { id: "github", label: "GitHub commit", xp: 10 },
  { id: "learn", label: "Skill block", xp: 10 },
  { id: "ship", label: "Ship artifact", xp: 15 },
  { id: "apply", label: "Career action", xp: 5 },
  { id: "post", label: "Public proof", xp: 15 },
];

export const achievements = [
  { id: "first-100", title: "First Spark", desc: "Earn 100 XP.", rarity: "Common", test: (state) => state.totalXP >= 100 },
  { id: "builder", title: "Builder Mode", desc: "Reach 300 XP.", rarity: "Uncommon", test: (state) => state.totalXP >= 300 },
  { id: "week-one", title: "Week One Shipped", desc: "Complete seven roadmap days.", rarity: "Rare", test: (state) => Object.keys(state.completedDays).length >= 7 },
  { id: "streak-five", title: "Momentum Stack", desc: "Reach a five-day streak.", rarity: "Rare", test: (state) => state.streak >= 5 },
  { id: "ten-commits", title: "Green Grid", desc: "Log ten GitHub pushes.", rarity: "Epic", test: (state) => state.tracker.githubPushes >= 10 },
  { id: "job-pipeline", title: "Opportunity Engine", desc: "Send ten applications.", rarity: "Epic", test: (state) => state.tracker.jobApplications >= 10 },
  { id: "ai-explorer", title: "Toolsmith", desc: "Explore five AI tools.", rarity: "Legendary", test: (state) => state.tracker.aiToolsExplored >= 5 },
  { id: "creator", title: "Creator Rank", desc: "Reach 2500 XP.", rarity: "Mythic", test: (state) => state.totalXP >= 2500 },
];

export const rarityStyles = {
  Common: { color: "#d4d4d8", glow: "rgba(212,212,216,0.18)" },
  Uncommon: { color: "#ff5c5c", glow: "rgba(255,92,92,0.25)" },
  Rare: { color: "#ff2d2d", glow: "rgba(255,45,45,0.32)" },
  Epic: { color: "#ff1744", glow: "rgba(255,23,68,0.38)" },
  Legendary: { color: "#ffffff", glow: "rgba(255,255,255,0.32)" },
  Mythic: { color: "#ff003c", glow: "rgba(255,0,60,0.46)" },
};

const websiteLibrary = {
  github: { label: "GitHub", url: "https://github.com" },
  githubNew: { label: "New GitHub repository", url: "https://github.com/new" },
  vscode: { label: "VS Code", url: "https://code.visualstudio.com" },
  vercel: { label: "Vercel", url: "https://vercel.com/new" },
  chatgpt: { label: "ChatGPT", url: "https://chatgpt.com" },
  leonardo: { label: "Leonardo AI", url: "https://leonardo.ai" },
  runway: { label: "Runway", url: "https://runwayml.com" },
  kling: { label: "Kling AI", url: "https://klingai.com" },
  capcut: { label: "CapCut", url: "https://www.capcut.com" },
  linkedin: { label: "LinkedIn", url: "https://www.linkedin.com" },
  perplexity: { label: "Perplexity", url: "https://www.perplexity.ai" },
  ollama: { label: "Ollama", url: "https://ollama.com/download" },
  n8n: { label: "n8n", url: "https://n8n.io" },
};

const missionTemplates = [
  {
    match: ["github", "repo", "commit", "push"],
    objective: "Create a GitHub repository and push your first project checkpoint.",
    why: "GitHub is your public proof engine. Recruiters and clients trust visible commits more than private claims.",
    tools: [websiteLibrary.githubNew, websiteLibrary.github, websiteLibrary.vscode],
    steps: [
      "Open GitHub and sign in.",
      "Click the plus button in the top-right, then choose New repository.",
      "Enter a simple lowercase repository name like ai-builder-day-01.",
      "Choose Public visibility unless the project contains private data.",
      "Click Create repository and copy the repository URL.",
      "Open your project folder in VS Code.",
      "Open the VS Code terminal with Ctrl + backtick.",
      "Run git init, then git add ., then git commit -m \"initial mission checkpoint\".",
      "Run git branch -M main, git remote add origin YOUR_REPOSITORY_URL, then git push -u origin main.",
      "Refresh GitHub and confirm your files are visible.",
    ],
    commands: [
      "git init",
      "git add .",
      "git commit -m \"initial mission checkpoint\"",
      "git branch -M main",
      "git remote add origin YOUR_REPOSITORY_URL",
      "git push -u origin main",
    ],
    tips: [
      "If Git asks for identity, run git config --global user.name \"Your Name\" and git config --global user.email \"you@example.com\".",
      "Commit messages should describe what changed, not how you felt.",
    ],
    mistakes: [
      "Do not paste a repository URL with angle brackets.",
      "Do not commit API keys, passwords, or private files.",
      "If push fails, confirm the remote URL with git remote -v.",
    ],
  },
  {
    match: ["portfolio", "react", "website", "homepage", "page", "html", "css", "javascript", "layout", "navbar", "hero"],
    objective: "Build and ship a portfolio or web page checkpoint.",
    why: "A portfolio turns learning into evidence. Every section should show what you can build, not just what you are studying.",
    tools: [websiteLibrary.vscode, websiteLibrary.github, websiteLibrary.vercel],
    steps: [
      "Open VS Code and create or open your project folder.",
      "Create the main files or React components for the mission.",
      "Build the required sections first: navigation, hero, proof/work, skills, and contact.",
      "Use simple readable copy. Avoid filler text.",
      "Run the local dev server and inspect the page in the browser.",
      "Fix spacing, mobile layout, and broken links.",
      "Commit the checkpoint to GitHub.",
      "If the project is ready, deploy it on Vercel and copy the live URL.",
    ],
    commands: ["npm create vite@latest portfolio -- --template react", "cd portfolio", "npm install", "npm run dev", "git add .", "git commit -m \"ship portfolio checkpoint\""],
    tips: [
      "Build one clean section at a time. Do not start with animations.",
      "Use real project screenshots or links whenever possible.",
    ],
    mistakes: [
      "Do not leave default Vite text on the page.",
      "Do not make the page desktop-only. Check mobile width.",
      "Do not deploy before running the project locally once.",
    ],
  },
  {
    match: ["ai image", "image", "video", "reel", "short", "clip", "cinematic", "content", "post"],
    objective: "Generate AI content and package it as a publishable proof asset.",
    why: "Content makes your progress visible. Short proof loops help people understand your skills faster.",
    tools: [websiteLibrary.chatgpt, websiteLibrary.leonardo, websiteLibrary.runway, websiteLibrary.kling, websiteLibrary.capcut, websiteLibrary.linkedin],
    steps: [
      "Open ChatGPT and ask for a 30-second vertical reel script about today's build.",
      "Turn the script into 4 to 6 short scenes.",
      "Open Leonardo AI or your preferred image generator and create visuals for each scene.",
      "Open Runway, Kling, or Pika and animate the strongest images into clips.",
      "Open CapCut and create a vertical 9:16 project.",
      "Add clips, captions, music, and a simple opening hook.",
      "Export the video in 1080x1920 format.",
      "Upload to Instagram, LinkedIn, or your chosen platform with a short build note.",
    ],
    commands: [],
    tips: [
      "Use one clear hook in the first three seconds.",
      "Keep text large enough to read on a phone.",
    ],
    mistakes: [
      "Do not generate random visuals that do not match the script.",
      "Do not skip subtitles. Many people watch without sound.",
      "Do not over-edit. Ship the first useful version.",
    ],
  },
  {
    match: ["ollama", "llama", "mistral", "local ai", "model"],
    objective: "Install and run a local AI model safely.",
    why: "Local AI teaches you how models behave outside chat websites and prepares you for real builder workflows.",
    tools: [websiteLibrary.ollama, websiteLibrary.vscode],
    steps: [
      "Open the Ollama download page.",
      "Download and install Ollama for your operating system.",
      "Open a new terminal after installation finishes.",
      "Run ollama --version to confirm it is installed.",
      "Run ollama run llama3.2 or another available starter model.",
      "Ask the model a simple coding question and compare the answer with ChatGPT.",
      "Write down one useful use case and one limitation you noticed.",
    ],
    commands: ["ollama --version", "ollama run llama3.2"],
    tips: ["Close and reopen the terminal if ollama is not recognized.", "Local models may be slower than hosted tools on smaller machines."],
    mistakes: ["Do not download random model files from unknown sources.", "Do not assume local output is always private if you paste it into other apps."],
  },
  {
    match: ["job", "apply", "application", "linkedin", "outreach", "role"],
    objective: "Send a targeted career action with proof attached.",
    why: "Applying while building creates feedback loops. You learn what the market wants before you feel fully ready.",
    tools: [websiteLibrary.linkedin, websiteLibrary.perplexity, websiteLibrary.chatgpt],
    steps: [
      "Open LinkedIn and search for a role related to AI operations, junior web, support, or content systems.",
      "Open the job post and read the responsibilities carefully.",
      "Copy the top 3 requirements into ChatGPT and ask it to tailor your short application note.",
      "Attach your portfolio, GitHub, or a relevant build screenshot if possible.",
      "Submit the application or send a concise connection message.",
      "Log the role title, company, link, and date in your tracker.",
    ],
    commands: [],
    tips: ["Use proof from your dashboard: GitHub commits, live links, or content posts.", "A specific short note beats a generic long cover letter."],
    mistakes: ["Do not apply without reading the role.", "Do not claim skills you cannot demonstrate.", "Do not forget to record where you applied."],
  },
  {
    match: ["n8n", "automation", "workflow", "api"],
    objective: "Build or inspect one automation workflow.",
    why: "Automation is the bridge between learning code and solving operational problems.",
    tools: [websiteLibrary.n8n, websiteLibrary.chatgpt],
    steps: [
      "Open n8n and create a free account or use your local setup.",
      "Browse templates for a workflow related to content, email, research, or data.",
      "Open one template and identify the trigger node.",
      "Inspect every node and write what input and output it uses.",
      "Duplicate the template or create a small workflow from scratch.",
      "Run a test execution and inspect the output.",
      "Save a screenshot and note what you would improve.",
    ],
    commands: [],
    tips: ["Start with a manual trigger before scheduling anything.", "Name nodes clearly so future you understands the workflow."],
    mistakes: ["Do not connect paid APIs before understanding cost.", "Do not automate messages that could look spammy."],
  },
];

const defaultMissionTemplate = {
  objective: "Complete this builder mission and create proof that it happened.",
  why: "Every small completed mission builds confidence, skill, and public evidence.",
  tools: [websiteLibrary.chatgpt, websiteLibrary.vscode, websiteLibrary.github],
  steps: [
    "Read the mission title and rewrite it in your own words.",
    "Open ChatGPT and ask for a beginner checklist for this exact mission.",
    "Open the required tool or project folder.",
    "Complete the smallest useful version first.",
    "Save proof: screenshot, commit, note, or link.",
    "Log the mission as complete in this dashboard.",
  ],
  commands: [],
  tips: ["When blocked, ask: what is the next visible action?", "Ship proof before polishing."],
  mistakes: ["Do not research forever.", "Do not skip proof of completion.", "Do not compare your day 1 work to someone else's year 5 work."],
};

export function getMissionGuide(task, day) {
  const text = `${task} ${day?.title ?? ""} ${day?.track ?? ""}`.toLowerCase();
  const template = missionTemplates.find((item) => item.match.some((keyword) => text.includes(keyword))) ?? defaultMissionTemplate;

  return {
    title: task,
    objective: template.objective,
    why: template.why,
    tools: template.tools,
    steps: template.steps,
    commands: template.commands,
    tips: template.tips,
    mistakes: template.mistakes,
    estimatedTime: day?.hours ? `${Math.max(25, Math.round((day.hours * 60) / Math.max(1, day.tasks.length)))} min` : "30 min",
    xp: Math.max(5, Math.round((day?.xp ?? 50) / Math.max(1, day?.tasks?.length ?? 5))),
    difficulty: day?.priority ?? "Medium",
  };
}

export const weeklyLeaderboard = [
  { name: "You", score: 720, title: "Cyber Builder" },
  { name: "Nova", score: 680, title: "Automation Scout" },
  { name: "Kai", score: 610, title: "Content Runner" },
  { name: "Mira", score: 560, title: "Deploy Agent" },
  { name: "Zero", score: 510, title: "Code Recruit" },
];

export const rules = [
  ["Ship visibly", "A rough live project beats a perfect private one."],
  ["Commit daily", "The green grid becomes proof of discipline."],
  ["Document publicly", "Build notes compound into opportunity."],
  ["Use AI actively", "Use it to learn faster, not to skip the learning."],
  ["Never miss twice", "One low day is human. Two is a pattern."],
  ["Apply while learning", "Visibility grows before confidence feels ready."],
  ["Build for real users", "Useful projects beat isolated exercises."],
];
