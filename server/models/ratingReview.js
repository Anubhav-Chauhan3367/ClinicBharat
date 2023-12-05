const mongoose = require("mongoose");

const ratingReviewSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Patient",
		required: true,
	},
	targetId: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
	},
	targetType: {
		type: String,
		enum: ["Doctor", "Clinic"],
		required: true,
	},
	stars: {
		type: Number,
		required: true,
		min: 0,
		max: 5,
	},
	review: String,
	comment: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

const RatingReview = mongoose.model("RatingReview", ratingReviewSchema);

// Instance methods for CRUD operations and updating order
RatingReview.createReview = async function (data) {
	return this.create(data);
};

RatingReview.getReviews = async function (targetId, targetType) {
	return this.find({ targetId, targetType }).populate("user");
};

RatingReview.updateReview = async function (reviewId, update) {
	return this.findByIdAndUpdate(reviewId, update, { new: true });
};

RatingReview.deleteReview = async function (reviewId) {
	return this.findByIdAndDelete(reviewId);
};

module.exports = RatingReview;
