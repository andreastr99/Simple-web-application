const jwt = require('jsonwebtoken');
// const dotenv = require('dotenv');

function checkAuth(req, res, next) {
  try {

    // Check if the Authorization header is present
    if (!req.headers.authorization) {
      return res.status(401).json({ "message": "Authorization header missing" });
    }

    // Check if the Authorization header is in the correct format (Bearer token)
    if (!req.headers.authorization.startsWith('Bearer ')) {
      return res.status(401).json({ "message": "Invalid Authorization header format" });
    }

    //πρέπει να πάρω το token που έχει σταλεί απο τον χρήστη
    //χρησιμοποιούμε συνήθως req.headers για να στείλουμε ένα token
    //Το token συνήθως έχει τη μορφή Bearer eyJhbGciOiJIUzI1
    //οπότε εγώ τα χωρίζω στο κενό και παίρνω το δεύτερο μέρος που είναι το
    //τοκεν μου  
    const token = req.headers.authorization.split(" ")[1];

    //Αφού πάρουμε το token πρέπει να το κάνουμε decode
    //για να σιγουρευτούμε ότι είναι γνήσιο

    // const decodeToken = jwt.verify(token, process.env.SECRET_KEY);
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
      if (err) {
        return res.status(401).json({ "message": "Invalid token" });
      }
      // Token is valid, attach the decoded user information to req.user
      req.user = user;
      next();
    });

  } catch (e) {
    return res.status(500).json({ "message": "Internal server error" });
  }
}

module.exports = {
  checkAuth: checkAuth,
}