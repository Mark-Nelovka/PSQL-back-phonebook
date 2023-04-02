const express = require("express");
const app = express();
const port = 3001;

const authRouter = require("./routes/auth");
// const contactsRouter = require("./routes/contacts");
app.use(express.json());

app.use("/api/users", authRouter);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
