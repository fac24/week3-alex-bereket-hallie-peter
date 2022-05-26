const layout = require("../layout");
const auth = require("../auth.js");
const model = require("../database/model.js");

const get = (request, response) => {
  response.send(
    layout(
      `sign-up`,
      `
    <h1>Sign Up</h1>
    <form method="POST">
    <label for="username">Your username</label>
    <input id="username"></input>
    <label for="email">Email please"</label>
    <input id="email"></input>
    <label for="password">Your password</label>
    <input id="password" type="password"></input>
    <button type="submit">Submit</button>
    </form>`
  )
  );
};

const post = (request, response) => {
  const { username, email, password } = request.body;
  
auth
    .makeUser(username, email, password)
    .then((user) => auth.userSession(user))
    .then((sid) => {
      response.cookie("sid", sid, auth.COOKIE_OPTIONS);
      response.redirect("/all-posts");
      })
    .catch((error) => {
      console.log(error);
      response.send(
      "<h1>Sorry, there was an issue signing up</h1></br><a href='/'>Home</a>"
        );
      });
  };




module.exports = { get, post };