song="";
status="";
objects=[];
function preload()
{
    song=loadSound("alert.mp3");
}
function draw()
{
    image(video,0,0,380,380); 
    if (status != "")
    {
        objectdetector.detect(video,gotresults);
        r=random(255);
        g=random(255);
        b=random(255);
        for (i=0;i<objects.length;i++)
        {
            document.getElementById("status").innerHTML="status:objects Detected";
            fill(r,g,b);
            percent=floor(objects[i].confidence*100);
            text(objects[i].label+" "+percent+"%",objects[i].x+15,objects[i].y+15);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
            if(objects[i].label=="person")
            {
                document.getElementById("number_of_objects").innerHTML="Baby Found!";
                console.log("stop");
                song.stop();
            }
            else
            {
                document.getElementById("number_of_objects").innerHTML="Baby Not Found";
                console.log("start");
                song.play();
            }
        }
    }
}
function setup()
{
    canvas=createCanvas(380,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    objectdetector=ml5.objectDetector("cocossd",modelloaded);
    document.getElementById("status").innerHTML="Status: Detecting Objects";
}
function modelloaded()
{
    console.log("model loaded!");
    status=true;
    
}
function gotresults(error,result)
{
    if (error)
    {
        console.log(error);
    }
    else 
    {
        console.log(result);
        objects=result;
        
    }
}
