const chai = require("chai");
const expect = chai.expect;
const sinon = require("sinon");
const { createResponse } = require("node-mocks-http");

// my func
const { register } = require("../../src/modules/controllers/authentication");
const { registerValidation } = require("../../src/modules/utils/validation");
const ErrorHandler = require("../../src/modules/utils/errorHandler");
const UserService = require("../../src/modules/lib/userService");

describe("register integration test for controller", () => {
  describe("register errors", () => {
    beforeEach(() => {
      sinon.restore();
      sinon.verifyAndRestore();
    });

    afterEach(() => {
      sinon.restore();
      sinon.verifyAndRestore();
    });

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

      const res = createResponse();

      const next = () => {
        return;
      };

      const rawError = {
        value: {},
        error: {
          details: [{ message: "error in field", path: ["field"] }],
        },
      };
      const formattedError = { field: "error in field" };

      //   stub a validation function for an error
      const validationFunc = sinon
        .stub(registerValidation, "validate")
        .returns(rawError);

      const errorHandler = sinon
        .stub(ErrorHandler, "validationError")
        .returns(formattedError);

      const registerController = await register(req, res, next);

      expect(validationFunc.calledOnce).to.be.true;
      expect(validationFunc.calledWith(req.body)).to.be.true;
      expect(validationFunc.calledBefore(errorHandler)).to.be.true;

      expect(errorHandler.calledOnce).to.be.true;
      expect(errorHandler.calledWith(rawError.error)).to.be.true;

      expect(registerController._getJSONData()).to.have.property("errors");
      expect(registerController._getJSONData().errors).to.not.be.undefined;
      expect(registerController._getJSONData().errors).to.have.property(
        "field"
      );
      expect(registerController._getJSONData().errors.field).to.equal(
        "error in field"
      );
    });
  });

  describe("registration success", () => {
    it("it should encrypt password and successfully login", async () => {
      const validationResponse = {
        error: {},
        value: {
          username: "correct",
          password: "correct",
          confirmPassword: "correct",
        },
      };

      const req = {
        body: {
          username: "correct",
          password: "correct",
          confirmPassword: "correct",
        },
      };

      const res = createResponse();

      const next = () => {
        return;
      };

      // validate data
      const validationFunc = sinon
        .stub(registerValidation, "validate")
        .returns(validationResponse);

      // hash the password and register user
      const registerService = sinon.stub(UserService, "registerUser").returns({
        user: {
          _id: 1,
          username: req.body.username,
          password: true,
        },
      });

      const registerController = await register(req, res, next);

      expect(registerService.calledOnce).to.be.true;
      expect(registerService.calledWith(validationResponse.value)).to.be.true;

      expect(registerController._getJSONData().errors).to.be.undefined;
      expect(registerController._getJSONData().user).to.not.be.undefined;

      expect(registerController._getJSONData().user._id).to.not.equal(null);
      expect(registerController._getJSONData().user.username).to.not.equal(
        null
      );
    });
  });
});
