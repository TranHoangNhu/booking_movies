import storage from "../util/storage.js";

export default function booking() {
  let seatArr = storage.get("seat-booking");
  let arrTicket = [];

  function updateTicketList() {
    const arrBooking = storage.get("seat-booking");
    arrTicket = arrBooking.map((id) => ({
      colorPrice: ["E", "F", "G"].includes(id.charAt(0))
        ? `class="fw-bold text-danger"`
        : `class="fw-bold text-success"`,
      id,
      price: ["E", "F", "G"].includes(id.charAt(0)) ? 70000 : 65000,
    }));
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
    document.querySelector("#totalPrice").textContent =
      totalPrice.toLocaleString("vi", {
        style: "currency",
        currency: "VND",
      });
    document.querySelector("#countTickets").textContent = countTickets;
  }

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
