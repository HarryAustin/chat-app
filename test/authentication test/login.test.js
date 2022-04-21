const chai = require("chai");
const { expect } = chai;
const sinon = require("sinon");
const { createResponse } = require("node-mocks-http");

// controllers
const { login } = require("../../src/modules/controllers/authentication");

// 3rd party
const { loginValidation } = require("../../src/modules/utils/validation");
const ErrorHandler = require("../../src/modules/utils/errorHandler");
const UserService = require("../../src/modules/lib/userService");
const Jwt = require("jsonwebtoken");

describe("LOGIN TESTS", () => {
  describe("Login integration tests", () => {
    describe("Tests for ERRORS", () => {
      beforeEach(() => {
        sinon.restore();
        sinon.verifyAndRestore();
      });

      afterEach(() => {
        sinon.restore();
        sinon.verifyAndRestore();
      });

      it("it should test and validate input", async () => {
        const req = { body: { username: "invalid", password: "invalid" } };
        const res = createResponse();
        const next = () => {
          return;
        };

        const validationResponse = {
          value: {},
          error: {
            details: [{ message: "error in field", path: ["field"] }],
          },
        };

        const formattedError = { field: "error in field" };

        const validationFunc = sinon
          .stub(loginValidation, "validate")
          .returns(validationResponse);

        const errorHandler = sinon
          .stub(ErrorHandler, "validationError")
          .returns(formattedError);

        const loginController = await login(req, res, next);

        expect(validationFunc.calledOnce).to.be.true;
        expect(validationFunc.calledWith(req.body)).to.be.true;

        expect(errorHandler.calledOnce).to.be.true;
        expect(errorHandler.calledWith(validationResponse.error)).to.be.true;

        expect(loginController._getJSONData()).to.have.property("errors");
        expect(loginController._getJSONData().errors).to.not.equal(null);
        expect(loginController._getJSONData().errors).to.have.property("field");
        expect(loginController._getJSONData().errors.field).to.not.equal(null);
      });

      it("it should return error for bad credentials -- USERNAME", async () => {
        const req = { body: { username: "wrong", password: "invalid" } };
        const res = createResponse();
        const next = () => {
          return;
        };

        const validationResponse = {
          error: {},
          value: { ...req.body },
        };

        // first validate data
        const validationFunc = sinon
          .stub(loginValidation, "validate")
          .returns(validationResponse);

        // next, call user service to check details and allow log in and return error since user is not valid
        const userValid = sinon.stub(UserService, "valid").returns({
          errors: {
            user: "Please ensure username is correct",
            password: null,
          },
          user: null,
        });

        const loginController = await login(req, res, next);

        expect(validationFunc.calledOnce).to.be.true;
        expect(validationFunc.calledWith(req.body)).to.be.true;

        expect(userValid.calledOnce).to.be.true;
        expect(
          userValid.calledWith(
            validationResponse.value.username,
            validationResponse.value.password
          )
        ).to.be.true;

        expect(loginController._getJSONData()).to.have.property("errors");
        expect(loginController._getJSONData().errors).to.have.property("user");
        expect(loginController._getJSONData().errors.user).to.not.equal(null);
      });

      it("it should return error for bad credentials -- PASSWORD", async () => {
        const req = { body: { username: "correct", password: "wrong" } };
        const res = createResponse();
        const next = () => {
          return;
        };

        const validationResponse = {
          error: {},
          value: { ...req.body },
        };

        // first validate data
        const validationFunc = sinon
          .stub(loginValidation, "validate")
          .returns(validationResponse);

        // next, call user service to check details and allow log in and return error since user is not valid
        const userValid = sinon.stub(UserService, "valid").returns({
          errors: {
            user: null,
            password: "password not correct",
          },
          user: null,
        });

        const loginController = await login(req, res, next);

        expect(validationFunc.calledOnce).to.be.true;
        expect(validationFunc.calledWith(req.body)).to.be.true;

        expect(userValid.calledOnce).to.be.true;
        expect(
          userValid.calledWith(
            validationResponse.value.username,
            validationResponse.value.password
          )
        ).to.be.true;

        expect(loginController._getJSONData()).to.have.property("errors");
        expect(loginController._getJSONData().errors).to.have.property(
          "password"
        );
        expect(loginController._getJSONData().errors.password).to.not.equal(
          null
        );
      });
    });

    describe("success in log in user", () => {
      beforeEach(() => {
        sinon.restore();
        sinon.verifyAndRestore();
      });

      afterEach(() => {
        sinon.restore();
        sinon.verifyAndRestore();
      });

      it("it should log user in", async () => {
        const req = { username: "correct", password: "correct" };
        const res = createResponse();
        const next = () => {
          return;
        };

        // first validate data
        const validationResponse = {
          error: {},
          value: { ...req.body },
        };

        const validationFunc = sinon
          .stub(loginValidation, "validate")
          .returns(validationResponse);

        //   next call my service and service returns user
        const userData = {
          _id: 1,
          username: "correct",
          password: "correct",
        };
        const userValid = sinon.stub(UserService, "valid").returns({
          user: userData,
        });

        // create a token for user
        const token = sinon.stub(Jwt, "sign").returns("something random");

        const loginController = await login(req, res, next);

        expect(validationFunc.calledOnce).to.be.true;
        expect(validationFunc.calledWith(req.body)).to.be.true;

        expect(userValid.calledOnce).to.be.true;
        expect(
          userValid.calledWith(
            validationResponse.value.username,
            validationResponse.value.password
          )
        ).to.be.true;

        expect(loginController._getJSONData()).to.have.property("user");
        expect(loginController._getJSONData().user).to.have.property("_id");
        expect(loginController._getJSONData().user).to.have.property(
          "username"
        );
        expect(loginController._getJSONData()).to.have.property("token");
      });
    });
  });
});
