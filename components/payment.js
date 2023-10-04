import storage from "../util/storage.js";
import { updateTicketList, seatBooked, seatBooking } from "./renderSeat.js";
import { arrTicket } from "./booking.js";

export default function payment() {
  const handlePayment = () => {
    document.querySelector("#offcanvasRight").classList.remove("show");
    document.querySelector(".offcanvas-backdrop").classList.remove("show");
    $("#paymentSuccess").modal("show");
    setTimeout(function () {
      console.log(arrTicket);
      updateTicketList();
      seatBooked();
      seatBooking();
      $("#paymentSuccess").modal("hide");
    }, 2000);
    const dbBooked = storage.get("seat-booked");
    const dbBooking = storage.get("seat-booking");
    const updateBooked = [...dbBooked, ...dbBooking];
    storage.set("seat-booked", updateBooked);
    storage.destroy("seat-booking");
  };
  //render button payment
  const buttonHTML = `
  <p class="mb-0 fw-bold fs-4 text-danger">tổng tiền: <span id="totalPrice"></span></p>
  <button id="payment" class="btn btn-success float-end">thanh toán</button>`;

  const footer = document.querySelector(".offcanvas-footer");
  footer.innerHTML = buttonHTML;
  // Thêm sự kiện "click" vào nút "thanh toán"
  const paymentButton = document.getElementById("payment");
  paymentButton.addEventListener("click", handlePayment);
}
