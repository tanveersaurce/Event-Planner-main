import mongoose from "mongoose";

const CateringSchema = mongoose.Schema(
  {
    catererName: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    bookingCharge: {
      type: String,
      required: true,
    },
    perPlateVeg: {
      type: String,
      required: true,
    },
    perPlateJain: {
      type: String,
      required: true,
    },
    perPlateNonVeg: {
      type: String,
      required: true,
    },
    details: { type: String },
  },
  { timeStamps: true }
);

const Caterer = mongoose.model("Caterer", CateringSchema);

export default Caterer;
