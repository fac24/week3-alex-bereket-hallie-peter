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

    <label for="username">Enter your username</label>
    <input id="username"></input><br><br>

    <label for="email">Email
        <span style="color:#ff0000" aria-hidden="true">*</span> 
    </label>
    <input type="email" 
        id="email"
        aria-invalid="false"
        aria-describedby="emailError" required/><br><br>


    <label for="password">Password
        <span style="color:#ff0000" aria-hidden="true">*</span>
    </label>
    <div id="passwordRequirements">
        <p>Password must contain the following:</p>
          <ul>
            <li>A lowercase letter</li>
            <li>A capital (uppercase) letter</li>
            <li>A number</li>
            <li>Minimum 8 characters</li>
          </ul>
    </div>
     <input type="password"
          id="password"
          aria-invalid="false"
          aria-describedby="passwordRequirements passwordError"
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
          title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" required/>
    
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