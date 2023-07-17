const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config({})

function checkAuth (req, res, next){
    try{
        //πρέπει να πάρω το token που έχει σταλεί απο τον χρήστη
        //χρησιμοποιούμε συνήθως req.headers για να στείλουμε ένα token
        const token = req.headers.authorization.split(" ")[1];

        //Αφού πάρουμε το token πρέπει να το κάνουμε decode
        //για να σιγουρευτούμε ότι είναι γνήσιο

        const decodeToken = jwt.verify(token, process.env.SECRET_KEY);

        //τώρα προσθέτουμε τα δεδομένα αυτά στο req για να μπορούμε
        //να χρησιμοποιήσουμε αυτό το decoded token σε οποιαδήποτε
        //μέθοδο που χρησιμοποιεί το req parameter
        req.accessToken = decodeToken;

        //προχωράει την εκτέλεση στο επόμενο middleware
        next();
    }catch(e){
        return res.status(401).json({
            "message": "failed to authenticate"
        })
    }

}

module.exports = {
    checkAuth: checkAuth
}