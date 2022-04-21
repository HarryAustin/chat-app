const chai = require("chai");
const expect = chai.expect;
const sinon = require("sinon");

// 3rd party
const bcrypt = require("bcrypt");

// my func
const UserService = require("../../src/modules/lib/userService");
const User = require("../../src/modules/models/User");

describe("user services", () => {
  describe("user services for authentication", () => {
    beforeEach(() => {
      sinon.restore();
      sinon.verifyAndRestore();
    });

    afterEach(() => {
      sinon.restore();
      sinon.verifyAndRestore();
    });

    it("it should register a user sucessfully", async () => {
      const args = { username: "correct", password: "correct" };

      const bcryptHash = sinon.stub(bcrypt, "hash").returns("somethingRandom");

      const createUser = sinon.stub(User, "create").returns({
        _id: 1,
        username: args.username,
        password: "somethingRandom",
      });

      const UserServiceFunc = await UserService.registerUser(args);

      expect(bcryptHash.calledOnce).to.be.true;
      expect(createUser.calledOnce).to.be.true;

      expect(UserServiceFunc).to.have.property("user");
      expect(UserServiceFunc.user).to.have.property("_id");
      expect(UserServiceFunc.user._id).to.not.be.undefined;
    });

    it("it should check if user is valid", async () => {
      const username = "correct";
      const password = "correct";

      // check if user exist
      const userData = {
        _id: 1,
        username: "correct",
      };
      const user = sinon.stub(User, "findOne").returns(userData);

      // check if password matches if user exist
      const isMatch = sinon.stub(bcrypt, "compare").returns(true);

      const validUser = await UserService.valid(username, password);

      expect(user.calledOnce).to.be.true;

      expect(isMatch.calledOnce).to.be.true;

      expect(validUser).to.have.property("user");
      expect(validUser.user).to.have.property("_id");
      expect(validUser.user).to.not.have.property("password");
    });
  });
});
