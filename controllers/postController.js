const fs = require("fs");
const path = require("path");

const postsFilePath = path.join(__dirname, "../data/posts.json");

//Functions för att läsa och skriva JSON-Filen
const readPosts = () => JSON.parse(fs.readFileSync(postsFilePath));
const writePosts = (data) => fs.writeFileSync(postsFilePath, JSON.stringify(data, null, 2));

//Skapa nya inlägg/Posts.
exports.createPost = (req, res) => {
    const { title, content, author } = req.body;
    const posts = readPosts();

    const newPost = { id: Date.now(), title, content, author, createdAt: new Date() };
    posts.push(newPost);
    writePosts(posts);

    res.status(201).json({ message: "Inlägg skapat", post: newPost });
};

//Hämta alla inlägg/Posts.
exports.getPosts = (req, res) => {
    const posts = readPosts();
    res.json(posts);
};

//Uppdatera inlägg
exports.updatePost = (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    const posts = readPosts();

        const postIndex = posts.findIndex((post) => post.id === Number(id));
            if(postIndex === -1) return res.status(404).json({ message: "Inlägg hittades inte"});

        posts[postIndex] = { ...posts[postIndex], title, content, updatedAt: new Date() };
        writePosts(posts);

        res.json({ message: "Inlägg är uppdaterat", post: posts[postIndex] });        
};

//Radera inlägg
exports.deletePost = (req, res) => {
    const { id } = req.params;
    let posts = readPosts();

    posts = posts.filter((post) => post.id !== Number(id));
    writePosts(posts);

    res.json({ message: "Inlägg Raderat!" });
};