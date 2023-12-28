const express = require('express');
const fs = require('fs');
const cors = require('cors'); // Import the CORS module

const app = express();

// Enable CORS for all routes
app.use(cors());

// Define an endpoint to serve the file data as JSON to the frontend
app.get('/sendData', (req, res) => {
  // Read the file data
  fs.readFile('received_file.txt', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error reading file data');
    }

    // Split file data into an array of objects (assuming data is in a specific format)
    const dataArray = data.split('\n').map(line => {
      const [id, value, DimX, DimY, DimZ] = line.split(','); // Assuming data is comma-separated
      return { id, value, DimX, DimY, DimZ };
    });

    // Send the parsed data as JSON to the frontend
    res.json(dataArray);
  });
});

// Start the server on port 3002 (or any other port you prefer)
const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});