const layout = require("../layout");
const model = require("../database/model.js")
const db = require("../database/connection.js");

// function getPosts() {
//     const getPosts = `SELECT users.username, posts.text_content 
//     FROM users
//     INNER JOIN posts
//     ON users.id = posts.user_id`;
//     return db.query(getPosts)
//         .then((result) => {
//             const posts = result.rows;
//             return posts;
//         });
// }

const get = (request, response) => {
    db.query(
        `SELECT text_content FROM posts`
    )
        .then((result) => {
            const posts = result.rows;
            return posts;
        })
        .then((result) => {
            let postsHTML = "";
            const posts = result;
            posts.map(
                (post) => {
                    postsHTML += `
          <div class="post-container">
          <p>Quote: ${post.text_content}</p>
          </div>`;
                })
            return postsHTML;
        })
        .then((postsHTML) => {
            response.send(layout(`sign-up`, `
    <h1>Quotes</h1>
    <form method="POST" action="/all-posts">
    <label for="post">Your quotation</label>
    <textarea id="post" name="post" value="post"></textarea>
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

function post(request, response) {
    //stop the user from breaking the server if username is too long
    console.log(request.body);
    return db.query(
        `INSERT INTO posts(text_content) VALUES($1)`,
        [
            request.body.post
        ]
    )
        .then(() => {
            response.redirect("/all-posts");
            // response.send('<p></p>');
        })
        .catch((err) => {
            response.status(500).send("<h1>Oops, something went wrong.</h1>");
        });
};


module.exports = { get, post };