const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.use(cors());

// GET
app.get("/api", (req, res) => {
  const data = fs.readFileSync("./data.json", "utf-8");
  res.send(JSON.parse(data));
});
// POST
app.post("/api", (req, res) => {
  const data = fs.readFileSync("./data.json", "utf-8");
  const jsonData = JSON.parse(data);
  const newItem = req.body;

  jsonData.push(newItem);
  fs.writeFileSync("./data.json", JSON.stringify(jsonData));

  const updatedData = fs.readFileSync("./data.json", "utf-8");
  res.send(JSON.parse(updatedData));
});
// PUT
app.put("/api/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const data = fs.readFileSync("./data.json", "utf-8");
  const jsonData = JSON.parse(data);
  const newItem = req.body;
  const index = jsonData.findIndex((item) => item.id === id);

  if (index !== -1) {
    jsonData[index] = newItem;
    fs.writeFileSync("./data.json", JSON.stringify(jsonData));
    res.send(newItem);
  } else {
    res.status(404).send({ message: "Data not found" });
  }
});
// DELETE
app.delete("/api/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const data = fs.readFileSync("./data.json", "utf-8");
  const jsonData = JSON.parse(data);
  const index = jsonData.findIndex((item) => item.id === id);

  if (index !== -1) {
    const deletedItem = jsonData.splice(index, 1)[0];
    fs.writeFileSync("./data.json", JSON.stringify(jsonData));
    res.send(deletedItem);
  } else {
    res.status(404).send({ message: "Data not found" });
  }
});

app.listen(5000, () => console.log("Server is listening on port 5000"));
