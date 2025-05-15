// Verifica se estamos na página inicial (index.html)
if (document.getElementById("animeContainer")) {
  const container = document.getElementById("animeContainer");
  animes.forEach((anime) => {
    const card = document.createElement("div");
    card.classList.add("anime-card");
    card.innerHTML = `
      <img src="${anime.image}" alt="${anime.title}" />
      <span>${anime.title}</span>
    `;
    card.onclick = () => {
      window.location.href = `anime.html?id=${anime.id}`;
    };
    container.appendChild(card);
  });
}

// Página de detalhes (anime.html)
if (document.getElementById("animePlayer")) {
  const params = new URLSearchParams(window.location.search);
  const animeId = parseInt(params.get("id"));
  const anime = animes.find((a) => a.id === animeId);

  if (!anime) {
    alert("Anime não encontrado!");
    window.location.href = "index.html";
  } else {
    document.getElementById("animeTitle").textContent = anime.title;
    document.getElementById("animeDescription").textContent = anime.description;
    document.getElementById("animeImage").src = anime.image;

    const seasonSelect = document.getElementById("seasonSelect");
    const episodeButtons = document.getElementById("episodeButtons");
    const player = document.getElementById("animePlayer");

    // Popular dropdown de temporadas
    anime.seasons.forEach((seasonObj, idx) => {
      const option = document.createElement("option");
      option.value = idx;
      option.textContent = `Temporada ${seasonObj.season}`;
      seasonSelect.appendChild(option);
    });

    let currentSeasonIndex = 0;
    let currentEpisodeButton = null;

    function loadEpisodes(seasonIndex) {
      currentSeasonIndex = seasonIndex;
      const season = anime.seasons[seasonIndex];
      episodeButtons.innerHTML = "";

      // Carrega o primeiro episódio da temporada por padrão
      if (season.episodes.length > 0) {
        player.src = season.episodes[0].url;
      } else {
        player.src = "";
      }

      season.episodes.forEach((ep, i) => {
        const btn = document.createElement("button");
        btn.textContent = `Ep ${ep.number}`;
        btn.onclick = () => {
          player.src = ep.url;

          // Remove classe 'active' do botão anterior
          if (currentEpisodeButton) {
            currentEpisodeButton.classList.remove("active");
          }
          btn.classList.add("active");
          currentEpisodeButton = btn;
        };

        episodeButtons.appendChild(btn);

        // Marcar o primeiro botão como ativo automaticamente
        if (i === 0) {
          btn.classList.add("active");
          currentEpisodeButton = btn;
        }
      });
    }

    seasonSelect.addEventListener("change", (e) => {
      loadEpisodes(parseInt(e.target.value));
    });

    loadEpisodes(0);
  }
}
