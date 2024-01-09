const mongoose = require('mongoose') //import lib

// Check if psw parameter was passed when running console: node mongo.js yourPassword
/*
if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2] // access psw parameter
*/
// URI of DB, accessed from website
const url =
  `mongodb+srv://lluiscierco:2y9jalVcqfhOXsrA@phonebookdb.5tnb44z.mongodb.net/?retryWrites=true&w=majority`

console.log('connecting to MongoDB')

mongoose.set('strictQuery',false)
mongoose.connect(url).then(result => {
  console.log('connected to MongoDB')
})
.catch((error) => {
  console.log('error connecting to MongoDB:', error.message)
})

// Define scheme for the documents (objects) of the collection (dictionary)
const noteSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Note = mongoose.model('Note', noteSchema) // Create the model

// Create documents (objects) to the model
const note = new Note({
  name: 'Anna',
  number: '040-1234556',
})

// Add doc to the DB
note.save().then(result => {
  console.log('phonebook updated')
  mongoose.connection.close() // Must allways close connection!!
})
