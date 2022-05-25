const crypto = require("crypto");
const bcrypt = require("bcryptjs");
//const model = require("./database/model.js");
const { match } = require("assert");

const COOKIE_OPTIONS = {
  httpOnly: true,
  maxAge: 600000,
  sameSite: "strict",
  signed: true,
};

function makeUser(username, email, password) {
  return bcrypt.hash(password, 10).then((hash) => {
    return model.makeUserDB(username, email, hash);
  });
}

function userSession(user) {
  console.log("userSession", user);
  const sid = crypto.randomBytes(18).toString("base64");
  return model.makeSession(sid, { user });
}

function validateUser(email, password) {
  return model.getUser(email).then((user) => {
    bcrypt.compare(password, user.password).then((match) => {
      if (!match) {
        throw new Error("Password mismatch");
      } else {
        delete user.password;
        return user;
      }
    });
  });
}

module.exports = { COOKIE_OPTIONS, makeUser, userSession, validateUser };
