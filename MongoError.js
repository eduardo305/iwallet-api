const MongoErrorMap = {
	11000: {
		statusCode: 409,
		message: 'User already exists'
	}
};

class MongoError extends Error {
	constructor(error) {
		super(error);
		this.setStatusCode(error.code);
		this.setMessage(error.code);
	}

	setStatusCode(mongoCode) {
		this.statusCode = MongoErrorMap[mongoCode].statusCode || 500;
	}

	setMessage(mongoCode) {
		this.message = MongoErrorMap[mongoCode].message || '';
	}
}

module.exports = MongoError;
