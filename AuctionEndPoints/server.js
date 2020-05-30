const express = require('express');
const app = express();


// Init Middleware
app.use(express.json());

// Define Routes
app.use('/api/pets', require('./routes/api/pets'));

const PORT = process.env.PORT || 5000;
let log = console.log ;
app.listen(PORT,()=>{
    log(`Server is running on port ${PORT}`);
})