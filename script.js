const busMap = document.getElementById("busMap");
const totalSeats = 48;
let reservas = JSON.parse(localStorage.getItem("reservas")) || {};

// Salva as reservas no localStorage
function salvarReservas() {
  localStorage.setItem("reservas", JSON.stringify(reservas));
}

// Gera o mapa de assentos
for (let i = 1; i <= totalSeats; i++) {
  // Poltrona 4 deve ser reposicionada para o centro da última fileira
  if (i === 4) continue;

  // Espaço do corredor (depois da 2ª poltrona em cada fileira de 4)
  const positionInRow = (i - 1) % 4;
  if (positionInRow === 2) {
    const corredor = document.createElement("div");
    corredor.className = "corridor";
    busMap.appendChild(corredor);
  }

  // Criar poltrona
  const seat = document.createElement("div");
  seat.className = "seat";
  seat.dataset.number = i;

  if (reservas[i]) {
    seat.classList.add("reserved");
    seat.textContent = `#${i}\n${reservas[i]}`;
  } else {
    seat.textContent = `Poltrona ${i}`;
  }

  // Reservar ao clicar
  seat.addEventListener("click", () => {
    if (!seat.classList.contains("reserved")) {
      const name = prompt(`Reservar poltrona ${i} para quem?`);
      if (name) {
        seat.classList.add("reserved");
        seat.textContent = `#${i}\n${name}`;
        reservas[i] = name;
        salvarReservas();
      }
    }
  });

  // Se for a poltrona 3, adiciona uma "corridor" ao lado para deixá-la sem par
  if (i === 3) {
    busMap.appendChild(seat);
    const vazio = document.createElement("div");
    vazio.className = "corridor";
    busMap.appendChild(vazio);
  } else {
    busMap.appendChild(seat);
  }
}

// Agora adicionamos a poltrona 4 manualmente no meio das últimas 5
const poltrona4 = document.createElement("div");
poltrona4.className = "seat";
poltrona4.dataset.number = 4;
poltrona4.style.gridColumn = "3"; // Coloca no meio (coluna 3)

if (reservas[4]) {
  poltrona4.classList.add("reserved");
  poltrona4.textContent = `#4\n${reservas[4]}`;
} else {
  poltrona4.textContent = "Poltrona 4";
}

poltrona4.addEventListener("click", () => {
  if (!poltrona4.classList.contains("reserved")) {
    const name = prompt(`Reservar poltrona 4 para quem?`);
    if (name) {
      poltrona4.classList.add("reserved");
      poltrona4.textContent = `#4\n${name}`;
      reservas[4] = name;
      salvarReservas();
    }
  }
});

// Adiciona a poltrona 4 ao final do mapa
busMap.appendChild(poltrona4);
