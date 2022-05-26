const bcrypt = require("bcryptjs/dist/bcrypt");
const layout = require("../layout");
const model = require("../database/model");

const get = (req, res) => {
  res.send(
    layout(
      `log-in`,
      `
    <h1>Log In</h1>
    <form method="POST">
    <label for="username">Your username</label>
    <input id="name"></input>
    <label for="password">Your password</label>
    <input id="password" type="password"></input>
    <button type="submit">Submit</button>
    </form>`
    )
  );
};

function verifyUser(email, password) {
  return model.getUser(email).then((user) => {
    return bcrypt.compare(password, user.password).then((match) => {
      if (!match) {
        throw new Error("password mismatch");
      } else {
        return user;
      }
    });
  });
}

function post(req, res) {
  const { email, password } = req.body;
  auth
    .verifyUser(email, password)
    .then(auth.saveUserSession)
    .then((sid) => {
      res.cookie("sid", sid, auth.COOKIE_OPTIONS);
      res.redirect("/all-posts");
    });
}

module.exports = { get, post };
