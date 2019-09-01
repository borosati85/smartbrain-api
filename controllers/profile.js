
const handleProfile = (req, res, database) => {
	const { id } = req.params;

	let found = false;
	database.users.forEach(user=>{
		if (user.id === id){
			found = true;
			return res.json(user);
		}		
	})
	if (!found){
		res.status(400).json('User not found');
	}
}

module.exports = {
	handleProfile: handleProfile
}