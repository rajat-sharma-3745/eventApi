import { ObjectId } from "mongodb";
import { getDB } from "../config/db.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";



export const getEvent = asyncHandler(async (req, res, next) => {
    const { id, type, limit, page } = req.query;
    const db = getDB();
    const eventCollection = db.collection('events')
    if (id) {
        if (!ObjectId.isValid(id)) {
            return next(new ApiError('Invalid Id', 400));
        }
        const event = await eventCollection.findOne({
            _id: new ObjectId(id)
        })
        if (!event) return next(new ApiError('Event not found', 404))
        return res.json(event);
    }
    if (type === 'latest') {
        const limitNum = Number(limit) || 5;
        const pageNum = Number(page) || 1;
        const skip = (pageNum - 1) * limit
        const events = await eventCollection
            .find({})
            .sort({ schedule: -1 })
            .skip(skip)
            .limit(limitNum)
            .toArray();

        return res.json(events);
    }
    res.status(400).json({ message: "Invalid query" });
})
export const createEvent = asyncHandler(async (req, res, next) => {
    const db = getDB();
    const eventCollection = db.collection('events')
    const {
        uid,
        name,
        tagline,
        schedule,
        description,
        moderator,
        category,
        sub_category,
        rigor_rank
    } = req.body;

    const image = req.file ? req.file.path : null;

    const eventData = {
        type: "event",
        uid: Number(uid),
        name,
        tagline,
        schedule: Number(schedule),
        description,
        image,
        moderator,
        category,
        sub_category,
        rigor_rank: Number(rigor_rank),
        attendees: []
    };

    const result = await eventCollection.insertOne(eventData);

    res.status(201).json({ id: result.insertedId });
})
export const updateEvent = asyncHandler(async (req, res, next) => {
    const db = getDB();
    const eventCollection = db.collection('events')
    const { id } = req.params;

    const {
        uid,
        name,
        tagline,
        schedule,
        description,
        moderator,
        category,
        sub_category,
        rigor_rank
    } = req.body;

    const image = req.file ? req.file.path : null;

    const updatedData = {
        uid: Number(uid),
        name,
        tagline,
        schedule: Number(schedule),
        description,
        moderator,
        category,
        sub_category,
        rigor_rank: Number(rigor_rank),
    };

    if (image) updatedData.image = image; // only update image if sent

    const result = await eventCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: updatedData }
    );

    if (result.matchedCount === 0) {
        return res.status(404).json({ message: "Event not found" });
    }

    res.json({ message: "Event updated successfully" });
})
export const deleteEvent = asyncHandler(async (req, res, next) => {
    const db = getDB();
    const eventCollection = db.collection('events')
    const { id } = req.params;

    const result = await eventCollection.deleteOne({
        _id: new ObjectId(id)
    });

    if (result.deletedCount === 0) {
        return next(new ApiError('Event not found', 404))
    }

    res.json({ message: "Event deleted successfully" });
})