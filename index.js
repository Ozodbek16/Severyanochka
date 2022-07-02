const express = require("express");
const { create } = require("express-handlebars");
const path = require("path");
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session);

const app = express();
const hbs = create({
  extname: "hbs",
  defaultLayout: "layout",
  runtimeOptions:{
    allowProtoMethodsByDefault: true,
    allowProtoPropertiesByDefault: true
  }
});

require('./helper/db')()
const store = new MongoDBStore({
  uri: 'mongodb+srv://Bobur:2vhYyYBf659w6eCm@cluster0.jnpjw6n.mongodb.net/Product',
  collection: 'mySession'
})


app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "./views");
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, "public")));
app.use(session({
  secret: 'some secret key',
  resave: false,
  saveUninitialized: false,
  store
}))

const authMiddleware = require('./middleware/auth')
const userMiddleware = require('./middleware/user')


const homeR = require("./routes/homeRouter");
const catalogR = require("./routes/catalogRouter");
const orderRouter = require("./routes/order");
const savedRouter = require("./routes/saved");
const contactRouter = require("./routes/contact");
const vacansyRouter = require("./routes/vacansy");
const favorites = require("./routes/favorites");
const authAdminRouter = require("./routes/admin/auth");
const adminRouter = require("./routes/admin/admin");
const card = require('./routes/card')


app.use(userMiddleware)
app.use("/", homeR);
app.use("/catalog", catalogR);
app.use("/order", orderRouter);
app.use("/saved", savedRouter);
app.use("/contact", contactRouter);
app.use("/vacansy", vacansyRouter);
app.use("/favorites", favorites);
app.use("/api", authAdminRouter);
app.use('/card' , card)
app.use("/admin", authMiddleware, adminRouter);

try {
  const port = normalizePort(process.env.port || 3000);
  app.listen(port, () => {
    console.log(`Sever ${port} porti bilan ishlayapti`);
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
