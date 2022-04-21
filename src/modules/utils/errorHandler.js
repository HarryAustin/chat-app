const validationError = (error) => {
  let errors = {};
  const errorArray = error.details;
  errorArray.forEach((error) => {
    errors[error.path[0]] = error.message;
  });
  console.log("errors", error);
  return errors;
};

module.exports = { validationError };
