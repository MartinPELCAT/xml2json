import { readFileSync } from "fs";
import { parseString, processors } from "xml2js";
import { parseBooleans } from "xml2js/lib/processors";

const file = readFileSync(__dirname.concat("/exemple.xml"), "utf8");
// convertXml2Json(file);

parseString(
  file,
  {
    trim: true,
    explicitArray: false,
    valueProcessors: [
      processors.parseNumbers,
      function (value) {
        return typeof value === "string" &&
          (value === "false" || value === "true")
          ? parseBooleans(value)
          : value;
      },
    ],
  },
  (err, res) => {
    console.log(res);
  }
);
