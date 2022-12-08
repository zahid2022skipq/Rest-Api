import express from "express";
import bodyParser from "body-parser";
import Joi from "joi";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let fileData = [
  { id: 1, name: "Zahid" },
  { id: 2, name: "Khan" },
  { id: 3, name: "Ali" },
  { id: 4, name: "Haider" },
  { id: 5, name: "Smart" },
];

app.get("/", (req, res) => {
  return res.send("hello world");
});

app.get("/api/data", (req, res) => {
  return res.send({
    message: "Data",
    data: fileData,
  });
});

app.get("/api/data/:id", (req, res) => {
  const { id } = req.params;
  const index = fileData.findIndex((d) => d.id == id);
  return res.send({ message: `Data of ${id}`, data: fileData[index] });
});

app.post("/api/data", (req, res) => {
  const schema = { name: Joi.string().min(3).required() };

  const result = Joi.validate(req.body, schema);

  if (result.error) {
    res.status(400).send(result.error.details);
    return;
  }

  const data = {
    id: fileData.length + 1,
    name: req.body.name,
  };
  console.log(data, "-> ", req.body);
  fileData.push(data);
  return res.json({
    message: "Data",
    data: fileData,
  });
});

app.delete("/api/data/:id", (req, res) => {
  const { id } = req.params;

  const projectIndex = fileData.findIndex((p) => p.id == id);

  fileData.splice(projectIndex, 1);

  return res.send(fileData);
});
const port = process.env.PORT || 3000;
app.listen(3000, () => {
  console.log("====================================");
  console.log(`Server Listening on ${port}`);
  console.log("====================================");
});
