const mongoose = require('mongoose');
const User = mongoose.model('user');

const fetchUsers = async (request, response) => {
	const users = await User.find({});

	response.json(users);
};

const saveUser = async ({ name, email, password }) => {
	try {
		const newUser = new User({ name, email, password });

		return newUser.save();
	} catch (error) {
		response.json(error);
	}
};

module.exports = {
	fetchUsers,
	saveUser
};
