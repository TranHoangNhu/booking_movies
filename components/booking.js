import storage from "../util/storage.js";

export default function booking() {
  let seatArr = storage.get("seat-booking");
  function updateTicketList() {
    let arrBooking = storage.get("seat-booking");
    let html = "";
    for (let seat of arrBooking) {
      html += `
      <tr>
          <td class="px-4 fw-bold">${seat}</td>
          <td>65.000</td>
          <td><button class="bg-danger text-white border-0 px-1 rounded-1"><i
                  class="fa-solid fa-xmark"></i></button></td>
       </tr> 
      `;
    }
    document.querySelector("#ticketList").innerHTML = html;
  }

  const handleSeat = (function () {
    const seats = document.querySelectorAll(".seat");
    seats.forEach((seat) => {
      seat.addEventListener("click", (e) => {
        const thisSeat = e.target;
        const idSeat = thisSeat.textContent;
        if (thisSeat.classList.contains("booking")) {
          thisSeat.classList.remove("booking");
          seatArr = seatArr.filter((id) => id !== idSeat);
          storage.set("seat-booking", seatArr);
          updateTicketList();
        } else {
          thisSeat.classList.add("booking");
          seatArr.push(idSeat);
          // console.log(seatArr);
          storage.set("seat-booking", seatArr);
          updateTicketList();
        }
      });
    });
  })();

  updateTicketList();

  return {
    handleSeat,
  };
}
