require('dotenv').config({ debug: false });
const helmet = require('helmet');
const express = require('express');
const cors = require('cors');
const app = express();


app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!')
})




// ***=== GLOBAL ERROR HANDLING MIDDLEWARE... { MUST STAY AT THE VERY BOTTOM } ===***
app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  res.status(statusCode).json({
    error: {
      message: err.message,
      status: statusCode
    }
  });
});

module.exports = app;