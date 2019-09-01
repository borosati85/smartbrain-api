
const handleSignin = (req, res, bcrypt, database) => {
	const { email, password } = req.body;

	if (!email || ! password) {
	return res.json('Incorrect form submission');
	}

	database('login')
	.select('hash')
	.where({email: email})
	.then(data=> {
		isValid = bcrypt.compareSync(password,data[0].hash);

		if (isValid){
			database('users')
			.select('*')
			.where({email: email})
			.then(user => {
				res.json(user[0]);
			})		
		} else {
			res.json('invalid password')
		}
	})

	.catch(err => {
		console.log(err);
		console.log('Cannot login');
	})
};

module.exports = {
	handleSignin: handleSignin
}