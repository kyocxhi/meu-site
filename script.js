
const animes = [
  {
    id: 1,
    title: "Naruto",
    image: "https://i.imgur.com/hsOasjJ.jpeg",
    description: "Naruto é um jovem ninja que busca ser reconhecido e se tornar o Hokage.",
    seasons: [
      {
        season: 1,
        episodes: [
          { number: 1, url: "https://www.youtube.com/embed/JrH4CH3z3_E" },
          { number: 2, url: "https://www.youtube.com/embed/vnPbV6HqUuA" }
        ]
      }
    ]
  },
  {
    id: 2,
    title: "Hunter x Hunter",
    image: "https://i.imgur.com/dfFOgpL.jpeg",
    description: "A história de Gon Freecss, que busca encontrar seu pai e se tornar um Hunter.",
    seasons: [
      {
        season: 1,
        episodes: [
          { number: 1, url: "https://www.youtube.com/embed/6-X1hGj2WOk" },
          { number: 2, url: "https://www.youtube.com/embed/mF3sH1VGgys" }
        ]
      }
    ]
  },
  {
    id: 3,
    title: "Jujutsu Kaisen",
    image: "https://i.imgur.com/ym7Gsmz.jpeg",
    description: "Um estudante do ensino médio luta contra maldições e monstros sobrenaturais.",
    seasons: [
      {
        season: 1,
        episodes: [
          { number: 1, url: "https://www.youtube.com/embed/1PExjD6bAfI" },
          { number: 2, url: "https://www.youtube.com/embed/-R7sTAHY-1w" }
        ]
      }
    ]
  }
];

// Página inicial
if (document.getElementById('animeContainer')) {
  const container = document.getElementById('animeContainer');
  const searchInput = document.getElementById('searchInput');

  function displayAnimes(filteredAnimes) {
    container.innerHTML = '';
    if(filteredAnimes.length === 0) {
      container.innerHTML = '<p style="color:#ccc; font-size:18px;">Nenhum anime encontrado.</p>';
      return;
    }
    filteredAnimes.forEach(anime => {
      const card = document.createElement('div');
      card.classList.add('anime-card');
      card.innerHTML = `
        <img src="${anime.image}" alt="${anime.title}" />
        <span>${anime.title}</span>
      `;
      card.onclick = () => {
        window.location.href = `anime_details.html?id=${anime.id}`;
      };
      container.appendChild(card);
    });
  }

  displayAnimes(animes);

  searchInput.addEventListener('input', () => {
    const filter = searchInput.value.toLowerCase();
    const filtered = animes.filter(a => a.title.toLowerCase().includes(filter));
    displayAnimes(filtered);
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
    anime.seasons.forEach((seasonObj, index) => {
      const option = document.createElement("option");
      option.value = index;
      option.textContent = `Temporada ${seasonObj.season}`;
      seasonSelect.appendChild(option);
    });

    function loadEpisodes(seasonIndex) {
      const season = anime.seasons[seasonIndex];
      const episodeContainer = document.getElementById("episodeButtons");
      episodeContainer.innerHTML = "";

      if (season.episodes.length > 0) {
        document.getElementById("animePlayer").src = season.episodes[0].url;
      }

      season.episodes.forEach(ep => {
        const btn = document.createElement("button");
        btn.textContent = `Ep ${ep.number}`;
        btn.onclick = () => {
          document.getElementById("animePlayer").src = ep.url;
        };
        episodeContainer.appendChild(btn);
      });
    }

    seasonSelect.addEventListener("change", (e) => {
      loadEpisodes(parseInt(e.target.value));
    });

    loadEpisodes(0);
  } else {
    document.body.innerHTML = "<h2 style='text-align:center; padding: 50px;'>Anime não encontrado.</h2>";
  }
}
