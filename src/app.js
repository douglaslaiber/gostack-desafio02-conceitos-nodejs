const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");
const checkRepositoryId = require("./middlewares/checkRepositoryId")

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  }
  repositories.push(repository);

  return response.json(repository);
});

app.put("/repositories/:id", checkRepositoryId, (request, response) => {
  const repositoryId = request.params.id;
  const { title, url, techs } = request.body;

  let repositoryFound = repositories.find(repo => repo.id === repositoryId);
  repositoryFound.title = title;
  repositoryFound.url = url;
  repositoryFound.techs = techs;

  return response.json(repositoryFound);
});

app.delete("/repositories/:id", checkRepositoryId, (request, response) => {
  const repositoryId = request.params.id;

  let repositoryIndex = repositories.findIndex(repo => repo.id === repositoryId);
  repositories.splice(repositoryIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", checkRepositoryId, (request, response) => {
  const repositoryId = request.params.id;

  let repositoryFound = repositories.find(repo => repo.id === repositoryId);
  repositoryFound.likes++;

  return response.json(repositoryFound);
});

module.exports = app;
