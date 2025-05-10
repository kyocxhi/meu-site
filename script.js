const busMap = document.getElementById("busMap");
const totalSeats = 48;
let reservas = JSON.parse(localStorage.getItem("reservas")) || {};

// Função para salvar as reservas no localStorage
function salvarReservas() {
  localStorage.setItem("reservas", JSON.stringify(reservas));
}

// Limpa o mapa antes de recriar
busMap.innerHTML = '';

for (let i = 1; i <= totalSeats; i++) {
  if (i === 4) continue; // pula a 4 para adicionar depois manualmente

  const positionInRow = (i - 1) % 4;
  const rowIndex = Math.floor((i - 1) / 4);

  const seat = document.createElement("div");
  seat.className = "seat";
  seat.dataset.number = i;

  // POSICIONAMENTO DAS POLTRONAS
  let gridColumn;
  if (positionInRow === 0) gridColumn = 1;
  else if (positionInRow === 1) gridColumn = 2;
  else if (positionInRow === 2) gridColumn = 4;
  else gridColumn = 5;

  const gridRow = rowIndex + 1;

  seat.style.gridColumn = gridColumn;
  seat.style.gridRow = gridRow;

  // RESERVAS EXISTENTES
  if (reservas[i]) {
    seat.classList.add("reserved");
    seat.textContent = `#${i}\n${reservas[i]}`;
  } else {
    seat.textContent = `Poltrona ${i}`;
  }

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

  // Adiciona corredor (exceto para poltrona 3)
  if (positionInRow === 2 && i !== 3) {
    const corredor = document.createElement("div");
    corredor.className = "corridor";
    corredor.style.gridColumn = "3";
    corredor.style.gridRow = gridRow;
    busMap.appendChild(corredor);
  }

  // Espaço para a poltrona 3 ficar sozinha
  if (i === 3) {
    const vazio = document.createElement("div");
    vazio.className = "corridor";
    vazio.style.gridColumn = "5";
    vazio.style.gridRow = "1";
    busMap.appendChild(vazio);
  }

  busMap.appendChild(seat);
}

// 🔴 Adiciona manualmente a poltrona 4 na linha 12, coluna 3
const poltrona4 = document.createElement("div");
poltrona4.className = "seat";
poltrona4.dataset.number = 4;
poltrona4.style.gridColumn = 3;
poltrona4.style.gridRow = 12;

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

busMap.appendChild(poltrona4);

// Função para limpar todas as reservas
function limparReservas() {
  if (confirm("Tem certeza que deseja limpar todas as reservas?")) {
    reservas = {}; // Limpa o objeto de reservas
    salvarReservas(); // Salva no localStorage
    location.reload(); // Recarrega a página para atualizar o mapa
  }
}
