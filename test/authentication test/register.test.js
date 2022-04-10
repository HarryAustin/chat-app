const chai = require("chai");
const expect = chai.expect;
const sinon = require("sinon");

// my func
const { login } = require("../../src/controllers/authentication");
const Validation = require("../../src/utils/validation");
const UserService = require("../../src/lib/userService");

describe("register integration test for controller", () => {
  describe("register errors", () => {
    it("it should return error for validation function with bad data", async () => {
      // data requirements are
      /*
        username, password, confirmPassword, profile pic
     */
      const req = {
        body: {
          username: "bad data",
          password: "bad password",
          confirmPassword: "not matching",
        },
      };

      const rawError = {
        error: {
          details: [{ message: "error in field", path: ["field"] }],
        },
      };
      const formattedError = { field: "error in field" };

      //   stub a validation function for an error
      const validationFunc = sinon
        .stub("Validation", registerValidation)
        .returns(rawError);

      const errorHandler = sinon
        .stub("ErrorHanler", errorHandler)
        .returns(formattedError);

      const loginController = await login(req, res, next);

      expect(validationFunc.calledOnce).to.be.true;
      expect(validationFunc.calledWith(req.body)).to.be.true;
      expect(validationFunc.calledBefore(errorHandler)).to.be.true;

      expect(errorHandler.callledOnce).to.be.true;
      expect(errorHandler.calledWith(rawError)).to.be.true;

      expect(loginController).to.have.property("errors");
      expect(loginController.errors).to.not.be.undefined;
      expect(loginController.errors).to.have.property("field");
      expect(loginController.errors.field).to.equal("error in field");
    });
  });

  describe("registration success", () => {
    it("it should encrypt password and successfully login", async () => {
      const req = {
        body: {
          username: "correct",
          password: "correct",
          confirmPassword: "correct",
        },
      };

      const validationFunc = sinon
        .stub("Validation", registerValidation)
        .returns({
          error: {},
          value: {
            username: "correct",
            password: "correct",
            confirmPassword: "correct",
          },
        });

      // hash the password
      const registerService = sinon.stub("UserService", registerUser).returns({
        user: {
          _id: 1,
          username: req.body.username,
          password: "somethingRandom",
        },
      });

      const loginController = await login(req, res, next);

      expect(validationFunc.calledOnce).to.be.true;
      expect(validationFunc.calledWith(req.body)).to.be.true;
      expect(validationFunc.calledBefore(registerService)).to.be.true;

      expect(registerService.calledOnce).to.be.true;
      expect(registerService.calledWith(req.body.username, req.body.password))
        .to.be.true;

      expect(loginController.errors).to.be.undefined;
      expect(loginController.user).to.not.be.undefined;
      expect(loginController.user.name).to.equal(req.user.name);
      expect(loginController.user._id).to.not.be.undefined;
      expect(loginController.user._id).to.equal(1);
      //   expect(loginController.user.password).to.not.be.undefined;
      //   expect(loginController.user.password).to.not.equal(null);
      //   expect(loginController.user.password).to.not.equal(req.body.password);
    });
  });
});
