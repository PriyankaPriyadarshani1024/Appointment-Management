const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    externalId: String,
    category: String,
    description: String,
    status: {
        type: String,
        default: "planned"
    },

    creationDate: { type: Date, required: true, default: Date.now },
    lastUpdate: { type: Date, required: true, default: Date.now },
    validFor: {
        startDateTime: Date,
        endDateTime: Date,
    },
    relatedParty: [{
        id: String,
        href: String,
        name: String,
        role: String,
        "@referredType": String
    }],
    relatedEntity: Array,
    note: Array,
    attachment: Array,
    calendarEvent: Object,
    relatedPlace: Object,
    contactMedium: Array,
});

module.exports = mongoose.model('Appointment', appointmentSchema);
