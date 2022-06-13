const express = require("express");
const { create } = require("express-handlebars");
const app = express();
const path = require("path");

require("dotenv").config();

const exhbs = create({
  extname: "hbs",
  defaultLayout: "layout",
  runtimeOptions: {
    allowProtoMethodsByDefault: true,
    allowProtoPropertiesByDefault: true,
  },
});

app.engine("hbs", exhbs.engine);
app.set("view engine", "hbs");
app.set("views", "./views");

app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const homePage = require("./routes/homePage");

app.use("/", homePage);

try {
  const port = normalizePort(process.env.port || 8080);
  app.listen(port,()=>{
    console.log(`Server ${port} porti bilan eshitilyapti`)
  })
} catch (error) {
  console.log(error);
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