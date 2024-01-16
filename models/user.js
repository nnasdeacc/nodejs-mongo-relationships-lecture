const mongoose = require("mongoose");

mongoose
	.connect("mongodb://localhost:27017/relationshipDemo", {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log("MONGO CONNECTION OPEN!");
	})
	.catch((err) => {
		console.log("OH NO! MONGO CONNECTION ERROR");
	});

const userSchema = new mongoose.Schema({
	first: String,
	last: String,
	addresses: [
		{
			_id: { _id: false },
			street: String,
			city: String,
			state: String,
			country: String,
		},
	],
});

const User = mongoose.model("User", userSchema);

const makeUser = async () => {
	const u = new User({
		first: "Harry",
		last: "Potter",
	});
	u.addresses.push({
		street: "123 Sesame St.",
		city: "New York",
		state: "NY",
		country: "USA",
	});
	const res = await u.save();
	console.log(res);
};

const addAddress = async (id) => {
	const user = await User.findById(id);
	user.addresses.push({
		street: "99 3rd St.",
		city: "New York",
		state: "NY",
		country: "USA",
	});
	const res = await user.save();
	console.log(res);
};

const removeLastAddress = async (id) => {
	const user = await User.findById(id);
	user.addresses.pop();
	const res = await user.save();
	console.log(res);
};

// makeUser();
addAddress("641dd64e1cba4232feb302d2");
// removeLastAddress("641dd64e1cba4232feb302d2");
