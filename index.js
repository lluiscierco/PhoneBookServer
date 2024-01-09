// Imports
const express = require('express')  //import express
var morgan = require('morgan')


const app = express()  //create express applications

// Data
let phonebook = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]

// Middleware
app.use(express.static('dist'))
app.use(express.json()) //convert  json to strings
app.use(morgan('tiny'))

// HTTP requests
app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/info', (request, response) => {
  const lenPhonebook = Object.keys(phonebook).length
  const currentTime = new Date().toLocaleString()
  response.send(`<div><p>Phonebook has info for ${lenPhonebook} people</p><p>${currentTime}</p></div>`)
})

app.get('/api/persons', (request, response) => {
  response.json(phonebook)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = phonebook.find(person => person.id === id)
  if (person) {
    response.json(person)
  }
  else {
    response.status(404).end()
  }

})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  phonebook = phonebook.filter(person => person.id !== id)
  console.log('deleted',id)
  response.status(204).end()

})

app.post('/api/persons', (request, response) => {
  const newContact = request.body
  const id = Math.floor(Math.random()*1000000)
  newContact.id = id
  const duplicateContact = phonebook.find(person => person.name === newContact.name)

  if (newContact.name && newContact.number && !duplicateContact) {
    phonebook.push(newContact)
    console.log(phonebook)
    response.json(newContact)
  }
  else if (duplicateContact) {
    response.status(409).json({error: 'name must be unique'})
  }
  else if (!newContact.name) {
    response.status(400).json({error: 'must define a name'})
  }
  else if (!newContact.number) {
    response.status(400).json({error: 'must define a number'})
  }
})

// listen to http requests on defined port
const PORT = process.env.PORT || 3001 //env variable when defined or default 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})