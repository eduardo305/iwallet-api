const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const MongoError = require('../MongoError');
const { Schema } = mongoose;

const userSchema = new Schema({
	name: { type: String, required: true },
	email: { type: String, required: true, lowercase: true, unique: true },
	password: { type: String, required: true },
	cards: [
		{
			type: Schema.Types.ObjectId,
			ref: 'cards'
		}
	]
});

userSchema.pre('save', async function(next) {
	this.isModified('password')
		? (this.password = await bcrypt.hash(this.password, 8))
		: next();
});

userSchema.post('save', function(error, doc, next) {
	error ? next(new MongoError(error)) : next();
});

userSchema.methods.comparePassword = function comparePassword(password, cb) {
	bcrypt.compare(password, this.password, (error, isMatch) => {
		cb(error, isMatch);
	});
};

mongoose.model('user', userSchema);
