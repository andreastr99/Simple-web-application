const express = require('express');
const app = express(); 
const cors = require('cors');


//όποτε έχω μια κλήση API δεν θα το μπλοκάρει και να μπορούμε να το ακούσουμε στο backend
app.use(cors())
//για να μπορούμε να ακούμε σε json format 
app.use(express.json());

//Define routes
//έτσι κάνω εισαγωγή ένα route που μόλις όρισα
const employeesRoute = require('./routes/employees');
const userRoute = require('./routes/user');

app.use("/api", employeesRoute);
app.use("/api", userRoute);


module.exports = app;