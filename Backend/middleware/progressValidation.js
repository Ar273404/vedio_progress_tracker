// backend/middleware/progressValidation.js
const { body, validationResult } = require("express-validator");

const validateProgressUpdate = [
  body("userId").isString().notEmpty().withMessage("userId is required"),
  body("intervals")
    .isArray({ min: 1 })
    .withMessage("intervals must be a non-empty array"),
  body("intervals.*.start")
    .isFloat({ min: 0 })
    .withMessage("interval start must be a non-negative number"),
  body("intervals.*.end")
    .isFloat({ min: 0 })
    .custom((value, { req, path }) => {
      // The end must be greater than start for the same interval
      const startPath = path.replace(".end", ".start");
      const startValue =
        req.body.intervals?.[parseInt(path.match(/\d+/)[0])]?.start;
      if (startValue === undefined) {
        throw new Error("start value missing for interval");
      }
      if (value <= startValue) {
        throw new Error("interval end must be greater than start");
      }
      return true;
    }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Aggregate errors into a message
      const errorMsg = errors
        .array()
        .map((err) => err.msg)
        .join(", ");
      return res.status(400).json({ message: errorMsg });
    }
    next();
  },
];

module.exports = {
  validateProgressUpdate,
};
