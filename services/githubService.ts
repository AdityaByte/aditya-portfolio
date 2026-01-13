export interface GitHubRepo {
  id: string;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  language: string | null;
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

// Fetching pinned repos.
export const fetchProjects = async (
  username: string,
  token: string
): Promise<GitHubRepo[]> => {
  try {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        query: `
          query ($username: String!) {
            user(login: $username) {
              pinnedItems(first: 6, types: REPOSITORY) {
                nodes {
                  ... on Repository {
                    id
                    name
                    description
                    url
                    stargazerCount
                    primaryLanguage {
                      name
                    }
                    updatedAt
                  }
                }
              }
            }
          }
        `,
        variables: { username }
      })
    });

    if (!response.ok) throw new Error("Failed to fetch pinned repos");

    const json = await response.json();

    return json.data.user.pinnedItems.nodes
      .filter((repo: any) => repo.description)
      .map((repo: any) => ({
        id: repo.id,
        name: repo.name,
        description: repo.description,
        html_url: repo.url,
        stargazers_count: repo.stargazerCount,
        language: repo.primaryLanguage?.name ?? null,
        updated_at: repo.updatedAt
      }));
  } catch (error) {
    console.error("Error fetching pinned GitHub projects:", error);
    return [];
  }
};


// Fetching recent contributions.
export const fetchContributions = async (
  username: string
): Promise<GitHubContribution[]> => {
  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/events/public`
    );
    if (!response.ok) throw new Error("Failed to fetch contributions");

    const events = await response.json();

    return events
      .filter((e: any) =>
        ["PushEvent", "PullRequestEvent", "IssuesEvent"].includes(e.type)
      )
      .slice(0, 5)
      .map((e: any) => ({
        id: e.id,
        type: e.type.replace("Event", ""),
        repo: e.repo.name,
        repoUrl: `https://github.com/${e.repo.name}`,
        date: new Date(e.created_at).toLocaleDateString(),
        action: e.payload?.action || "Contribution"
      }));
  } catch (error) {
    console.error("Error fetching contributions:", error);
    return [];
  }
};
