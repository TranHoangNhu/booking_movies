import storage from "../util/storage.js";

export default function payment() {
  const dbBooked = ["G5", "G6", "G7"];
  const dbBooking = storage.get("seat-booking");
  storage.set("seat-booked", dbBooked);
  console.log(`số ghế đã đặt: ${dbBooked}`);
  console.log(`số ghế đang book: ${dbBooking}`);
}
