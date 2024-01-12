const mongoose = require("mongoose"); //import lib
require("dotenv").config(); //import

const password = process.env.PASSWORD; // access psw parameter 2y9jalVcqfhOXsrA

// URI of DB, accessed from website
const url = process.env.MONGODB_URI;

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
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  number: {
    validate: {
      validator: function (value) {
        // Phone number format: XX-XXXXXXX or XXX-XXXXXXX
        return /^\d{2,3}-\d{7,8}$/.test(value);
      },
    },
    type: String,
    required: true,
  },
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
