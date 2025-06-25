const mongoose = require('mongoose');
const searchSlotSchema = new mongoose.Schema({
    searchDate: Date,
    searchResult: String,
    status: String,
    requestedTimeSlot: Array,
    availableTimeSlot: Array,
    relatedParty: Object,
    relatedEntity: Array,
    relatedPlace: Object,
});
module.exports = mongoose.model('SearchTimeSlot', searchSlotSchema);