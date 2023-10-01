import storage from "../util/storage.js";

export default function booking() {
  let seatArr = storage.get("seat-booking");
  
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
        } else {
          thisSeat.classList.add("booking");
          seatArr.push(idSeat);
          console.log(seatArr);
          storage.set("seat-booking", seatArr);
        }
      });
    });
  })();

  return {
    handleSeat,
  };
}
