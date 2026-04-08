const { param } = require("express-validator");
const { validate } = require("./auth.validator.js");

const validateFollowUser = [
    param("userId")
        .notEmpty().withMessage("User ID is required")
        .isMongoId().withMessage("Invalid User ID format"),
    validate
]

const validateFollowReq = [
    param("userId")
        .notEmpty().withMessage("User ID is required")
        .isMongoId().withMessage("Invalid User ID format"),
    validate
]

module.exports = { validateFollowUser, validateFollowReq };