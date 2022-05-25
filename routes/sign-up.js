const layout = require("../layout");

const get = (req, res) => {
  res.send(
    layout(
      `sign-up`,
      `
    <h1>Sign Up</h1>
    <form method="POST">
    <label for="username">Your username</label>
    <input id="username"></input>
    <label for="email">Email please</label>
    <input id="email"></input>
    <label for="password">Your password</label>
    <input id="password" type="password"></input>
    <button type="submit">Submit</button>
    </form>`
    )
  );
};

module.exports = { get };
