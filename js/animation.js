"use strict";

import { Bouy } from "./bouy.js";

var timer = 0;
var introDuration = 6000;
var bobbleCount = 0;
var bobbleOffset = 0;
var bobblesCloned = 0;
var horizonOffset = 0;
var cloudCount = 0;
var shipCount = 0;
var waterOffset = 0;
var starCount = 20;
var shineInterval;
var documentOffsetY = 0;
var currentOffsetY = 0;
var seaScaleStartY = 0;
var seaStartY = 0;
var scrollDirection = 0;
var animating = 0;
var cloudArray = [];
var shipArray = [];
var clonedElement = [];
var cloudIntervalActive = 0;
var shipWaveIntervalActive = 0;
var bobbleMoveIntervalActive = 0;
var screenW, screenH, startScreenW, startScreenH, tempW, tempH, deltaW, deltaH;
var intro;
var flash_text;
var web_text;
var print_text;
var animationInterval;
var scrollInterval;
var cloudInterval;
var shipWaveInterval;
var bobbleMoveInterval;



function init(){
	var preloader = document.getElementsByClassName("preloader")[0];
	preloader.classList.add("preloader_disapear");
	getScreenSize();
	startScreenW =screenW;
	startScreenH =screenH;
	tempW = screenW
	tempH = screenH
	deltaW=  screenW - tempW
	deltaH=  screenH - tempH
	setFieldSizesAndClasses();
	prepareTexts();
	createStars(starCount);
	setTimeout(function(){deleteStars(starCount)}, introDuration);
	setTimeout(dalayedAssign, introDuration);
}

function getScreenSize(){
screenW = window.innerWidth
|| document.documentElement.clientWidth
|| document.body.clientWidth;

screenH = window.igetScreenSizennerHeight
|| document.documentElement.clientHeight
|| document.body.clientHeight;

}

function setFieldSizesAndClasses(){
var lmnt= document.getElementById("sky");
lmnt.style.height= screenH+5+"px";
lmnt.classList.add("sky_up");
var lmnt= document.getElementById("clouds_heigh");
lmnt.classList.add("clouds_heigh_up");
var lmnt= document.getElementById("clouds_middle");
lmnt.classList.add("clouds_middle_up");
var lmnt= document.getElementById("clouds_low");
lmnt.classList.add("clouds_low_up");
var lmnt= document.getElementById("horizon");
lmnt.style.height= screenH+"px";
var lmnt= document.getElementById("sea");
lmnt.style.height= screenH+"px";
var lmnt= document.getElementById("underwater");
lmnt.style.height= screenH+"px";	
}

function setFieldSizes(){
var lmnt= document.getElementById("sky");
lmnt.style.height= screenH+5+"px";
var lmnt= document.getElementById("horizon");
lmnt.style.height= screenH+"px";
var lmnt= document.getElementById("sea");
lmnt.style.height= screenH+"px";
var lmnt= document.getElementById("underwater");
lmnt.style.height= screenH+"px";	
}

function resizeWindow(){
getScreenSize();
deltaW = screenW -tempW;
deltaH = screenH -tempH;
tempW = screenW;
tempH = screenH;
setFieldSizes();
rePositionClouds();
rePositionBobbles();
rePositionShips();
	
}

function createStars(count){
var element = document.getElementById("sky");
for (var i=1; i<=count; i++){
var iTag = document.createElement("I");
var text = document.createTextNode("star");
iTag.appendChild(text); 
element.insertBefore(iTag, element.childNodes[0]);
element.getElementsByTagName("I")[0].classList.add("material-icons");
element.getElementsByTagName("I")[0].classList.add("star");
element.getElementsByTagName("I")[0].style.top = Math.round(Math.random()*screenH/4)+"px";
element.getElementsByTagName("I")[0].style.left = Math.round(Math.random()*screenW)+"px";
element.getElementsByTagName("I")[0].style.fontSize = Math.round(Math.random()*5+3)+"px";
var rotateAngel = Math.round(Math.random()*360);
element.getElementsByTagName("I")[0].style.transform = "rotate("+rotateAngel+"deg)";
element.getElementsByTagName("I")[0].style.webkitTransform = "rotate("+rotateAngel+"deg)";
element.getElementsByTagName("I")[0].style.oTransform = "rotate("+rotateAngel+"deg)";
element.getElementsByTagName("I")[0].style.mozTransform = "rotate("+rotateAngel+"deg)";
element.getElementsByTagName("I")[0].style.msTransform = "rotate("+rotateAngel+"deg)";
}
shineInterval = setInterval(function(){shine(count);}, 200);
};

function shine(count){
	var element = document.getElementById("sky");
	for (var i=0; i<count; i++){
element.getElementsByTagName("I")[i].style.opacity =Math.random()*0.5+0.5;
}
}

function deleteStars(count){
	clearInterval(shineInterval);
var parent = document.getElementById("sky");
var elementArray = parent.getElementsByTagName("I");
for (var i=count-1; i>=0; i--){
	var element = elementArray[i];
parent.removeChild(element);
addScrollEvent();
}
}

function dalayedAssign(){
var button1 = document.getElementsByClassName("video_button")[0];
button1.addEventListener("click", function(){easeScrollTo("horizon")});
setTimeout(function(){revealButtons(button1)}, 0);
var button2 = document.getElementsByClassName("web_button")[0];
button2.addEventListener("click", function(){easeScrollTo("sea")});
setTimeout(function(){revealButtons(button2)}, 500);
var button3 = document.getElementsByClassName("print_button")[0];
button3.addEventListener("click", function(){easeScrollTo("underwater")});
setTimeout(function(){revealButtons(button3)}, 1000);
setTimeout(function(){reveatNavigator()}, 2000);
setTimeout(function(){runAnimation(intro, 200)}, 2500);

var lmnt= document.getElementById("sky");
lmnt.classList.remove("trans-6s");
var lmnt= document.getElementById("horizon");
lmnt.classList.remove("hide");
var lmnt= document.getElementById("sea");
lmnt.classList.remove("hide");
var lmnt= document.getElementById("underwater");
lmnt.classList.remove("hide");
var lmnt= document.getElementById("clouds_heigh");
lmnt.classList.add("linear");
var lmnt= document.getElementById("clouds_middle");
lmnt.classList.add("linear");
var lmnt= document.getElementById("clouds_low");
lmnt.classList.add("linear");
var timerInterval = setInterval(startTimer, 20);
positionClouds();
var player_field = document.getElementsByClassName("flash_field")[0];
	player_field.activated = 0;
positionShips();
createBobbles();
}

function revealButtons(el){
el.classList.remove("hiddenButton");	
}

function reveatNavigator(){
	var bar = document.getElementsByClassName("bar")[0];
bar.classList.remove("hiddenBar");
var level = document.getElementsByClassName("level")[0];
level.classList.remove("hiddenBar");
var starButton = document.getElementsByClassName("star_button")[0];
starButton.classList.remove("hiddenBar");
starButton.addEventListener("click", function(){easeScrollTo("sky")});
var cloudButton = document.getElementsByClassName("cloud_button")[0];
cloudButton.classList.remove("hiddenBar");
cloudButton.addEventListener("click", function(){easeScrollTo("horizon")});
var waterButton = document.getElementsByClassName("water_button")[0];
waterButton.classList.remove("hiddenBar");
waterButton.addEventListener("click", function(){easeScrollTo("sea")});
var bobbleButton = document.getElementsByClassName("bobble_button")[0];
bobbleButton.classList.remove("hiddenBar");
bobbleButton.addEventListener("click", function(){easeScrollTo("underwater")});
}

function easeScrollTo(el){
if (animating == 0){
var duration = 2*50;
var container = document.getElementById("container");
var yCurrentPosition = container.scrollTop;
var element = document.getElementById(el);
var yTargetPosition = element.offsetTop;
element.timer = duration;
animating = 1;
var distance = yTargetPosition- yCurrentPosition;
var acceleration = 2*distance/Math.pow(duration-1, 2);
scrollInterval = setInterval(function(){easeScroll(acceleration, element)}, 20);
}
}

function easeScroll(a, e){
	var yTargetPosition = e.offsetTop;
var container = document.getElementById("container");
var yCurrentPosition = container.scrollTop;
var tempTargetPosition = yCurrentPosition + a*e.timer;
container.scrollTop = tempTargetPosition;
e.timer--;
if (e.timer<=0){
	animating = 0;
	scrollDirection=0;
	e.timer=0;
clearInterval(scrollInterval);	
}		
}

function startTimer(){
timer++;
if (timer> 9007199254740990){
	timer=0;
}
}

function getHorizonOffset(){
horizonOffset = document.getElementById("horizon").offsetTop;
}

function getBobbleOffset(){
bobbleOffset = document.getElementById("underwater").offsetTop;
}

function getWaterOffset(){
	var  wOffset;
wOffset = document.getElementsByClassName("sea_water")[0].offsetTop;
return wOffset;
}

function positionFlashPlayer(){
var player_field = document.getElementsByClassName("flash_field")[0];
player_field.style.top = screenH - player_field.offsetHeight +(horizonOffset- player_field.offsetTop)+ "px";	
}

function positionClouds(){
	getHorizonOffset();
	cloudArray = document.getElementsByClassName("flash_cloud");
	cloudCount= cloudArray.length;
	//var cloudPositions = getEvenDistribution(cloudCount);
for (var i=0; i<cloudCount; i++) {
	//var oneCloudPos = cloudPositions[i];
var cloudHeight = cloudArray[i].offsetHeight;
var cloudWidth = cloudArray[i].offsetWidth;
cloudArray[i].originalHeight = cloudHeight;
cloudArray[i].originalWidth = cloudWidth;
cloudArray[i].zDepth = Math.random()*2+1;
cloudArray[i].hoveredElement = 0;
cloudArray[i].activeElement = 0;
cloudArray[i].k = i;
cloudArray[i].initHeight = Math.round(cloudHeight*cloudArray[i].zDepth/3); 
cloudArray[i].initWidth = Math.round(cloudWidth*cloudArray[i].zDepth/3);
cloudArray[i].initY = cloudArray[i].zDepth*screenH/3-cloudArray[i].initHeight;
cloudArray[i].initX = Math.random()*screenW;
cloudArray[i].style.height = cloudArray[i].initHeight+ "px";
cloudArray[i].style.width = cloudArray[i].initWidth+ "px";
cloudArray[i].style.top = horizonOffset+cloudArray[i].initY+ "px";
cloudArray[i].style.left = cloudArray[i].initX + "px";
cloudArray[i].style.zIndex = Math.round(cloudArray[i].zDepth*33);
}
cloudAddMouseEvents();
}

function rePositionClouds(){
	getHorizonOffset();
	cloudArray = document.getElementsByClassName("flash_cloud");
	cloudCount= cloudArray.length;
	var heightRatio = screenH/startScreenH;
for (var i=0; i<cloudCount; i++) {
/* cloudArray[i].initHeight = Math.round(cloudHeight*cloudArray[i].zDepth/3); 
cloudArray[i].initWidth = Math.round(cloudWidth*cloudArray[i].zDepth/3);
cloudArray[i].style.height = cloudArray[i].initHeight+ "px"; 
cloudArray[i].style.width = cloudArray[i].initWidth+ "px"; */

cloudArray[i].curentY = cloudArray[i].initY * heightRatio;
cloudArray[i].style.top = horizonOffset+cloudArray[i].curentY+ "px";

}
}

function createBobbles(){
	getBobbleOffset();
	clonedElement = document.getElementsByClassName("bobble");
	bobbleCount= clonedElement.length;
for (var i=0; i<bobbleCount; i++) {
//var clonedElementHeight = clonedElement[i].offsetHeight;
//var clonedElementWidth = clonedElement[i].offsetWidth;
var clonedElementHeight = 100;
var clonedElementWidth = 100;
clonedElement[i].zDepth = Math.random()*0.5+0.5;
clonedElement[i].startAngle = Math.random()*Math.PI*2;
clonedElement[i].hoveredElement = 0;
clonedElement[i].activeElement = 0;
clonedElement[i].initHeight = Math.round(clonedElementHeight*clonedElement[i].zDepth); 
clonedElement[i].initWidth = Math.round(clonedElementWidth*clonedElement[i].zDepth);
clonedElement[i].initY = Math.random()*screenH;
clonedElement[i].initX = Math.random()*screenW-clonedElement[i].offsetWidth;
clonedElement[i].k = i;
createBobbleGlow(i);
clonedElement[i].style.height = clonedElement[i].initHeight+ "px";
clonedElement[i].style.width = clonedElement[i].initWidth+ "px";
clonedElement[i].style.top = bobbleOffset+clonedElement[i].initY+ "px";
clonedElement[i].style.left = clonedElement[i].initX+ "px";
clonedElement[i].style.zIndex = Math.round(clonedElement[i].zDepth*100);
}
addMouseEvents();
bobblesCloned=1;
}

function rePositionBobbles(){
	getBobbleOffset();
	clonedElement = document.getElementsByClassName("bobble");
	bobbleCount= clonedElement.length;
	var widthRatio = screenW/startScreenW;
	var heightRatio = screenH/startScreenH;
for (var i=0; i<bobbleCount; i++) {

/* clonedElement[i].style.height = clonedElement[i].initHeight+ "px";
clonedElement[i].style.width = clonedElement[i].initWidth+ "px"; */

var currentX = clonedElement[i].initX;
var currentY = clonedElement[i].offsetTop;
clonedElement[i].style.left = currentX*widthRatio+ "px";
clonedElement[i].style.top = currentY+deltaH + "px";
}
}

function cloneBobble(){
	getBobbleOffset();
for (var i=1; i<bobbleCount; i++) {
clonedElement = document.getElementsByClassName("bobble");
var clonedElementHeight = clonedElement[0].offsetHeight;
var clonedElementWidth = clonedElement[0].offsetWidth;
var copiedElement = clonedElement[0].cloneNode(true);
document.getElementById("underwater").appendChild(copiedElement);
clonedElement[i].zDepth = Math.random()*0.5+0.5;
clonedElement[i].startAngle = Math.random()*Math.PI*2;
clonedElement[i].hoveredElement = 0;
clonedElement[i].activeElement = 0;
clonedElement[i].initHeight = Math.round(clonedElementHeight*clonedElement[i].zDepth); 
clonedElement[i].initWidth = Math.round(clonedElementWidth*clonedElement[i].zDepth);
clonedElement[i].initY = Math.random()*screenH;
clonedElement[i].initX = Math.random()*screenW-copiedElement.offsetWidth;
clonedElement[i].k = i;
createBobbleGlow(i);
clonedElement[i].style.height = clonedElement[i].initHeight+ "px";
clonedElement[i].style.width = clonedElement[i].initWidth+ "px";
clonedElement[i].style.top = bobbleOffset+clonedElement[i].initY+ "px";
clonedElement[i].style.left = clonedElement[i].initX+ "px";
clonedElement[i].style.zIndex = Math.round(clonedElement[i].zDepth*100);
}
document.getElementsByClassName("bobble")[0].style.display ="none";
addMouseEvents();
movement = setInterval(function(){move();}, 20);
bobblesCloned=1;
}

function createBobbleGlow(i){
var element = document.getElementsByClassName("bobble")[i];
var bobbleContour = document.createElement("DIV");
var bobbleGlow = document.createElement("DIV");
element.appendChild(bobbleContour);
element.appendChild(bobbleGlow);  
element.getElementsByTagName("DIV")[0].classList.add("bobble_contour");
element.getElementsByTagName("DIV")[1].classList.add("bobble_glow");
}

function deleteBobbles(){
var parent = document.getElementById("underwater");
var elementArray = parent.getElementsByClassName("bobble");
for (var i=bobbleCount-1; i>=0; i--){
	var element = elementArray[i];
parent.removeChild(element);
}
document.getElementsByClassName("bobble")[0].style.display ="";
bobblesCloned=0;
clearInterval(movement);
}

function deleteShipPics(){
	var picArray =  document.getElementsByClassName("bouy_pic");
	var picCount = picArray.length;
	for (var i = picCount-1; i>= 0; i--){
		picArray[i].remove();	
	}
}
function addVectorShips(){
	var bouyArray =  document.getElementsByClassName("bouy");
	var bouyCount = bouyArray.length;
	for (var i = 0; i< bouyCount; i++){
		var bouy = new Bouy(bouyArray[i]);
		bouy.wave();	
	} 
}

function positionShips(){
	var onePoint = [];
	deleteShipPics();
	addVectorShips(); 
	var waterOffset = getWaterOffset();
	var waterHeight = document.getElementsByClassName("sea_water")[0].offsetHeight;
	shipArray = document.getElementsByClassName("ship");
	shipCount= shipArray.length;
	var points = getEvenDistribution(shipCount);
for (var i=0; i<shipCount; i++) {
		onePoint = points[i];
var shipHeight = shipArray[i].offsetHeight;
var shipWidth = shipArray[i].offsetWidth;
shipArray[i].originalHeight = shipHeight;
shipArray[i].originalWidth = shipWidth;
shipArray[i].zDepth = (onePoint[1]*0.7+0.3);
shipArray[i].startAngle = Math.random()*Math.PI*2;
shipArray[i].hoveredElement = 0;
shipArray[i].activeElement = 0;
shipArray[i].initHeight = 1.3*Math.round(shipHeight*shipArray[i].zDepth); 
shipArray[i].initWidth = 1.3*Math.round(shipWidth*shipArray[i].zDepth);
shipArray[i].initY = shipArray[i].zDepth*waterHeight*1.4-shipArray[i].initHeight - 0.2*waterHeight;
shipArray[i].currentY = shipArray[i].initY;
shipArray[i].initX = onePoint[0]*(screenW-shipArray[i].initWidth)+shipArray[i].initWidth/2;
shipArray[i].k = i;
shipArray[i].style.height = shipArray[i].initHeight+ "px";
shipArray[i].style.width = shipArray[i].initWidth+ "px";
shipArray[i].style.top = waterOffset + shipArray[i].initY + "px";
shipArray[i].style.left = shipArray[i].initX+"px";
shipArray[i].style.zIndex = Math.round(shipArray[i].zDepth*100);
}
shipAddMouseEvents();
}

function getEvenDistribution(pointCount){
	var tempPoints = new Array (pointCount);
	var horCount, vertCount, horLength, vertLength;
	var randomOrder = [];
	var horRow = [];
	var vertRow = [];
	var pointNr, x, y, k, orderNumber;
	
	vertCount = Math.floor(Math.sqrt(pointCount));
	horCount = Math.ceil(pointCount/vertCount);
	vertLength = 1/vertCount;
	horLength = 1/horCount;
	randomOrder = getRandomOrder(pointCount);
	for (var j = 0; j <vertCount; j++){
		
		for (var i = 0; i <horCount; i++){
			pointNr = j*(horCount) + i
			if (pointNr < pointCount) {
				var onePoint = new Array(2);
				k = getRandomSign();
				x = horLength*(i+ k*Math.random()/2);
				if(x<0) {x=0};
				if(x>1) {x=1};
				
				k = getRandomSign();
				y = vertLength*(j+ k*Math.random()/2);
				if(y<0) {y=0};
				if(y>1) {y=1};
				
				onePoint[0] = x;
				onePoint[1] = y;

				orderNumber = randomOrder[pointNr];
				tempPoints[orderNumber] = onePoint;
				
			}
		}
		
	}
	return tempPoints;

}

function getRandomSign(){
	var sign, value;
	value = Math.random();
	if (value >0.49 ) {
		sign = 1;
	} else {
		sign = -1;
	}
	return sign;
}

function getRandomOrder(count){
	var i;
	var j = count;
	var tempArr = [];
	var finalArr = [];
	var tempCount = count;
	var tempValue;
	for (i = 0; i <tempCount; i++){
			tempArr.push(i);
		}
		
	while (j > 0){
		tempValue = Math.round((tempArr.length-1)*Math.random());
		finalArr.push(tempArr[tempValue]);
		tempArr.splice(tempValue, 1);
		j = tempArr.length;
	}
	return finalArr;
}

function rePositionShips(){
	var waterOffset = getWaterOffset();
	var waterHeight = document.getElementsByClassName("sea_water")[0].offsetHeight;
	shipArray = document.getElementsByClassName("ship");
	shipCount= shipArray.length;
	var widthRatio = screenW/startScreenW;
	var heightRatio = screenH/startScreenH;
	for (var i=0; i<shipCount; i++) {
		
		/* shipArray[i].style.height = shipArray[i].initHeight+ "px";
		shipArray[i].style.width = shipArray[i].initWidth+ "px"; */
		shipArray[i].style.top = waterOffset + shipArray[i].currentY*heightRatio + "px"; 
		shipArray[i].style.left = shipArray[i].initX*widthRatio+"px";

	}
}

function scaleWater(speed, startH){
var scaleY =Math.round((documentOffsetY-seaScaleStartY)*speed/screenH+startH);
document.getElementsByClassName("sea_sky")[0].style.height=scaleY+"%";		
document.getElementsByClassName("sea_water")[0].style.height=100-scaleY+"%";
var waterNewOffset = document.getElementsByClassName("sea_water")[0].offsetTop;
getScreenSize();
	var heightRatio = screenH/startScreenH;
for (var i=0; i<shipCount; i++) {
shipArray[i].currentY = shipArray[i].initY*(100-scaleY)/100-shipArray[i].initHeight;	
shipArray[i].style.top = waterNewOffset+shipArray[i].currentY*heightRatio+ "px"; 
}
}

function shipWave(){
	for (var i=0; i<shipCount; i++){
		if (shipArray[i].hoveredElement==0){
			//var currentY = shipArray[i].offsetTop;
			var marginY=3*screenH/768*shipArray[i].zDepth*Math.sin(3/180*Math.PI*timer+shipArray[i].startAngle);
			var rotateY=3*screenH/768*Math.sin(1.5/180*Math.PI*timer+shipArray[i].startAngle);
			var matrixSkew = rotateY/72;
			var matrixTranslateY = Math.abs(2*screenH/768*shipArray[i].zDepth*Math.sin(1.5/180*Math.PI*timer+shipArray[i].startAngle+1.5/360*Math.PI));
			//shipArray[i].style.marginTop = marginY +"px";
			/*shipArray[i].style.transform = "rotate("+rotateY+"deg)";
			shipArray[i].style.mozTransform = "rotate("+rotateY+"deg)";
			shipArray[i].style.webkitTransform = "rotate("+rotateY+"deg)";
			shipArray[i].style.msTransform = "rotate("+rotateY+"deg)";
			shipArray[i].style.oTransform = "rotate("+rotateY+"deg)"; */ 
			shipArray[i].style.transform = "matrix(1, "+matrixSkew+", "+-matrixSkew+", 1, 0, "+matrixTranslateY+")";
			shipArray[i].style.mozTransform = "matrix(1, 0, 0, 1, 0, +10*rotateY)";
			shipArray[i].style.webkitTransform = "matrix(1, 0, 0, 1, 0, +10*rotateY)";
			shipArray[i].style.msTransform = "matrix(1, 0, 0, 1, 0, +10*rotateY)";
			shipArray[i].style.oTransform = "matrix(1, 0, 0, 1, 0, +10*rotateY)"; 
		}
	}
}

function cloudAddMouseEvents() {
for (var i=0; i<cloudCount; i++) {
var elementFromArray = document.getElementsByClassName("flash_cloud")[i];
elementFromArray.addEventListener("mouseover", cloudAddMouseOver);
elementFromArray.addEventListener("mouseleave", cloudAddMouseLeave);	
elementFromArray.addEventListener("click", cloudAddMouseClick);		
}		
}

function shipAddMouseEvents() {
for (var i=0; i<shipCount; i++) {
var elementFromArray = document.getElementsByClassName("ship")[i];
elementFromArray.addEventListener("mouseover", shipAddMouseOver);
elementFromArray.addEventListener("mouseleave", shipAddMouseLeave);	
elementFromArray.addEventListener("click", shipAddMouseClick);		
}		
}
function addMouseEvents() {
for (var i=0; i<bobbleCount; i++) {
var elementFromArray = document.getElementsByClassName("bobble")[i];
elementFromArray.addEventListener("mouseover", addMouseOver);
elementFromArray.addEventListener("mouseleave", addMouseLeave);	
elementFromArray.addEventListener("click", addMouseClick);		
}		
}

function addScrollEvent(){
var container= document.getElementById("container");
container.addEventListener("scroll", checkScroll);
//window.addEventListener("scroll", checkScroll);	
}

function checkScroll(){
seaStartY= document.getElementById("sea").offsetTop;
seaScaleStartY= seaStartY-document.getElementById("sea").offsetHeight;	
var BobbleCreationStartY = document.getElementById("underwater").offsetTop-screenH;
var container= document.getElementById("container");
var introY = document.getElementsByClassName("intro")[0].offsetTop;
var flashTextY = document.getElementsByClassName("flash_text")[0].offsetTop;
var webTextY = document.getElementsByClassName("web_text")[0].offsetTop;
var printTextY = document.getElementsByClassName("print_text")[0].offsetTop;
documentOffsetY = container.scrollTop;
//documentOffsetY = document.documentElement.scrollTop || document.body.scrollTop;
checkScrollDirection();
positionLevel();
//jumpScroll();
if (documentOffsetY < 200 && scrollDirection==-1){
if ( document.getElementsByClassName("clouds_low_uper")[0] !== null){
document.getElementById("clouds_low").classList.remove("clouds_low_uper");
}
if ( document.getElementsByClassName("clouds_middle_uper")[0] !== null){
document.getElementById("clouds_middle").classList.remove("clouds_middle_uper");
}
if ( document.getElementsByClassName("clouds_heigh_uper")[0] !== null){
document.getElementById("clouds_heigh").classList.remove("clouds_heigh_uper");
}
}
if (documentOffsetY >= 80 && scrollDirection==1){
document.getElementById("clouds_low").classList.add("clouds_low_uper");
document.getElementById("clouds_middle").classList.add("clouds_middle_uper");
document.getElementById("clouds_heigh").classList.add("clouds_heigh_uper");
}
if (documentOffsetY < horizonOffset-screenH/3){
var flash_field = document.getElementsByClassName("flash_field")[0];
if (flash_field.activated ==1){
	flash_field.classList.add("flash_away");
	flash_field.activated =0;
}
}
if (documentOffsetY < horizonOffset-screenH && cloudIntervalActive == 1){
	clearInterval(cloudInterval);
	cloudIntervalActive = 0;
}

if (documentOffsetY >= horizonOffset-screenH && cloudIntervalActive == 0){
	cloudInterval = setInterval(function(){relativeMove(1)}, 20);
	cloudIntervalActive = 1;
}
if (documentOffsetY > seaStartY && cloudIntervalActive == 1){
	clearInterval(cloudInterval);
	cloudIntervalActive = 0;
}
if (documentOffsetY < seaScaleStartY && shipWaveIntervalActive == 1){
	clearInterval(shipWaveInterval);
	shipWaveIntervalActive = 0;
}
if (documentOffsetY >= seaScaleStartY){
	scaleWater(20,10);
	if (shipWaveIntervalActive == 0){
	shipWaveInterval = setInterval(function(){shipWave();}, 20);
	shipWaveIntervalActive = 1;
}
}

if (documentOffsetY >= seaScaleStartY+ screenH/8){
			var flash_field = document.getElementsByClassName("flash_field")[0];
if (flash_field.activated ==1){
	flash_field.classList.add("flash_away");
	flash_field.activated =0;
}
}
if (documentOffsetY > seaStartY+screenH-50 && shipWaveIntervalActive == 1){
	clearInterval(shipWaveInterval);
	shipWaveIntervalActive = 0;
}
if (documentOffsetY >= seaStartY){
	scaleWater(60,-30);
}

if(shipArray.opened ==1){
	shipCloseWindow();
	if(shipArray.positionTaken ==0){
	var tempTargetPosition = documentOffsetY;
	shipArray.positionTaken = 1;
	}
//window.scrollTo(0, tempTargetPosition);
} 

if (documentOffsetY < BobbleCreationStartY && bobbleMoveIntervalActive ==1){
	clearInterval(bobbleMoveInterval);
		bobbleMoveIntervalActive =0;
//deleteBobbles();
}

if (documentOffsetY >= BobbleCreationStartY && bobbleMoveIntervalActive ==0){
bobbleMoveInterval = setInterval(function(){move();}, 20);
bobbleMoveIntervalActive =1;
//createBobbles();
}

if (documentOffsetY > flashTextY - screenH/2) {
	runAnimation(flash_text, 200);	
}

if (documentOffsetY > webTextY - screenH/2) {
	runAnimation(web_text, 200);	
}
if (documentOffsetY > printTextY - screenH/2) {
	runAnimation(print_text, 200);	
}
}

function positionLevel(){
var container= document.getElementById("container");
var sceneHeight = document.getElementById("sky").offsetHeight+document.getElementById("horizon").offsetHeight+document.getElementById("sea").offsetHeight;
var currentScrollY = container.scrollTop;
var bar= document.getElementsByClassName("bar")[0];
var level= document.getElementsByClassName("level")[0];
var barHeight = bar.offsetHeight;
var barTopPosition = bar.offsetTop;
level.style.top =	barTopPosition + barHeight/10 + 4*barHeight*currentScrollY/sceneHeight/5+ "px";
}

function checkScroll1(){
var container= document.getElementById("container");	
var documentOffsetY = container.scrollTop;
if( documentOffsetY >100) {
	//alert ("It works");
}	
}		


function checkScrollDirection(){
var container= document.getElementById("container");
documentOffsetY = container.scrollTop;
if (documentOffsetY-currentOffsetY > 0) {
scrollDirection = 1;	
}
if (documentOffsetY-currentOffsetY < 0) {
scrollDirection = -1;	
}
if (documentOffsetY-currentOffsetY == 0) {
scrollDirection = 0;	
}
currentOffsetY = documentOffsetY;
}

function jumpScroll(){
var skyOffsetY= document.getElementById("sky").offsetTop;
var horizonOffsetY= document.getElementById("horizon").offsetTop;
var seaOffsetY= document.getElementById("sea").offsetTop;	
var underwaterOffsetY = document.getElementById("underwater").offsetTop;
var documentOffsetY = document.documentElement.scrollTop || document.body.scrollTop;
if (animating ==0){
if (documentOffsetY > skyOffsetY+200 && documentOffsetY < horizonOffsetY-200)	{
if (scrollDirection = 1) {easeScrollTo("horizon");};
if (scrollDirection = -1) {easeScrollTo("sky");	}; 
};
if (documentOffsetY > horizonOffsetY+200 && documentOffsetY < seaOffsetY-200)	{
if (scrollDirection = 1) {easeScrollTo("sea");};
if (scrollDirection = -1) {easeScrollTo("horizon");	};
};
if (documentOffsetY > seaOffsetY+200 && documentOffsetY < underwaterOffsetY-200)	{
if (scrollDirection = 1) {easeScrollTo("underwater");};
if (scrollDirection = -1) {easeScrollTo("sea");	};
};
}
}

function message(){
alert("It works");	
}

function cloudAddMouseOver(){
	cloudHoverSet(this);
}
function cloudAddMouseLeave(){
	cloudUnHoverSet(this);
}
function cloudAddMouseClick(){
	cloudClickSet(this);
}

function shipAddMouseOver(){
	shipHoverSet(this);
}
function shipAddMouseLeave(){
	shipUnHoverSet(this);
}
function shipAddMouseClick(){
	shipClickSet(this);
}

function addMouseOver(){
	hoverSet(this);
}
function addMouseLeave(){
	unHoverSet(this);
}
function addMouseClick(){
	clickSet(this);
}

function cloudHoverSet(el){
cloudArray[el.k].hoveredElement=1;
cloudArray[el.k].style.zIndex = "";
	
}

function cloudUnHoverSet(el){
cloudArray[el.k].hoveredElement=0;
}

function cloudClickSet(el){
	replaceFlash(el);	
}


function replaceFlash(el) {
	var lnk;
	switch (el.k) {
		case 0: lnk = "web/Banner_video/225804.mp4"; el.w = 742; el.h= 92; break;
		case 1: lnk = "web/Banner_video/225821.mp4"; el.w = 995; el.h= 100; break;
		case 2: lnk = "web/Banner_video/226718.mp4"; el.w = 728; el.h= 90; break;
		case 3: lnk = "web/Banner_video/228217.mp4"; el.w = 250; el.h= 250; break;
		case 4: lnk = "web/Banner_video/228344.mp4"; el.w = 700; el.h= 100; break;
		case 5: lnk = "web/Banner_video/M4_800x90_Times_RU.mp4"; el.w = 800; el.h= 90; break;
		case 6: lnk = "web/Banner_video/Maxima_divas_nedelas_995x95_lv.mp4"; el.w = 995; el.h= 95; break;
		case 7: lnk = "web/Banner_video/Monald_Metals_728x90"; el.w = 728; el.h= 90; break;
		case 8: lnk = "web/Banner_video/Multikino_750x100_august_LV.mp4"; el.w = 750; el.h= 100; break;
		case 9: lnk = "web/Banner_video/NorvikBanka_20Y_750x180_LV5.mp4"; el.w = 750; el.h= 180; break;
		case 10: lnk = "web/Banner_video/NorvikBanka_Depozit_NY2014_750x180_LV2.mp4"; el.w = 750; el.h= 180; break;
		case 11: lnk = "web/Banner_video/NorvikBanka_NIPS_autumn_230x230_RU.mp4"; el.w = 230; el.h= 230; break;
		case 12: lnk = "web/Banner_video/NorvikBanka_NIPS_birds_750x180_LV.mp4"; el.w =750; el.h= 180; break;
		case 13: lnk = "web/Banner_video/NorvikBanka_MultiTrade_LV_750x180_NEW4.mp4"; el.w = 750; el.h= 180; break;
		case 14: lnk = "web/Banner_video/NorvikBanka_Davina_davanas_750x180_RU2_2.mp4"; el.w = 750; el.h= 180; break;
		case 15: lnk = "web/Banner_video/NorvikBanka_Depozit_Jubilej_750x180_LV3.mp4"; el.w = 750; el.h= 180; break;
		case 16: lnk = "web/Banner_video/NorvikBanka_Depozit_Lieldena_750x180_LV.mp4"; el.w = 750; el.h= 180; break;
		case 17: lnk = "web/Banner_video/NorvikTrade_electronic_trade_250x250_RU3.mp4"; el.w = 250; el.h= 250; break;
		
	}
	var player_field = document.getElementsByClassName("flash_field")[0];
	var player = document.getElementById("flash_player");
	if (el.w >= screenW-20) {
		var newWidth = screenW-38;
		var newHeight = el.h/el.w*newWidth;
		el.w = newWidth;
		el.h = newHeight;
	}
	player_field.style.width = el.w+20+"px";
	player_field.style.marginLeft = (screenW - (el.w+38))/2+"px";
	 var clone=player.cloneNode(true);
  clone.setAttribute('src',lnk);
  clone.setAttribute('width',el.w);
  clone.setAttribute('height',el.h);
  player.parentNode.replaceChild(clone, player);
  if (player_field.activated ==0){
	player_field.classList.remove("flash_away");
player.addEventListener("click", closePlayer);	
	player_field.activated = 1;
	}
}

function closePlayer(){
	var player = document.getElementById("flash_player");
	player.classList.add("flash_away");
	if (player_field.activated ==1){
	player.removeEventListener("click", closePlayer);
	player_field.activated = 0;
	}	
}

function shipHoverSet(el){
	if (el.activeElement ==0){
var flag = document.getElementsByClassName("flag")[el.k];
var shtok = document.getElementsByClassName("shtok")[el.k];
flag.classList.add("flag_up");
shtok.classList.add("shtok_up");
//el.hoveredElement=1;
}	
}

function shipUnHoverSet(el){
	if (el.activeElement ==0){
var flag = document.getElementsByClassName("flag")[el.k];
var shtok = document.getElementsByClassName("shtok")[el.k];
if (flag.getElementsByClassName("flag_up")[0] !== null) {
flag.classList.remove("flag_up");
}
if (shtok.getElementsByClassName("shtok_up")[0] !== null) {
shtok.classList.remove("shtok_up");
}
}
}

function shipClickSet(el){
	var ship = document.getElementsByClassName("ship")[el.k];
	shipArray.opened = 1;
	shipArray.positionTaken =0;
	var flag = document.getElementsByClassName("flag")[el.k];
	var shtok = document.getElementsByClassName("shtok")[el.k];
	var bouy = document.getElementsByClassName("bouy")[el.k];
	var bouy_reflect = document.getElementsByClassName("bouy_reflect")[el.k];
	if (flag.getElementsByClassName("flag_up")[0] !== null) {
		flag.classList.remove("flag_up");
	}
	if (shtok.getElementsByClassName("shtok_up")[0] !== null) {
		shtok.classList.remove("shtok_up");
	}
	clearInterval(shipWaveInterval);
	ship.style.height="";
	ship.style.width="";
	el.top= ship.offsetTop;
	ship.style.top="";
	ship.style.left="";
	ship.style.transform = "";
	ship.style.mozTransform = "";
	ship.style.webkitTransform = "";
	ship.style.msTransform = "";
	ship.style.oTransform = "";
	ship.style.zIndex="";
	ship.classList.add("ship_full");
	flag.classList.add("flag_full");
	shtok.classList.add("bouy_hide");
	bouy.classList.add("bouy_hide");
	bouy_reflect.classList.add("bouy_hide");
	var close = document.getElementsByClassName("close")[0];
	close.classList.remove("close_hidden");
	close.addEventListener("click", shipCloseWindow);
		el.activeElement = 1;
		el.hoveredElement = 1;
}

function shipCloseWindow(){
	for (var i=0; i<shipCount; i++){
	if ( shipArray[i].activeElement == 1){
		var ship = document.getElementsByClassName("ship")[i];
	var flag = document.getElementsByClassName("flag")[i];
var shtok = document.getElementsByClassName("shtok")[i];
var bouy = document.getElementsByClassName("bouy")[i];
var bouy_reflect = document.getElementsByClassName("bouy_reflect")[i];
ship.classList.remove("ship_full");
flag.classList.remove("flag_full");
shtok.classList.remove("bouy_hide");
bouy.classList.remove("bouy_hide");
bouy_reflect.classList.remove("bouy_hide");
var close = document.getElementsByClassName("close")[0];
close.classList.add("close_hidden");
close.removeEventListener("click", shipCloseWindow);
	ship.activeElement = 0;
	ship.hoveredElement = 0;
	ship.style.height = ship.initHeight+ "px";
ship.style.width = ship.initWidth+ "px";
ship.style.top = ship.currentY + "px";	
ship.style.top = ship.top+ "px";	
ship.style.left = ship.initX+shipArray[i].offsetWidth+ "px";
ship.style.zIndex = Math.round(ship.zDepth*100);
	}
	}
	shipArray.opened = 0;
	shipWaveInterval = setInterval(function(){shipWave();}, 20);
}

function hoverSet(el){
var elementFromArray = document.getElementsByClassName("bobble")[el.k];
elementFromArray.hoveredElement=1;
elementFromArray.classList.add("zoome_in");
elementFromArray.style.width = "";
elementFromArray.style.height = "";
elementFromArray.style.zIndex = "";	
}

function unHoverSet(el){
var elementFromArray = document.getElementsByClassName("bobble")[el.k];
elementFromArray.hoveredElement=0;
elementFromArray.classList.remove("zoome_in");
elementFromArray.style.width = clonedElement[el.k].initWidth +"px";
elementFromArray.style.height = clonedElement[el.k].initHeight+"px";
}

function clickSet(el){
	deactivateOtherElements(el);
var elementFromArray = document.getElementsByClassName("bobble")[el.k];
if (elementFromArray.activeElement==0){
elementFromArray.removeEventListener("mouseover", addMouseOver);
elementFromArray.removeEventListener("mouseleave", addMouseLeave);
elementFromArray.hoveredElement=1;
elementFromArray.activeElement=1;
elementFromArray.classList.remove("zoome_in");
elementFromArray.classList.add("centered");
getCurrentPosition(el);
elementFromArray.style.top = "";
elementFromArray.style.left = "";
elementFromArray.getElementsByClassName("bobble_contour")[0].style.display= "none";
elementFromArray.getElementsByClassName("bobble_glow")[0].style.display= "none";
}
else {deactivateElement(el);}
}

function deactivateElement(el){
		var element = document.getElementsByClassName("bobble")[el.k];
		if (element.activeElement==1){
element.classList.remove("centered");
element.style.height = element.initHeight +"px";
element.style.width = element.initWidth +"px";
element.style.top =element.currentY + "px";
element.style.left =element.initX + "px";
element.activeElement=0;
element.hoveredElement=0;
element.addEventListener("mouseover", addMouseOver);
element.addEventListener("mouseleave", addMouseLeave);	
element.getElementsByClassName("bobble_contour")[0].style.display= "";
element.getElementsByClassName("bobble_glow")[0].style.display= "";
}
}

function deactivateOtherElements(el){
for (var i=0; i<bobbleCount; i++){
	if (i != el.k){
var element = document.getElementsByClassName("bobble")[i];
if (element.activeElement==1){
deactivateElement(element);	
}
}	
}
}

function getCurrentPosition(el) {
var elementFromArray = document.getElementsByClassName("bobble")[el.k];	
elementFromArray.currentX = elementFromArray.offsetLeft;
elementFromArray.currentY = elementFromArray.offsetTop;
}


function move(){
relativeMoveUp(0.7);
wave(3, 1.5); 
}

function relativeMoveUp(speed){
	for (var i=0; i<bobbleCount; i++){
		var element = document.getElementsByClassName("bobble")[i];
		if (element.hoveredElement==0){
var currentY = element.offsetTop;
currentY-=speed*screenH/768*element.zDepth*3;
if (currentY < bobbleOffset+element.offsetHeight){
	element.classList.add("disapear");
}
if (currentY < bobbleOffset){
	currentY = bobbleOffset+screenH-element.offsetHeight;
var disapearence = element.getElementsByClassName("disapear")[0];
if (disapearence !==null) {
element.classList.remove("disapear");	
}
}
document.getElementsByClassName("bobble")[i].style.top = currentY +"px";
}
}
}

function wave(speed, amplitude){
	for (var i=0; i<bobbleCount; i++){
		var element = document.getElementsByClassName("bobble")[i];
		if (element.hoveredElement==0){
var currentX = element.offsetLeft;
currentX-=amplitude*screenW/1366*element.zDepth*Math.sin(speed*screenH/768/180*Math.PI*timer/element.zDepth+element.startAngle);
/*if (currentX < -element.offsetWidth/2){
	currentX = screenW-element.offsetWidth/2;
}
if (currentX > screenW-element.offsetWidth/2){
	currentX = -element.offsetWidth/2;
} */
document.getElementsByClassName("bobble")[i].style.left = currentX +"px";
}
}
}

function relativeMove(speed){
	for (var i=0; i<cloudCount; i++){
		var lmnt = document.getElementsByClassName("flash_cloud")[i];
		if (lmnt.hoveredElement==0){
var currentX = lmnt.offsetLeft;
currentX-=speed*screenW/1366*lmnt.zDepth;
if (currentX < -lmnt.offsetWidth){
	currentX = screenW+lmnt.offsetWidth;
}
lmnt.style.left = currentX +"px";
}
}
}


function prepareTexts(){
	intro = document.getElementsByClassName("intro")[0];
	flash_text = document.getElementsByClassName("flash_text")[0];
	web_text = document.getElementsByClassName("web_text")[0];
	print_text = document.getElementsByClassName("print_text")[0];
	splitToRows(intro);
	animationFromSides(intro);
	//splitToRowsFlash(flash_text);
	//splitToWords(web_text);
	//splitToWords(print_text);
}


function splitToCharacters(div){
div.sourceText = div.innerHTML;
div.sourceTextLength = div.sourceText.length;
div.innerHTML="";
for (var i=0; i< div.sourceTextLength; i++){
var span = document.createElement("span");
var sourceLetter = div.sourceText.charAt(i);
var letter = document.createTextNode(sourceLetter);
span.appendChild(letter);
div.appendChild(span);
}	
}

function splitToWords(div){
div.sourceText = div.innerHTML;
var wordArray = div.sourceText.split(" "); 
div.sourceTextLength = wordArray.length;
div.innerHTML="";
for (var i=0; i< div.sourceTextLength; i++){
var span = document.createElement("span");
var sourceWord = wordArray[i]+" ";
var word = document.createTextNode(sourceWord);
span.appendChild(word);
div.appendChild(span);
}	
}


function splitToRows(div){
	var j=0;
	var newLineStart = [];
	var lineArray = [];
div.sourceText = div.innerHTML;
var wordArray = div.sourceText.split(" "); 
div.sourceTextWordLength = wordArray.length;
div.innerHTML="";
for (var i=0; i< div.sourceTextWordLength; i++){
var span = document.createElement("span");
var sourceWord = wordArray[i]+" ";
var word = document.createTextNode(sourceWord);
span.appendChild(word);
div.appendChild(span);
}	
var currentRowOffsetTop = div.getElementsByTagName("span")[0].offsetTop;
newLineStart[-1] = 0;
for (var i=0; i< div.sourceTextWordLength; i++){
	var wordOffsetTop = div.getElementsByTagName("span")[i].offsetTop;
	if ( wordOffsetTop > currentRowOffsetTop ){
		newLineStart[j] = div.sourceText.search(wordArray[i]);
		lineArray[j] = div.sourceText.substring(newLineStart[j-1],newLineStart[j]);
		currentRowOffsetTop = div.getElementsByTagName("span")[i].offsetTop;
		j++;
	}
}
lineArray[j] = div.sourceText.substring(newLineStart[j-1],div.sourceText.length);
div.sourceTextLength = lineArray.length;
deleteSpans(div);
div.innerHTML="";
for (var j=0; j < div.sourceTextLength; j++){
var span = document.createElement("span");
var sourceLine = lineArray[j];
var words = document.createTextNode(sourceLine);
span.appendChild(words);
div.appendChild(span);
}				
}


function animationFrom(div, direction){
	div.positioned = 1;
	var spanArray = div.getElementsByTagName("SPAN");
	for (var i=0; i< div.sourceTextLength; i++){
		spanArray[i].direction = direction;
		spanArray[i].classList.add(direction);
	}
	
}

function animationFromSides(div){
	div.positioned = 1;
	var spanArray = div.getElementsByTagName("SPAN");
	for (var i=0; i< div.sourceTextLength; i++){
		if (i%2 == 0) {
		spanArray[i].direction = "right";
		spanArray[i].classList.add("right");
	} else {
		spanArray[i].direction = "left";
		spanArray[i].classList.add("left");
	}
	}
}

function runAnimation(div, speed){
	if (div.positioned == 1){
	div.counter =0;
	animationInterval = setInterval(function(){startAnimation(div)}, speed);
	}
}

function startAnimation(div){
	var spanArray = div.getElementsByTagName("SPAN");
	spanArray[div.counter].classList.remove(spanArray[div.counter].direction);
	div.counter ++;
	if (div.counter >= div.sourceTextLength){
		clearInterval(animationInterval);
		setTimeout(function(){deleteSpans(div)}, 1000);
		div.positioned =0;
	}
}

function deleteSpans(div){
	for (var i=0; i< div.sourceTextLength; i++){
	var span = div.getElementsByTagName("span")[0];
div.removeChild(span);
	}
	div.innerHTML = div.sourceText;	
}
var body =  document.getElementsByTagName("BODY")[0];
body.addEventListener("load", init());
window.addEventListener("resize", resizeWindow);