const express = require("express");
const app = express();
const jsonParser = express.json();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, PATCH, PUT, POST, DELETE, OPTIONS"
  );
  next();
});

app.get("/getTasks", jsonParser, function (request, response) {
  const fs = require("fs");
  fs.readFile("tasks.json", "utf-8", function readFileCallback(err, data) {
    if (err) {
      console.log(err);
    } else {
      let arr = [];
      try {
        arr = JSON.parse(data);
      } catch (error) {
        console.log(error);
        arr = [];
      }

      response.json(arr);
    }
  });
});

app.post("/addTask", jsonParser, function (request, response) {
  if (!request.body) return response.sendStatus(400);

  const fs = require("fs");
  fs.readFile("tasks.json", "utf-8", function readFileCallback(err, data) {
    if (err) {
      console.log(err);
    } else {
      let arr = [];
      try {
        arr = JSON.parse(data);
      } catch (error) {
        console.log(error);
        arr = [];
      }

      arr.push(request.body);
      json = JSON.stringify(arr);
      fs.writeFileSync("tasks.json", json);
      response.json(true);
    }
  });
});

app.put("/updateTask", jsonParser, function (request, response) {
  if (!request.body) return response.sendStatus(400);

  const fs = require("fs");
  fs.readFile("tasks.json", "utf-8", function readFileCallback(err, data) {
    let i = request.body.index;
    let task = request.body.task;

    if (err) {
      console.log(err);
    } else {
      let arr = [];
      try {
        arr = JSON.parse(data);
      } catch (error) {
        console.log(error);
        arr = [];
      }

      arr[i].name = task.name;
      arr[i].deadline = task.deadline;
      arr[i].priority = task.priority;
      arr[i].description = task.description;
      arr[i].tags = task.tags;
      json = JSON.stringify(arr);
      fs.writeFileSync("tasks.json", json);
      response.json(true);
    }
  });
});

app.put("/completeTask", jsonParser, function (request, response) {
  if (!request.body) return response.sendStatus(400);

  const fs = require("fs");
  fs.readFile("tasks.json", "utf-8", function readFileCallback(err, data) {
    let i = request.body.index;
    let value = request.body.value;

    if (err) {
      console.log(err);
    } else {
      let arr = [];
      try {
        arr = JSON.parse(data);
      } catch (error) {
        console.log(error);
        arr = [];
      }

      arr[i].done = value;
      json = JSON.stringify(arr);
      fs.writeFileSync("tasks.json", json);
      response.json(true);
    }
  });
});

app.delete("/deleteTask", jsonParser, function (request, response) {
  console.log(request.body);
  if (!request.body) return response.sendStatus(400);

  const fs = require("fs");
  fs.readFile("tasks.json", "utf-8", function readFileCallback(err, data) {
    if (err) {
      console.log(err);
    } else {
      let arr = [];
      try {
        arr = JSON.parse(data);
      } catch (error) {
        console.log(error);
        arr = [];
      }

      arr.push(request.body);
      arr = arr.filter((t) => t.id !== request.body.id);
      json = JSON.stringify(arr);
      fs.writeFileSync("tasks.json", json);
      response.json(true);
    }
  });
});

app.listen(3000, () => {
  console.log(`Server listening on the port: 3000`);
});
