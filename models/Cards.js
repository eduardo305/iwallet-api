const mongoose = require('mongoose');
const { Schema } = mongoose;

const cardSchema = new Schema({
	name: { type: String, required: true },
	number: { type: String, required: true },
	flag: { type: String, required: true }
});

mongoose.model('card', cardSchema);
