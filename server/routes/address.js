const router = require("express").Router();
const verifyToken = require("../middlewares/verify-token");
const Address = require("../models/address");
const User = require("../models/user");
const axios = require("axios");

//set an address
router.post("/addresses", verifyToken, async (req, res) => {
	try {
		let address = new Address();
		address.user = req.decoded._id;
		address.country = req.body.country;
		address.fullName = req.body.fullName;
		address.streetAddress = req.body.streetAddress;
		address.city = req.body.city;
		address.state = req.body.state;
		address.zipcode = req.body.zipcode;
		address.phoneNumber = req.body.phoneNumber;
		address.deliverInstructions = req.body.deliverInstructions;
		address.securityCode = req.body.securityCode;

		await address.save();

		res.json({
			success: true,
			message: "Successfully added an address",
		});
	} catch (err) {
		res.status(500).json({
			success: false,
			message: err.message,
		});
	}
});
//get all addresses
router.get("/addresses", verifyToken, async (req, res) => {
	try {
		let addresses = await Address.find({ user: req.decoded._id });
		res.json({
			success: true,
			address: addresses,
		});
	} catch {
		res.status(500).json({
			success: false,
			message: err.message,
		});
	}
});
//get one address
router.get("/addresses/:id", verifyToken, async (req, res) => {
	try {
		let address = await Address.findOne({ _id: req.params.id });
		res.json({
			success: true,
			address: address,
		});
	} catch {
		res.status(500).json({
			success: false,
			message: err.message,
		});
	}
});

//get list of countries
router.get("/countries", async (req, res) => {
	try {
		let response = await axios.get("https://restcountries.com/v2/all");
		res.json(response.data);
	} catch (err) {
		res.status(500).json({
			success: false,
			message: err.message,
		});
	}
});
//update address
router.put("/addresses/:id", verifyToken, async (req, res) => {
	try {
		let foundAddress = await Address.findOne({ _id: req.params.id });
		if (foundAddress) {
			if (req.body.country) foundAddress.country = req.body.country;
			if (req.body.fullName) foundAddress.fullName = req.body.fullName;
			if (req.body.streetAddress)
				foundAddress.streetAddress = req.body.streetAddress;
			if (req.body.city) foundAddress.city = req.body.city;
			if (req.body.state) foundAddress.state = req.body.state;
			if (req.body.zipcode) foundAddress.zipcode = req.body.zipcode;
			if (req.body.phoneNumber) foundAddress.phoneNumber = req.body.phoneNumber;
			if (req.body.deliverInstructions)
				foundAddress.deliverInstructions = req.body.deliverInstructions;
			if (req.body.securityCode)
				foundAddress.securityCode = req.body.securityCode;

			await foundAddress.save();
		}

		res.json({
			success: true,
			message: "succesfully updated the address",
		});
	} catch {
		res.status(500).json({
			success: false,
			message: err.message,
		});
	}
});
//delete address
router.delete("/addresses/:id", verifyToken, async (req, res) => {
	try {
		let deletedAddress = await Address.remove({
			user: req.decoded._id,
			_id: req.params.id,
		});
		if (deletedAddress) {
			res.json({
				success: true,
				message: "Successfully deleted",
			});
		}
	} catch {
		res.status(500).json({
			success: false,
			message: err.message,
		});
	}
});
//set default
router.put("/addresses/set/default", verifyToken, async (req, res) => {
	try {
		const doc = await User.findOneAndUpdate(
			{ _id: req.decoded._id },
			{ $set: { address: req.body.id } },
		);
		if (doc) {
			res.json({
				success: true,
				message: "Successfully set this address as default",
			});
		}
	} catch (err) {
		res.status(500).json({
			success: false,
			message: err.message,
		});
	}
});

module.exports = router;
