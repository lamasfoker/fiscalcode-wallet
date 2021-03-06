//my import
import Person from "./app/code/Model/Person.js";
import FiscalCodeGenerator from "./app/code/Service/FiscalCodeGenerator.js";
import FiscalCodeValidator from "./app/code/Service/FiscalCodeValidator.js";
import OmocodieCalculator from "./app/code/Service/OmocodieCalculator.js";
import axios from "axios";
//starting configuration
import express from "express";
const app = express();
const PORT = process.env.PORT ||4000;
//configuration for public folder
import path from "path";
app.use(express.static(path.resolve() + "/src/public_html"));
//configuration for accept json from post
import bodyParser from "body-parser";
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.post("/generate-fiscal-code", async (req, res) => {
  let person = new Person(req.body.firstName, req.body.lastName, req.body.birthDate, req.body.isMale, req.body.municipality);
  let generator = new FiscalCodeGenerator();
  const fiscalCode = await generator.generate(person);
  res.json({
    isValid: fiscalCode !== null,
    fiscalCode: fiscalCode,
  })
});

app.post("/validate-fiscal-code", async (req, res) => {
  let person = new Person(req.body.firstName, req.body.lastName, req.body.birthDate, req.body.isMale, req.body.municipality);
  let validator = new FiscalCodeValidator();
  const message = await validator.validate(person, req.body.fiscalCode);
  res.json({
    message: message
  })
});

app.post("/calculate-omocodie", async (req, res) => {
  let calculator = new OmocodieCalculator();
  res.json({
    list: calculator.calculate(req.body.fiscalCode)
  })
});

app.get("/bar-code/:fiscalCode", async (req, res) => {
  const url = 'http://barcodes4.me/barcode/c39/' + req.params.fiscalCode;
  const response = await axios.get(url, {
    responseType: 'arraybuffer'
  });
  res.type('image/png');
  res.send(response.data);
});

app.get("/.well-known/assetlinks.json", async (req, res) => {
  const packageName = process.env.PACKAGE_NAME || 'com.lamasfoker.example';
  const sha256 = process.env.SHA256 || '';
  res.json([{
    "relation": ["delegate_permission/common.handle_all_urls"],
    "target": {
      "namespace": "android_app",
      "package_name": packageName,
      "sha256_cert_fingerprints":
          [sha256]
    }
  }]);
});

app.get("*", (req, res) => {
  res.redirect(301, '/');
});

app.listen(PORT, () => console.log(`> Ready on http://localhost:${PORT}`));
