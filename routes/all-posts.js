const layout = require("../layout");
const model = require("../database/model.js")


const get = (req, res) => {
    console.log(model.getPosts());
    model.getPosts()
        .then((result) => {
            let postsHTML = "";
            const posts = result;
            console.log(posts);
            const post = posts.map(
                (post) => {
                    console.log(post);
                    (postsHTML = `
          <div class="post-container">
          <p>User: ${post.username}</p>
          <p>Quote: ${post.text_content}</p>
          </div>`)
                })
            return postsHTML;
        })
        .then((postsHTML) => {
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
    ${postsHTML}
    </section>
    `));
        })
}

// const post = 

module.exports = { get };