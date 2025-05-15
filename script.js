// Página inicial
if (document.getElementById('animeContainer')) {
  const container = document.getElementById('animeContainer');
  animes.forEach(anime => {
    const card = document.createElement('div');
    card.classList.add('anime-card');
    card.innerHTML = `
      <img src="${anime.image}" alt="${anime.title}">
      <span>${anime.title}</span>
    `;
    card.onclick = () => {
      window.location.href = `anime.html?id=${anime.id}`;
    };
    container.appendChild(card);
  });
}

// Página de detalhes
if (document.getElementById('animePlayer')) {
  const params = new URLSearchParams(window.location.search);
  const animeId = parseInt(params.get("id"));
  const anime = animes.find(a => a.id === animeId);

  if (anime) {
    document.getElementById("animeTitle").textContent = anime.title;
    document.getElementById("animeDescription").textContent = anime.description;
    document.getElementById("animeImage").src = anime.image;

    const seasonSelect = document.getElementById("seasonSelect");
    const episodeButtons = document.getElementById("episodeButtons");

    anime.seasons.forEach((season, index) => {
      const option = document.createElement("option");
      option.value = index;
      option.textContent = `Temporada ${season.season}`;
      seasonSelect.appendChild(option);
    });

    function loadEpisodes(seasonIndex) {
      const season = anime.seasons[seasonIndex];
      episodeButtons.innerHTML = "";

      if (season.episodes.length > 0) {
        document.getElementById("animePlayer").src = season.episodes[0].url;
      }

      season.episodes.forEach(ep => {
        const btn = document.createElement("button");
        btn.textContent = `Ep ${ep.number}`;
        btn.onclick = () => {
          document.getElementById("animePlayer").src = ep.url;
        };
        episodeButtons.appendChild(btn);
      });
    }

    seasonSelect.addEventListener("change", (e) => {
      loadEpisodes(parseInt(e.target.value));
    });

    loadEpisodes(0);
  }
}
