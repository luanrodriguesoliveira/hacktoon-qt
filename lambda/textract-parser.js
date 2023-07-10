const AWS = require("aws-sdk");

exports.handler = async (event) => {
  let result = {};

  let documentFields = event.documentFields;

  for (let i = 0; i < documentFields.length; i++) {
    let type = documentFields[i].Type.Text;
    let value = documentFields[i].ValueDetection.Text;

    type = toCamelCase(type);

    if (value.trim() !== "") {
      result[type] = value;
    }
  }

  return {
    user: result,
  };
};

function toCamelCase(str) {
  return str
    .toLowerCase()
    .split("_")
    .map((word, index) => {
      return index > 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word;
    })
    .join("");
}
