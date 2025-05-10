const busMap = document.getElementById("busMap");
const totalSeats = 48;
let reservas = JSON.parse(localStorage.getItem("reservas")) || {};

function salvarReservas() {
  localStorage.setItem("reservas", JSON.stringify(reservas));
}

// Limpa o mapa antes de recriar
busMap.innerHTML = '';

for (let i = 1; i <= totalSeats; i++) {
  const positionInRow = (i - 1) % 4;
  const rowIndex = Math.floor((i - 1) / 4);

  // Ajuste especial para a poltrona 4 (substitui a 46)
  if (i === 4) {
    const seat = document.createElement("div");
    seat.className = "seat";
    seat.dataset.number = 4;
    seat.style.gridColumn = "4";
    seat.style.gridRow = "12";
    
    if (reservas[4]) {
      seat.classList.add("reserved");
      seat.textContent = `#4\n${reservas[4]}`;
    } else {
      seat.textContent = `Poltrona 4`;
    }
    
    seat.addEventListener("click", () => {
      if (!seat.classList.contains("reserved")) {
        const name = prompt(`Reservar poltrona 4 para quem?`);
        if (name) {
          seat.classList.add("reserved");
          seat.textContent = `#4\n${name}`;
          reservas[4] = name;
          salvarReservas();
        }
      }
    });
    
    busMap.appendChild(seat);
    continue;
  }

  // Pula a poltrona 46
  if (i === 46) continue;

  const seat = document.createElement("div");
  seat.className = "seat";
  seat.dataset.number = i;

  // Posicionamento normal
  let gridColumn;
  if (positionInRow === 0) gridColumn = 1;
  else if (positionInRow === 1) gridColumn = 2;
  else if (positionInRow === 2) gridColumn = 4;
  else gridColumn = 5;

  seat.style.gridColumn = gridColumn.toString();
  seat.style.gridRow = (rowIndex + 1).toString();

  // Adiciona corredor
  if (positionInRow === 2 && i !== 3) {
    const corredor = document.createElement("div");
    corredor.className = "corridor";
    corredor.style.gridColumn = "3";
    corredor.style.gridRow = (rowIndex + 1).toString();
    busMap.appendChild(corredor);
  }

  // Reservas existentes
  if (reservas[i]) {
    seat.classList.add("reserved");
    seat.textContent = `#${i}\n${reservas[i]}`;
  } else {
    seat.textContent = `Poltrona ${i}`;
  }

  // Evento de clique
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

  busMap.appendChild(seat);
}
