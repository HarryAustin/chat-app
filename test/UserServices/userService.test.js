const chai = require("chai");
const expect = chai.expect;
const sinon = require("sinon");

// my func
const UserService = require("../../src/lib/userService");

describe("user services", () => {
  describe("user services for authentication", () => {
    it("it should register a user sucessfully", async () => {
      const args = { username: "correct", password: "correct" };

      const bcryptHash = sinon.stub("bcrypt", hash).returns("somethingRandom");

      const createUser = sinon.stub("User", create).returns({
        _id: 1,
        username: args.username,
        password: "somethingRandom",
        profilePic: "",
      });

      const UserServiceFunc = await UserService(args.username, args.password);

      expect(bcryptHash.calledOnce).to.be.true;
      expect(bcryptHash.calledBefore(createUser)).to.be.true;
      expect(bcryptHash.calledWith(args.password)).to.be.true;

      expect(createUser.calledOnce).to.be.true;
      expect(createUser.calledWith(args)).to.be.true;

      expect(UserServiceFunc.user.password).to.not.be.undefined;
      expect(UserServiceFunc.user.password).to.not.equal(null);
      expect(UserServiceFunc.user.password).to.not.equal(req.body.password);

      expect(UserServiceFunc).to.have.property("user");
      expect(UserServiceFunc.user).to.deeply.equal({
        _id: 1,
        username: args.username,
        password: "somethingRandom",
      });
      expect(UserServiceFunc.user).to.have.property("_id");
      expect(UserServiceFunc.user._id).to.not.be.undefined;
    });
  });
});
