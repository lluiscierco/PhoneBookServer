const mongoose = require("mongoose"); //import lib

// Check if psw parameter was passed when running console: node mongo.js yourPassword

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2]; // access psw parameter 2y9jalVcqfhOXsrA

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

const Person = mongoose.model("Person", personSchema); // Create the model

if (process.argv.length > 3) {
  const name = process.argv[3];
  const number = process.argv[4];
  // Create documents (objects) to the model
  const person = new Person({
    name: name,
    number: number,
  });
  // Add doc to the DB
  person.save().then((result) => {
    console.log("phonebook updated");
    mongoose.connection.close(); // Must allways close connection!!
  });
} else {
  Person.find({}).then((person) => {
    console.log(person);
    mongoose.connection.close();
  });
}
