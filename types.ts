
export interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  language: string;
  topics: string[];
  updated_at: string;
}

export interface GitHubContribution {
  id: string;
  type: string;
  repo: string;
  repoUrl: string;
  date: string;
  action: string;
}

export interface TimelineItem {
  year: string;
  title: string;
  desc: string;
}
