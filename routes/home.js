const layout = require("../layout");

const get = (req, res) => {
    res.send(layout(`home`,
        `<h1>Home</h1>
    <a href="/sign-up">Sign Up</a>
    <a href="/log-in">Log In</a>
    `))
}

module.exports = { get };