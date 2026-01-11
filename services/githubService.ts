
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

export const fetchProjects = async (username: string): Promise<GitHubRepo[]> => {
  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    if (!response.ok) throw new Error('Failed to fetch repos');
    const repos: GitHubRepo[] = await response.json();
    
    return repos
      .filter(repo => !repo.name.toLowerCase().includes('portfolio') && repo.description)
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, 6);
  } catch (error) {
    console.error("Error fetching GitHub projects:", error);
    return [];
  }
};

export const fetchContributions = async (username: string): Promise<GitHubContribution[]> => {
  try {
    const response = await fetch(`https://api.github.com/users/${username}/events/public`);
    if (!response.ok) throw new Error('Failed to fetch contributions');
    const events = await response.json();
    
    // Filter for meaningful open source contributions
    return events
      .filter((e: any) => ['PushEvent', 'PullRequestEvent', 'IssuesEvent'].includes(e.type))
      .slice(0, 5)
      .map((e: any) => ({
        id: e.id,
        type: e.type.replace('Event', ''),
        repo: e.repo.name,
        repoUrl: `https://github.com/${e.repo.name}`,
        date: new Date(e.created_at).toLocaleDateString(),
        action: e.payload?.action || 'Contribution'
      }));
  } catch (error) {
    console.error("Error fetching contributions:", error);
    return [];
  }
};
