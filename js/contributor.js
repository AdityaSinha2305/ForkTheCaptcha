// GitHub API URL for the repository contributors
const repoOwner = "AdityaSinha2305"; // Replace with your repo owner
const repoName = "ForkTheCaptcha"; // Replace with your repository name
const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contributors`;

// Function to fetch contributors and display them
async function fetchContributors() {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch contributors.");
    }
    const contributors = await response.json();
    displayContributors(contributors);
  } catch (error) {
    console.error("Error:", error);
    document.getElementById("cards").innerHTML =
      "<p>Failed to load contributors.</p>";
  }
}

// Function to display contributors
function displayContributors(contributors) {
  const cardsContainer = document.getElementById("cards");

  contributors.forEach((contributor) => {
    const contributorCard = `
      <div class="card">
        <a href="${contributor.html_url}" target="_blank">
        <div class="card-body">
          <div class="left">
            <div class="card-img">
              <img class="img" width="80" height="80" src="${contributor.avatar_url}" alt="${contributor.login}"/>
            </div>
            <div class="card-text">
              <h2>${contributor.login}</h2>
              <p>Contributed <strong>${contributor.contributions} time(s)</strong> to this project</p>
            </div>
          </div>
          <div class="right"></div>
        </div>
        </a>
      </div>
    `;
    cardsContainer.innerHTML += contributorCard;
  });
}

// Fetch contributors when the page loads
document.addEventListener("DOMContentLoaded", fetchContributors);
