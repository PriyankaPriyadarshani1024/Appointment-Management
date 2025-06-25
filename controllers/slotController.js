const SearchSlot = require('../models/SearchTimeSlot');
exports.createSlot = async(req, res) => {
    try {
        const slot = await SearchSlot.create(req.body);
        res.status(201).json(slot);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.getSlots = async(req, res) => {
    try {
        const slots = await SearchSlot.find();
        res.status(200).json(slots);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.getSlotById = async(req, res) => {
    try {
        const slot = await SearchSlot.findById(req.params.id);
        if (!slot) return res.status(404).json({ msg: "Not found" });
        res.status(200).json(slot);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.updateSlot = async(req, res) => {
    try {
        const slot = await SearchSlot.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(slot);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.deleteSlot = async(req, res) => {
    try {
        await SearchSlot.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
