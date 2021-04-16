Webcam.set({
    width:360,
    height:270,
    image_format:'jpeg',
    jpeg_quality:90
});

camera = document.getElementById("camera");
Webcam.attach('#camera');

function takeSnapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="captured_image" src="'+data_uri+'"/>';
    });
}

console.log('ml5 version: ', ml5.version);

classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/-BsUIwhTR/model.json',modelLoaded);

function modelLoaded(){
    console.log("Model Loaded");
}

function speak(){
    var synth = window.speechSynthesis;
    speek_data1 = "I think that you are showing me the" + prediction_1 + "hand gesture";
    speek_data2 = "If it is not" + prediction_1 + "then maybe it is the" + prediction_2 + "hand gesture";
    var utterThis = new SpeechSynthesisUtterance(speek_data1+speek_data2);
    synth.speak(utterThis);
}
function check(){
    img = document.getElementById('captured_image');
    classifier.classify(img,gotResult);
    gotResult();
}

function gotResult(error,results){
    if(error){
        console.error(error);
    }else{
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML=results[0].label;
        document.getElementById("result_emotion_name2").innerHTML=results[1].label;
        prediction_1 = results[0].label;
        prediction_2 = results[1].label;
        speak();
    }
}