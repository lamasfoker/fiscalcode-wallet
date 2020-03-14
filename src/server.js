import express from "express";
import bodyParser from "body-parser";
import Person from "./Model/Person.js";
import PersonValidator from "./Service/PersonValidator.js";
const app = express();
const PORT = process.env.PORT || 4000;

//configuration for public folder
import path from "path";
app.use(express.static(path.resolve() + "/public_html"));
//configuration for accept json from post
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.get("/status", (req, res) => {
  res.json({
    status: "ok",
    statusCode: 200,
  })
});

app.post("/generate-fiscal-code", (req, res) => {
  let person = new Person(req.body.firstname, req.body.lastname, req.body.birthdate, req.body.isMale, req.body.municipality);
  let validator = new PersonValidator();
  if (!validator.validate(person)) {
    res.json({
      isValid: false,
      message: "valid-fiscal-code",
    })
  }
  res.json({
    isValid: false,
    fiscalcode: "valid-fiscal-code",
  })
});

app.get("*", (req, res) => {
  res.json({
    status: "Page Not Found",
    statusCode: 404,
  })
});

app.listen(PORT, () => console.log(`> Ready on http://localhost:${PORT}`));
