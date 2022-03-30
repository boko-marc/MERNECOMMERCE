require('dotenv').config()
// application
const app = require('./app')
// databases
const db = require('../backend/Config/database')
// Admin add 
const Admin = require('./Models/AdminModels')
function initial() {
    Admin.estimatedDocumentCount((err, count) => {
      if (!err && count === 0) {
        new Admin({
          email: "admin@gmail.com",
          password: "$2b$10$IiDnt8Dx.L2mG6P8ClzuFOYO49GF1XXDZaAwJoZovy.eHBjkSqit2"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added Admin to Admin collection");
        });
    }
})
};
initial()
// listening port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port url http://localhost:${PORT}.`);
});