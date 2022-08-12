const express = require("express");
const appInstance = express();

appInstance.get('/', (request, response)=>{
    console.log("App start working");
    response.send("Node Express App Running");
});

appInstance.get('/welcome', (request, response)=>{
    response.send('{"response": "Welcome to the node js express"}');
});

appInstance.listen(3000, '0.0.0.0');
// export this so other files can use
module.exports = appInstance