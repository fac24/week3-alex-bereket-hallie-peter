const layout = require("../layout");

const get = (req, res) => {
    res.send(layout(`sign-up`, `
    <h1>Quotes</h1>
    <form method="POST">
    <label for="post">Your quotation</label>
    <textarea id="post"></textarea>
    <button type="submit">Submit</button>
    </form>
    <section>
    <button type="submit">Log Out</button>
    </section>
    <section>
    //we will need to generate posts here//
    </section>
    `));
}

module.exports = { get };