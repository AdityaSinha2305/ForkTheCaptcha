// GitHub API base URL
const repoOwner = "AdityaSinha2305"; // Replace with ForkTheCaptcha repo owner
const repoName = "ForkTheCaptcha"; // Replace with repo name
const contributorsEndpoint = `https://api.github.com/repos/${repoOwner}/${repoName}/contributors`;
const pullsEndpoint = `https://api.github.com/repos/${repoOwner}/${repoName}/pulls?state=closed`;
const issuesEndpoint = `https://api.github.com/repos/${repoOwner}/${repoName}/issues?state=closed`;

// Fetch contributors data
async function fetchContributors() {
  try {
    const contributorsResponse = await fetch(contributorsEndpoint);
    const contributors = await contributorsResponse.json();

    const pullsResponse = await fetch(pullsEndpoint);
    const closedPulls = await pullsResponse.json();

    const issuesResponse = await fetch(issuesEndpoint);
    const closedIssues = await issuesResponse.json();

    const contributorsList = document.getElementById("contributors-list");

    contributors.forEach((contributor) => {
      const prCount = closedPulls.filter(
        (pr) => pr.user.login === contributor.login
      ).length;
      const issueCount = closedIssues.filter(
        (issue) => issue.user.login === contributor.login
      ).length;

      const row = `
        <tr>
          <td class="contributor-cell">
            <img src="${contributor.avatar_url}" alt="${contributor.login}'s profile picture">
            <a href="${contributor.html_url}" target="_blank">${contributor.login}</a>
          </td>
          <td>${prCount}</td>
          <td>${issueCount}</td>
        </tr>
      `;

      contributorsList.innerHTML += row;
    });
  } catch (error) {
    console.error("Error fetching contributors:", error);
  }
}

// Run the function on page load
window.onload = fetchContributors;
