const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
const sinon = require("sinon");
const { createResponse } = require("node-mocks-http");
const mongoose = require("mongoose");

chai.use(chaiHttp);

// connect mongoose, since it's basic project, i'll connect here
const DBName = "mongodb://127.0.0.1:27017/test";
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
mongoose
  .connect(DBName, options)
  .then((db) => {
    return;
  })
  .catch((err) => {
    return;
  });

// app
const app = require("../../src/app");

// my func
const User = require("../../src/modules/models/User");
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

describe("register ENDPOINT tests", () => {
  describe("end point error tests", () => {
    before(async () => {
      await User.deleteMany({});
    });

    beforeEach(async () => {
      sinon.restore();
      sinon.verifyAndRestore();
    }); //for sinon in the prev block not to have effect

    after(async () => {
      await User.deleteMany({});
      sinon.restore();
      sinon.verifyAndRestore();
    });

    it("it should return error for data", async () => {
      const wrongData = {
        username: "h",
        password: "hshs",
        confirmPassword: "sas",
      };
      const res = await chai
        .request(app)
        .post("/auth/v1/register")
        .send(wrongData);
      expect(res.status).to.equal(406);
      expect(res.body).to.have.property("errors");
      expect(res.body.username).to.not.equal(null);
      expect(res.body.password).to.not.equal(null);
      expect(res.body.confirmPassword).to.not.equal(null);
    });
  });

  describe("Test for success", () => {
    beforeEach(async () => {
      sinon.restore();
      sinon.verifyAndRestore();
      await User.deleteMany();
    }); //for sinon in the prev block not to have effect

    after(async () => {
      sinon.restore();
      sinon.verifyAndRestore();
      await User.deleteMany();
    });

    it("it should return error for data", async () => {
      const data = {
        username: "harry",
        password: "harry123",
        confirmPassword: "harry123",
      };
      const res = await chai.request(app).post("/auth/v1/register").send(data);
      expect(res.status).to.equal(201);
      expect(res.body).to.have.property("user");
      expect(res.body.user.username).to.not.equal(null);
      expect(res.body.user._id).to.not.equal(null);
    });
  });
});
