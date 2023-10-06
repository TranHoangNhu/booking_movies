"use strict";
import { initSeat, seatBooked, seatBooking } from "./components/renderSeat.js";
import { booking } from "./components/booking.js";
import payment from "./components/payment.js";

initSeat();
payment();
seatBooked();
seatBooking();
booking();
console.log("commit test");