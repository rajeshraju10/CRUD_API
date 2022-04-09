import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";

import users from "./routes/users.js";

const app = express();
const PORT = 5000;
app.use(bodyParser.json());

mongoose
  .connect(
    `mongodb+srv://raju:raj1004@cluster0.ek9i8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("mongodb connected..."))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  console.log("hello");
  res.send("hello from home");
});
app.use("/users", users);

app.listen(PORT, () =>
  console.log(`server running on port: http://localhost:${PORT}`)
);
