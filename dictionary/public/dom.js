/**all controlers and views are in this file */

var ress;
function main(){
	ajax("/dictionary?word="+document.getElementById("word").value,"GET",search);
}
function search(res){
	res=JSON.parse(res.responseText);
	ress=res;
        var txt="<table id="+"table"+">"
        if(document.getElementById("word").value != ""){
	for (var a in res) {
		txt+="<tr><a><td id="+a+" onmouseover="+"hover(this.id)"+" onclick="+"selected(this.id)"+">"+a+"</td></a></tr>";
	}
	txt+="</table>";}
        dom("prediction",txt);
  dom("mean",res[Object.keys(res)[0]]);
  
  //document.getElementById("prediction").style.visibility = "visible";
 
}


function ajax(url,method, cFunction,post="") {
  var xhttp;
  xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      cFunction(this);
    }
  };var a="GET";
  xhttp.open(method, url, true);
  xhttp.send();
}

function hover(id){
	dom("mean",ress[id]);
}
function selected(id){
	dom("word",document.getElementById(id).innerHTML);

	dom("prediction","");
	dom("mean",ress[id]);
	//document.getElementById("prediction").style.visibility = "hidden"; 
}
function dom(id,txt) {
  document.getElementById(id).value=txt;
  document.getElementById(id).innerHTML =txt;
}

function deletb(){
  
    ajax("/delet?word="+document.getElementById("word").value,"GET",notf);
    c();
}
function addb(){
    ajax("/add?word="+document.getElementById("word").value+"&mean="+document.getElementById("mean").value,"GET",notf);
    c();
    count();
}
function editb(){
 
    ajax("/edit?word="+document.getElementById("word").value+"&mean="+document.getElementById("mean").value,"GET",notf);
    c();
    count();
}
function notf(res){
    alert(res.responseText);
    c();
    count();
    //alert(res[Object.keys(res)[0]]);
}
function count(){
 
  ajax("/count","GET",wc);
  

}
function wc(res){
  dom("wc","we have "+res.responseText+" words in our dictionary");
}
function c(){
  
  dom("word","");
  dom("mean","");
  count()
}




