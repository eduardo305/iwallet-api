const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

require('./models/User');

const userRoutes = require('./routes/UserRoutes');
const authRoutes = require('./routes/AuthRoutes');

const app = express();
app.use(bodyParser.json());
app.use(cors());

mongoose
	.connect('mongodb://admin:glh7809@ds229068.mlab.com:29068/iwallet', {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.then(() =>
		app.listen(process.env.PORT || 8000, () =>
			console.log('iWallet up and running...')
		)
	);

app.route('/').get((request, response) => response.send('Ola mundo!'));

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

app.use((error, request, response, next) => {
	return response.status(error.statusCode).json({ message: error.message });
});
