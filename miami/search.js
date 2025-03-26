
document.getElementById("search-btn").addEventListener("click", () => {
  const query = document.getElementById("search-input").value;
  if (query) {
    window.location.href = `/search?q=${encodeURIComponent(query)}`;
  }
});

// Define mappings from service/destination categories to their parent pages.
const servicePageMap = {
  main: "index.html",
  beach: "beach.html",
  nightlife: "nightlife.html",
  malls: "malls.html",
  museums: "museums.html",
};

const destinationPageMap = {
  main: "index.html",
  nightlife: "nightlife.html",
  beaches: "beach.html",
  museums: "museums.html",
  malls: "malls.html",
};

// Attach event listeners for the search
document.getElementById("search-btn").addEventListener("click", performSearch);
document.getElementById("search-input").addEventListener("keyup", (e) => {
  if (e.key === "Enter") performSearch();
});

function performSearch() {
  const query = document
    .getElementById("search-input")
    .value.toLowerCase()
    .trim();
  const resultsDiv = document.getElementById("search-results");
  resultsDiv.innerHTML = ""; // clear previous results

  if (!query) return; // nothing to search

  // Fetch both JSON files concurrently
  Promise.all([
    fetch("data/services.json").then((res) => res.json()),
    fetch("data/destinations.json").then((res) => res.json()),
  ])
    .then(([servicesData, locationsData]) => {
      let results = [];

      // Search Services
      for (let category in servicesData) {
        servicesData[category].forEach((service) => {
          if (service.name.toLowerCase().includes(query)) {
            const parentUrl = servicePageMap[category] || "#";
            results.push({
              type: "Service",
              name: service.name,
              description: service.description,
              url: parentUrl,
            });
          }
        });
      }

      // Search Destinations
      locationsData.locations.forEach((location) => {
        if (location.name.toLowerCase().includes(query)) {
          const pageKey = location.page.toLowerCase();
          const parentUrl = destinationPageMap[pageKey] || "#";
          results.push({
            type: "Destination",
            name: location.name,
            description: location.description,
            url: parentUrl,
          });
        }
      });

      // Display the search results
      if (results.length === 0) {
        resultsDiv.innerHTML = `<p style="color: #000">No results found for "${query}".</p>`;
      } else {
        let html = "<ul style='list-style: none; padding: 0; margin: 0;'>";
        results.forEach((item) => {
          html += `<li style="margin: 0.5rem 0;">
      <a href="${item.url}" style="color: #22879D; font-weight: bold;">
        ${item.name} (${item.type})
      </a>
      <br>
      <small style="color: #000">${item.description}</small>
    </li>`;
        });
        html += "</ul>";
        resultsDiv.innerHTML = html;
      }
    })
    .catch((err) => {
      console.error("Error during search:", err);
      resultsDiv.innerHTML = "<p>Error fetching search data.</p>";
    });
}
