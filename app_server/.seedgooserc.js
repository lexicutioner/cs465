// .seedgooserc.js
module.exports = {
  modelBaseDirectory: "app_server/database/models", // model directory name
  models: ["*.js", "!db.js"], // model matches
  data: "data", // data directory
  db: "mongodb"//localhost:27017/travlr" // db connection url
  };