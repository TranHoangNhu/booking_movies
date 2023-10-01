import storage from "../util/storage.js";

const dbBooking = ["G5", "G6", "G7"];
storage.set("seat-booked", dbBooking);

export default function renderSeat() {
  const initSeat = (function () {
    const seatingContainer = document.getElementById("seating");
    const rows = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
    const columns = 10;

    rows.forEach((row) => {
      const rowElement = document.createElement("div");
      rowElement.classList.add("row-seat");

      for (let column = 1; column <= columns; column++) {
        const seatElement = document.createElement("button");
        seatElement.classList.add("seat");
        seatElement.innerText = row + column;
        rowElement.appendChild(seatElement);
      }
      seatingContainer.appendChild(rowElement);
    });
  })();

  const seatBooked = (function () {
    const arrBooked = storage.get("seat-booked");
    const allSeat = document.querySelectorAll(".seat");
    for (let seat of allSeat) {
      if (arrBooked.includes(seat.textContent)) {
        seat.setAttribute("disabled", "");
      }
    }
  })();

  const seatBooking = (function () {
    const arrBooked = storage.get("seat-booking");
    const allSeat = document.querySelectorAll(".seat");
    for (let seat of allSeat) {
      if (arrBooked.includes(seat.textContent)) {
        seat.classList.add("booking");
      }
    }
  })();

  return {
    initSeat,
    seatBooked,
    seatBooking,
  };
}
