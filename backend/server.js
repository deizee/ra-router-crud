const http = require('http');
const Koa = require('koa');
const Router = require('koa-router');
const cors = require('koa2-cors');
const koaBody = require('koa-body');
const { openStdin } = require('process');

const app = new Koa();

app.use(cors());
app.use(koaBody({ json: true }));

let posts = [
  {
    id: 'aoWV0FjOJ23',
    content: 'Новый пост о кино',
    avatar: "https://i.pravatar.cc/40",
    name: 'Will Smith'
  },
  {
    id: 'aoWV0FjOJ24',
    content: 'Новый пост о книге',
    avatar: "https://i.pravatar.cc/40",
    name: 'Jane Austen'
  },
  {
    id: 'aoWV0FjOJ25',
    content: 'Новый рецепт от Джейми',
    avatar: "https://i.pravatar.cc/40",
    name: 'Jamie Oliver'
  }
];

const router = new Router();

router.get("/posts/:id", async (ctx, next) => {
  const { id } = ctx.params;
  const findPost = posts.find((o) => o.id === id);
  if (findPost) {
    ctx.response.body = findPost;
  } else {
    ctx.response.status = 404;
  }
});

router.get("/posts", async (ctx, next) => {
  ctx.response.body = posts;
});

router.post("/posts", async (ctx, next) => {
  const newPost = JSON.parse(ctx.request.body);
  posts.push({ ...newPost, created: Date.now() });
  ctx.response.status = 204;
});

router.put("/posts/:id", async (ctx, next) => {
  const data = JSON.parse(ctx.request.body);
  const findpost = posts.find(o => o.id == ctx.params.id);
  const filteredPosts = posts.filter(o => o.id != ctx.params.id);
  const editPost = {...findpost, content: data.content};
  posts = [...filteredPosts, editPost];
  ctx.response.status = 204;
});

router.delete("/posts/:id", async (ctx, next) => {
  const index = posts.findIndex((o) => o.id == ctx.params.id);
  if (index !== -1) {
    posts.splice(index, 1);
  }
  ctx.response.status = 204;
});

app.use(router.routes()).use(router.allowedMethods());

const port = process.env.PORT || 7777;
const server = http.createServer(app.callback());
server.listen(port, () => console.log("server started"));
