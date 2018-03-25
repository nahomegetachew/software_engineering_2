

/* this file contain all models they interact with file and persistant storage and 
this file serve */
var express = require('express');
var app = express();
var bodyParse = require('body-parser');
var fs = require('fs');
app.use(bodyParse());
app.use(express.static('public'));


var dictionary = readDictionary();




function search(key_word) {
    var similar={};
	key_word=key_word.trim();
	key_word=key_word.toUpperCase();
	var small_key_word=key_word.toLowerCase();
	var counter=0; //to limit the #no of return similar words to 5
	for(i in dictionary){
		if((i.startsWith(key_word) || i.startsWith(small_key_word)) && counter<5){
			similar[i]=dictionary[i];	
			counter++;	
		}
	}
	//console.log(c);
	return similar;
}
app.get('/delet', function (req, res) {
  var word=req.query['word'];
   word=word.trim();
   a=check(word);
   if((a[0]) && a[1]){
   delete dictionary[word];
   file()
   res.send("deleted");
   //res.send("deleted:done");  
   return;
  }
   res.send("the word desnt exist or empity field");
});
app.get('/add', function (req, res) {
  var word=req.query['word'];
  var mean=req.query['mean'];
   word=word.trim();
   mean=mean.trim();
   a=check(word);
   b=check(mean)
   if(!(a[0]) && a[1] && b[1]){
   dictionary[word]=mean;
   file();
   res.send("added");
   return;
}	
   res.send("the word exist or empity field");
});
app.get('/edit', function (req, res) {
  var word=req.query['word'];
  var mean=req.query['mean'];
   word=word.trim();
   mean=mean.trim();
   a=check(word);
   b=check(mean)
   if((a[0]) && a[1] && b[1]){
   dictionary[word]=mean;
   file();
   res.send("edited");
   return;
}
   res.send("the word doesnt exist or empity field");
});





function file(){
  fs.writeFile("./words.json", JSON.stringify(dictionary), function (err) {
  if (err) return console.log(err);
  console.log(JSON.stringify(dictionary));
  console.log('writing to ' + "./words.json");
});
}
function readDictionary(){
    var data = fs.readFileSync("./words.json", 'utf8');
    var wordsJson = JSON.parse(data.trim());
    return wordsJson;
}





app.get('/count', function(req, res){
    res.send(200, Object.keys(dictionary).length);
});

app.get('/dictionary', function(req, res){
    var word = req.query['word'];
    res.send(200, search(word));
});


function check(word){
    var a=[];
    a[0]=dictionary.hasOwnProperty(word);
    a[0]+=dictionary.hasOwnProperty(word.toUpperCase());
    a[0]+=dictionary.hasOwnProperty(word.toLowerCase());
    a[1]=!(word =="");
    //console.log(a[1]);
    return a;
}
app.listen(3000);











