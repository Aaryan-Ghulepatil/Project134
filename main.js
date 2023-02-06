sound="";
status="";
objects=[];



function setup(){
    canvas=createCanvas(380,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(380,380);
    video.hide();




        objectDetector= ml5.objectDetector("cocossd",modelLoaded);
    
        document.getElementById("status").innerHTML="Status: Detecting Objects";
}

function preload(){
    sound=loadSound("MV27TES-alarm.mp3");
}


    

function modelLoaded(){
    console.log("Model Loaded");
    status="true";
   
}
function gotResult(error,results){
   if(error){
    console.error(error);
   }
   else{
    console.log(results);
    objects=results;

   }
}
function draw(){
    image(video,0,0,380,380);
    
    if(status !=""){
        objectDetector.detect(video,gotResult);
     for(i=0; i<objects.length; i++){
        
         document.getElementById("status").innerHTML="Status: Object(s) detected";
        
         fill("red");
         percent=floor(objects[i].confidence*100);
         text(objects[i].label+" "+percent+"%",objects[i].x,objects[i].y);
         noFill();
         stroke("red");
         rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);

         if(objects[i].label=="person"){
            document.getElementById("status1").innerHTML="Baby Found";

         }
         else{
            document.getElementById("status1").innerHTML="Baby not Found";
            sound.play;
         }
     }
    }
 }

 ////background: linear-gradient(to right, red,blue,yellow,green);
//-webkit-text-fill-color: transparent;
//-webkit-background-clip: text;//