const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const CustomError = require('../CustomError');

const User = mongoose.model('user');

const secretKey = '123';
const expiresIn = '10';

// Create a token from a payload
const createToken = payload => {
	return jwt.sign(payload, secretKey, { expiresIn });
};

// Verify the token
const verifyToken = token => {
	return jwt.verify(token, secretKey, { clockTimestamp: 2 }, (err, decode) =>
		decode !== undefined ? decode : err
	);
};

const signin = async (request, response, next) => {
	const { email, password } = request.body;

	User.findOne({ email }, (error, user) => {
		if (error) {
			return next(
				new CustomError(
					500,
					'Something went wrong on the server. Please try again...'
				)
			);
		}

		if (!user) {
			return next(new CustomError(404, 'User not found'));
		}

		user.comparePassword(password, (error, isMatch) => {
			if (error) {
				return response.status(500).json(error);
			}

			if (isMatch) {
				return response
					.status(200)
					.json({
						message: 'User successfuly signed in!',
						token: createToken({ email: user.email, password: user.password })
					});
			}

			return response.status(401).json({ error: 'Credentials are invalid' });
		});
	});
};

const signup = async (request, response, next) => {
	const { name, email, password } = request.body;

	User.create({ name, email, password }, (error, user) => {
		if (error) {
			return next(error);
		}

		return response.status(200).json({
			message: 'User successfuly registered!',
			token: createToken({ email: user.email, password: user.password })
		});
	});
};

const isAuthenticated = async (req, res, next) => {
	const token = req.header('Authorization');

	if (!token) {
		return next(new CustomError(401, 'Not authorized to access this resource'));
	}

	const data = verifyToken(token);

	try {
		const user = await User.findOne({ email: data.email });

		if (!user) {
			return next(new CustomError(404, 'User not found'));
		}

		req.user = user;
		req.token = token;

		next();
	} catch (error) {
		next(new CustomError(401, 'Not authorized to access this resource'));
	}
};

module.exports = {
	signup,
	signin,
	isAuthenticated
};
