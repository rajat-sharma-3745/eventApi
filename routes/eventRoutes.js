import { Router } from 'express'
import { upload } from '../middlewares/multer.js';
import { createEvent, deleteEvent, getEvent, updateEvent } from '../controllers/eventController.js';

const router = Router();


router.get("/events", getEvent);             
router.post("/events", upload.single("image"), createEvent);
router.put("/events/:id", upload.single("image"), updateEvent);
router.delete("/events/:id", deleteEvent);

export default router