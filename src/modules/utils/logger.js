const logger = (err) => {
  if (
    process.env.NODE_ENV === "development" ||
    process.env.NODE_ENV === "test"
  ) {
    console.log("stack", err.stack);
    console.log(err.message);
  }
  // else call production logger here
};

module.exports = { logger };
