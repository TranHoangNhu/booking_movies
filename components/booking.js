import storage from "../util/storage.js";
import { updateTicketList } from "./renderSeat.js";

let seatArr = storage.get("seat-booking");
let arrTicket = [];

function getArrTicket() {
  const arrBooking = storage.get("seat-booking");
  arrTicket = arrBooking.map((id) => ({
    colorPrice: ["E", "F", "G"].includes(id.charAt(0))
      ? `class="fw-bold text-danger"`
      : `class="fw-bold text-success"`,
    id,
    price: ["E", "F", "G"].includes(id.charAt(0)) ? 70000 : 65000,
  }));
}

function booking() {
  function setBooking(param) {
    param.classList.remove("booking");
    seatArr = seatArr.filter((id) => id !== param.textContent);
    storage.set("seat-booking", seatArr);
    updateTicketList();
  }

  function undoBooking(param) {
    param.classList.add("booking");
    seatArr.push(param.textContent);
    storage.set("seat-booking", seatArr);
    updateTicketList();
  }

  const handleSeat = (function () {
    const seats = document.querySelectorAll(".seat");
    seats.forEach((seat) => {
      seat.addEventListener("click", (e) => {
        const thisSeat = e.target;
        if (thisSeat.classList.contains("booking")) {
          setBooking(thisSeat);
        } else {
          undoBooking(thisSeat);
        }
      });
    });
  })();

  updateTicketList();

  return {
    handleSeat,
  };
}

export { booking, getArrTicket, arrTicket };
