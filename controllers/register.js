
handleRegister = (req, res, bcrypt, database) => {
	const { email, password, name } = req.body;
	var salt = bcrypt.genSaltSync(10);
	const hash = bcrypt.hashSync(password,salt);
	if (!email || !name || ! password) {
		return res.json('Incorrect form submission');
	}
	database.transaction(trx => {
		trx.insert({
			hash: hash,
			email: email,
		})
		.into('login')
		.returning('email')
		.then(
			trx.insert({
				name: name,
				email: email,
				joined: new Date()
			})
			.into('users')
			.returning('*')
			.then(user => {
				res.json(user[0])
			})
		)
		.then(trx.commit)
		.catch(trx.rollback)
	})
	.catch(err => console.log);
};

module.exports = {
	handleRegister: handleRegister
};