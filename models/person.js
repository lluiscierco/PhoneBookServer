const mongoose = require("mongoose"); //import lib

const password = "2y9jalVcqfhOXsrA"; // access psw parameter 2y9jalVcqfhOXsrA

// URI of DB, accessed from website
const url = `mongodb+srv://lluiscierco:${password}@phonebookdb.5tnb44z.mongodb.net/?retryWrites=true&w=majority`;

console.log("connecting to MongoDB");

mongoose.set("strictQuery", false);
mongoose
  .connect(url)
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

// Define scheme for the documents (objects) of the collection (dictionary)
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

// Change toJSON method so it doesnt return id and version when fetching from DB
personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString(); //convert to str as is object
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Person", personSchema); // Only export the modul Note
