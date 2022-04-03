const express = require('express');
const db = require('./models');
const { User } = require('./models');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3001;

app.get('/', (req, res) => {
	User.findAll({})
		.then(users => {
			res.json(users);
		})
		.catch(err => {
			res.json(err);
		});
});

app.post('/', (req, res) => {
	const { firstName, age } = req.body;
	console.log('firstName', firstName);
	console.log('age', age);
	User.create({ firstName, age })
		.then(user => {
			res.json(user);
		})
		.catch(err => {
			res.json(err);
		});
});

app.put('/:id', (req, res) => {
	const { id } = req.params;
	const { firstName, age } = req.body;
	User.update({ firstName, age }, { where: { id } })
		.then(user => {
			res.json(user);
		})
		.catch(err => {
			res.json(err);
		});
});

app.delete('/:id', (req, res) => {
	const { id } = req.params;
	User.destroy({
		where: {
			id,
		},
	})
		.then(user => {
			res.json(user);
		})
		.catch(err => {
			res.json(err);
		});
});

db.sequelize.sync().then(req => {
	app.listen(PORT, () => {
		console.log(`App listening on port ${PORT}`);
	});
});
