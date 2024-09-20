import express from "express";
import bodyParser from "body-parser";
import multer from "multer";
import cookieParser from "cookie-parser";
import session from "express-session";
import expressEjsLayouts from "express-ejs-layouts";
import path from "path";
import url from "url";
import routes from "./routes/index.js";
import flash from "express-flash";

const app = express();
const port = 3000;
const upload = multer();
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(expressEjsLayouts);
app.use(express.static(path.join(__dirname, "../public")));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.array());
app.use(cookieParser());

app.use(
  session({
    secret: "secret key",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(flash());

app.use(routes);

app.listen(port, () => {
  console.log(`Example app listening on  http://localhost:${port}`);
});
