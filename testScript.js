const axios = require('axios');

// Replace with your backend server URL
const baseUrl = 'http://localhost:3001';

// Example GET request
axios.get(`${baseUrl}/api/persons`)
  .then(response => {
    console.log('GET Request Response:', response.data);
  })
  .catch(error => {
    console.error('GET Request Error:', error.message);
  });


axios.get(`${baseUrl}/info`)
  .then(response => {
    console.log('GET Request Response:', response.data);
  })
  .catch(error => {
    console.error('GET Request Error:', error.message);
  });

axios.get(`${baseUrl}/api/persons/3`)
  .then(response => {
    console.log('GET Request Response:', response.data);
  })
  .catch(error => {
    console.error('GET Request Error:', error.message);
});

// Example DELETE
axios.delete(`${baseUrl}/api/persons/3`)
  .then(
    console.log('success!')
  )
  .catch(error => {
    console.error('GET Request Error:', error.message);
});

// Example POST request
const postData = {
  name : 'Arto Hellas',
  number : '000-111-222',
  id : 5
  // Your request payload
};

axios.post(`${baseUrl}/api/persons`, postData)
  .then(response => {
    console.log('POST Request Response:', response.data);
  })
  .catch(error => {
    console.error('POST Request Error:', error.response.data.error);
  });
