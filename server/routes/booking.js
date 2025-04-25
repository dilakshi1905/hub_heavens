const router = require("express").Router();
const Booking = require("../models/Booking");

/* CREATE BOOKING */
router.post("/create", async (req, res) => {
  try {
    const { customerId, hostId, listingId, startDate, endDate, totalPrice } = req.body;
    const newBooking = new Booking({ customerId, hostId, listingId, startDate, endDate, totalPrice });
    await newBooking.save();
    res.status(200).json(newBooking);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Fail to create a new Booking!!", error: err.message });
  }
});

/* UPDATE BOOKING */
router.put("/update/:id", async (req, res) => {
  try {
    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      { $set: req.body }, // it will update fields based on what is sent in the body
      { new: true } // return the updated document
    );
    res.status(200).json(updatedBooking);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Fail to update Booking!!", error: err.message });
  }
});

/* DELETE BOOKING */
router.delete("/delete/:id", async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Booking deleted successfully!" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Fail to delete Booking!!", error: err.message });
  }
});

module.exports = router;
