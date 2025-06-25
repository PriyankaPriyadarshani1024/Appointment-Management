const Appointment = require('../models/Appointment');
const mongoose = require('mongoose');

exports.createAppointment = async(req, res) => {
    try {
        const now = new Date().toISOString();
        const appointment = await Appointment.create({
            ...req.body,
            status: req.body.status || 'planned',
            creationDate: now,
            lastUpdate: now,
            externalId: req.body.externalId || null,
            category: req.body.category || null,
            description: req.body.description || null
        });
        res.status(201).json(formatAppointment(appointment));
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getAppointments = async(req, res) => {
    try {
        const query = {};
        if (req.query.id) query._id = req.query.id;
        if (req.query.status) query.status = req.query.status;
        if (req.query.creationDate) query.creationDate = req.query.creationDate;
        if (req.query.lastUpdate) query.lastUpdate = req.query.lastUpdate;
        if (req.query.fields) {
            // Handle fields filtering if needed
            const fields = req.query.fields.split(',').reduce((acc, field) => {
                acc[field] = 1;
                return acc;
            }, {});
            const appointments = await Appointment.find(query, fields);
            return res.status(200).json(appointments.map(formatAppointment));
        }
        const appointments = await Appointment.find(query);
        res.status(200).json(appointments.map(formatAppointment));
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getAppointmentById = async(req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(404).json({ msg: "Not found" });
        }
        const appointment = await Appointment.findById(req.params.id);
        if (!appointment) return res.status(404).json({ msg: "Not found" });
        res.status(200).json(formatAppointment(appointment));
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateAppointment = async(req, res) => {
    try {
        const now = new Date().toISOString();
        const appointment = await Appointment.findByIdAndUpdate(
            req.params.id, {...req.body, lastUpdate: now }, { new: true }
        );
        if (!appointment) return res.status(404).json({ msg: "Not found" });
        res.status(200).json(formatAppointment(appointment));
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteAppointment = async(req, res) => {
    try {
        const appointment = await Appointment.findByIdAndDelete(req.params.id);
        if (!appointment) return res.status(404).json({ msg: "Not found" });
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const formatAppointment = (a) => {
    return {
        id: a._id.toString(),
        href: `http://localhost:8080/appointment/${a._id}`,
        externalId: a.externalId || null,
        category: a.category || null,
        description: a.description || null,
        status: a.status || 'planned',
        creationDate: a.creationDate ? a.creationDate.toISOString() : null,
        lastUpdate: a.lastUpdate ? a.lastUpdate.toISOString() : null,
        validFor: a.validFor || {},
        relatedParty: a.relatedParty || [],
        relatedEntity: a.relatedEntity || [],
        note: a.note || [],
        attachment: a.attachment || [],
        calendarEvent: a.calendarEvent || null,
        relatedPlace: a.relatedPlace || null,
        contactMedium: a.contactMedium || []
    };
};