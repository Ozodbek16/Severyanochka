const express = require("express");
const { create } = require("express-handlebars");
const path = require('path')

const app = express();
const hbs = create({
  extname: "hbs",
  defaultLayout: "layout",
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "./views");
app.use(express.static(path.join(__dirname, "public")));

const homeR = require("./routes/homeRouter");
const catalogR = require("./routes/catalogRouter");

app.use("/", homeR);
app.use("/catalog", catalogR);

try {
  const port = normalizePort(process.env.port || 3000);
  app.listen(port, () => {
    console.log(`Server ${port} porti bilan eshitiliyapti.`);
  });
} catch (error) {
  console.error(error);
}

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
}
