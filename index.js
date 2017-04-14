const app = require("./app");
var port = process.env.PORT || 4000;
app.set('port', port);
app.listen(port, function(){
    console.log('Node app is running on port', port);
});
