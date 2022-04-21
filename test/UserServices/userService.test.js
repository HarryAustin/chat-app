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
  });
});
