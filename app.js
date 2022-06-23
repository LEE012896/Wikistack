const morgan = require("morgan")
const express = require("express")
const pages = require("./views")
const { db, Page, User } = require('./models');


db.authenticate()
  .then(() => {
    console.log('connected to the database');
  })

const app = express();

app.use(morgan("dev"));
app.use(express.static(__dirname + "/public"));

app.use(express.urlencoded({ extended: false }));

app.use('/wiki', require('./routes/wiki'))
// app.use('/user', require('./routes/users'))

app.get("/", (req, res, next) => {
    res.redirect("/wiki");
})

const init = async () => {
    await db.sync({force: true});
}

init();


const PORT = 3000;

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});
