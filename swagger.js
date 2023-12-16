const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Contacts API',
    description: 'A simple API for CRUD operations on a MongoDB database'
  },
  host: 'cse341-project1-ym9f.onrender.com',
  schemes: ['https']
};

const outputFile = './swagger-output.json';
const routes = ['./routes/index.js'];

swaggerAutogen(outputFile, routes, doc);