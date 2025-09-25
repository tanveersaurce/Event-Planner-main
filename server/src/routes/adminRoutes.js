import express from "express";
import {
  GetAllContacts,
  UpdateContacts,
  AddNewBanquetHall,
} from "../controllers/adminController.js";
import { isAdmin, Protect } from "../middlewares/authMiddleware.js";
import multer from "multer";

const upload = multer();

const router = express.Router();

router.get("/contacts", Protect, isAdmin, GetAllContacts);
router.put("/contacts/:Qid", Protect, isAdmin, UpdateContacts);

router.post(
  "/AddBanquetHall",
  Protect,
  isAdmin,
  upload.array("pictures",5),
  AddNewBanquetHall
);

export default router;
