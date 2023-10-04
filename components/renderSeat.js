import storage from "../util/storage.js";
import { getArrTicket, arrTicket } from "./booking.js";

const updateTicketList = () => {
  getArrTicket();
  const html = arrTicket
    .map(
      ({ id, colorPrice, price }) => `
  <tr>
      <td class="px-4 fw-bold">${id}</td>
      <td ${colorPrice}>${price.toLocaleString("vi", {
        style: "currency",
        currency: "VND",
      })}</td>
  </tr> 
`
    )
    .join("");

  document.querySelector("#ticketList").innerHTML = html;

  // Tính tổng tiền
  const totalPrice = arrTicket.reduce((acc, ticket) => acc + ticket.price, 0);
  // Đếm số vé được đặt
  const countTickets = arrTicket.reduce((count, ticket) => {
    if (ticket.id) {
      return count + 1;
    }
    return count;
  }, 0);

  // Hiển thị tổng tiền
  document.querySelector("#totalPrice").textContent = totalPrice.toLocaleString(
    "vi",
    {
      style: "currency",
      currency: "VND",
    }
  );
  document.querySelector("#countTickets").textContent = countTickets;
};

const initSeat = function () {
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
};

const seatBooked = function () {
  const allSeat = document.querySelectorAll(".seat");
  const arrBooked = storage.get("seat-booked");
  for (let seat of allSeat) {
    if (arrBooked.includes(seat.textContent)) {
      seat.setAttribute("disabled", "");
    }
  }
};

const seatBooking = function () {
  const arrBooked = storage.get("seat-booking");
  const allSeat = document.querySelectorAll(".seat");
  for (let seat of allSeat) {
    if (arrBooked.includes(seat.textContent)) {
      seat.classList.add("booking");
    }
  }
};

export { updateTicketList, initSeat, seatBooked, seatBooking };
