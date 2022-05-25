const layout = require("../layout");

const get = (req, res) => {
    res.send(layout(`log-in`, `
    <h1>Log In</h1>
    <form method="POST">
    <label for="username">Your username</label>
    <input id="name"></input>
    <label for="password">Your password</label>
    <input id="password" type="password"></input>
    <button type="submit">Submit</button>
    </form>`));
}

module.exports = { get };