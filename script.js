const busMap = document.getElementById("busMap");
const totalRows = 12;
let seatNumber = 1;

// Carrega as reservas do localStorage
const reservas = JSON.parse(localStorage.getItem("reservas")) || {};

// Função para salvar as reservas no localStorage
function salvarReservas() {
  localStorage.setItem("reservas", JSON.stringify(reservas));
}

// Cria o mapa de assentos
for (let row = 0; row < totalRows; row++) {
  for (let col = 0; col < 5; col++) {
    if (col === 2) {
      // Espaço do corredor
      const corridor = document.createElement("div");
      corridor.className = "corridor";
      busMap.appendChild(corridor);
    } else {
      const seat = document.createElement("div");
      seat.className = "seat";
      seat.dataset.number = seatNumber;

      // Verifica se a poltrona está reservada no localStorage
      if (reservas[seatNumber]) {
        seat.classList.add("reserved");
        seat.textContent = `#${seatNumber}\n${reservas[seatNumber]}`;
      } else {
        seat.textContent = `Poltrona ${seatNumber}`;
      }

      // Evento de clique para reservar a poltrona
      seat.addEventListener("click", () => {
        if (!seat.classList.contains("reserved")) {
          const name = prompt(`Reservar poltrona ${seatNumber} para quem?`);
          if (name) {
            seat.classList.add("reserved");
            seat.textContent = `#${seatNumber}\n${name}`;
            reservas[seatNumber] = name;  // Adiciona ou atualiza a reserva
            salvarReservas();  // Salva no localStorage
          }
        }
      });

      busMap.appendChild(seat);
      seatNumber++;
    }
  }
}
