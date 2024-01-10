// Imports
const express = require("express"); //import express
var morgan = require("morgan");
const Person = require("./models/person"); // Import DB model

const app = express(); //create express applications

// Data
let phonebook = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

// Middleware Functions
const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }

  next(error); // pass to next middleware or default handling
};

// Not an error handler, responds to everything except erros with 404 error msg
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

// Middleware
app.use(express.static("dist"));
app.use(express.json()); //convert  json to strings
app.use(morgan("tiny"));

// HTTP requests
app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/info", (request, response) => {
  const currentTime = new Date().toLocaleString();
  Person.countDocuments({}).then((len) =>
    response.send(
      `<div><p>Phonebook has info for ${len} people</p><p>${currentTime}</p></div>`,
    ),
  );
});

app.get("/api/persons", (request, response) => {
  Person.find({})
    .then((person) => {
      console.log(person);
      response.json(person);
    })
    .catch((error) => console.log(error.message));
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  Person.findById(id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  Person.findByIdAndDelete(id)
    .then((person) => {
      console.log("deleted: ", person);
      response.status(204).end();
    })
    .catch((error) => next(error));
});

app.post("/api/persons", (request, response) => {
  const newContact = request.body;
  const person = new Person({
    name: newContact.name,
    number: newContact.number,
  });

  person.save().then((person) => {
    console.log(person);
    response.json(person);
  });
  /*
  const newContact = request.body;
  const id = Math.floor(Math.random() * 1000000);
  newContact.id = id;
  const duplicateContact = phonebook.find(
    (person) => person.name === newContact.name,
  );

  if (newContact.name && newContact.number && !duplicateContact) {
    phonebook.push(newContact);
    console.log(phonebook);
    response.json(newContact);
  } else if (duplicateContact) {
    response.status(409).json({ error: "name must be unique" });
  } else if (!newContact.name) {
    response.status(400).json({ error: "must define a name" });
  } else if (!newContact.number) {
    response.status(400).json({ error: "must define a number" });
  }
  */
});

app.use(unknownEndpoint); // What gets here is responded with 404 error msg unless it is an error.
app.use(errorHandler); //  defined at the end

// listen to http requests on defined port
const PORT = process.env.PORT || 3001; //env variable when defined or default 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
