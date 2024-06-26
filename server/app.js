const express = require('express');
const app = express(); 
const cors = require('cors');
const cookieParser = require("cookie-parser");

const corsOptions = {

    origin: "http://localhost:3000",
  
    credentials: true,
  
  };

//όποτε έχω μια κλήση API δεν θα το μπλοκάρει και να μπορούμε να το ακούσουμε στο backend
app.use(cors(corsOptions));
//για να μπορούμε να ακούμε σε json format 
app.use(express.json());


app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

//Define routes
//έτσι κάνω εισαγωγή ένα route που μόλις όρισα
const employeesRoute = require('./routes/employees');
const userRoute = require('./routes/user');
const skillRoute = require('./routes/skills')

app.use("/api", employeesRoute);
app.use("/api", userRoute);
app.use("/api", skillRoute);
app.use('*', function(req, res){
  res.status(404).send("Sorry, we can't find that!");
});

module.exports = app;