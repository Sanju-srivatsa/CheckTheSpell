
// Reading the File
document.getElementById('inputfile').addEventListener('change', function() {
   var fileInput= document.getElementById("inputfile")
var filePath = fileInput.value;
 var allowedExtensions = /(.txt)$/i;
if (!allowedExtensions.exec(filePath)) {
                alert('Invalid file type');
                fileInput.value = '';
                return false;
    }                
else {
var fr = new FileReader();
fr.onload=function(){ 
document.getElementById('output')
.innerHTML=fr.result;
testing(fr.result); }
 fr.readAsText(this.files[0]);
        }})

//Api Hitting
function testing(x){;
 vale =  fetch('https://api.textgears.com/grammar?key=3jsLEzxQmEHfPa8c&text='+x+'&language=en-GB')
  vale.then(res=>res.json())
          .then(data => { 
        y=Object.values(data["response"])
        // console.log(y)
     misSpeltArray=[], z=[] ,offset=[]
    for(let i=0;i<y[1].length;i++) {
  // console.log((y[1][i]["bad"]))
    misSpeltArray[i]=y[1][i]["bad"]
    z[i]=(y[1][i]["better"][1])
     offset[i]=y[1][i]["offset"] }
    //console.log(offset)
    //
    len=misSpeltArray.length;
   
     res=[]
 for(let i=0;i<misSpeltArray.length;i++)
    {
     var zee='<span onclick="suggestions(this)" id="'+ i +'" class="'+i+'">'+ misSpeltArray[i] +'</span>'
      //console.log(zee)
      res[0]=x.substring(0,offset[0])
      res[i+1]=x.substring(offset[i],offset[i+1]).replace(misSpeltArray[i],zee)  
}
document.getElementById('output').innerHTML=res.join('')
}
).catch((e)=> {
var res
 
   
  }
) }


function suggestions(peer) {
  identifer=peer;
  //console.log(peer.id)
       var warn=" "
       if(document.getElementById('check') !== null){
       document.getElementById('check').remove();
      }
        for(let j=0;j<y[1][identifer.id]["better"].length;j++) {
         p= y[1][identifer.id]["better"][j]
        //console.log(x)
       warn+="<li class='list-group-item list-group-item-action list-group-item-info' onclick='display(this,event)'>"+ p.toLowerCase() +"</li>"
              } 
 suggestionList='<div id="check"  style="z-index:50">'+"<ul class='list-group'  >"+warn+"</ul>"+"</div>"
 

     check=document.getElementById('check')
    document.getElementById(identifer.id).innerHTML=document.getElementById(identifer.id).innerHTML+ suggestionList;
    sugPos (document.getElementById('check'),event.pageX, event.pageY)
}


   function display(selectedWord,event) { 
document.getElementById(identifer.className).innerHTML=selectedWord.innerHTML; document.getElementById(identifer.id).style.backgroundColor="white"; document.getElementById(identifer.id).removeEventListener("onclick",display)
    event.stopPropagation();
}

function sugPos(a,x,y){
    a.style.left=x+'px';
    a.style.top=y+'px';
}