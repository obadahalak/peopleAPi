const express = require("express")
const path = require('path');
const {google} = require('googleapis');
const {authenticate} = require('@google-cloud/local-auth');

const people = google.people('v1');

var app = express()

app.set("view engine","ejs")

async function goolgleAuthentication(){
    const auth = await authenticate({
        keyfilePath: path.join(__dirname,'./client.json'),
        scopes: ['https://www.googleapis.com/auth/contacts'],
      });
      google.options({auth});
      return auth;

}


app.get("/", async  function(request,response){
  var credentials="";
    await goolgleAuthentication().then((r)=>credentials=r.credentials)
    response.render("index",{"data":credentials});
  })


app.listen(8000, function () {
console.log("Started application on port %d", 8000)
});