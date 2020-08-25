"use strict";

export class Bouy{

	constructor(div){
	this.amp = 10+Math.round(Math.random(28));
	this.animSpeed = 2+Math.round(Math.random(4));	
	this.timer = -Math.round(Math.random(162));
	this.blackColor = "rgb(0,0,0)";
	this.whiteColor = "rgb(255,255,255)";
	this.redColor = "rgb(247,24,18)";
	this.redLight = "rgb(255,168,160)";
	this.yellowLight = "rgb(255,255,70)";
	this.div= div;
	this.okDiv = document.getElementById("ok");
	this._createBouy();
	}
	
	_createBouy(){
	const svgNode = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
	svgNode.setAttributeNS(null, 'viewBox', '0 0 162 156');
	this.div.appendChild(svgNode);

	const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
	

	const linearGradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
	linearGradient.setAttributeNS(null, 'id', 'bouyColor');
	linearGradient.setAttributeNS(null, 'x1', '0%');
	linearGradient.setAttributeNS(null, 'y1', '0%');
	linearGradient.setAttributeNS(null, 'x2', '0%');
	linearGradient.setAttributeNS(null, 'y2', '100%');

	const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
	stop1.setAttributeNS(null, 'offset', '0%');
	stop1.setAttributeNS(null, 'style', 'stop-color:rgb(255,245,0);stop-opacity:1');

	const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
	stop2.setAttributeNS(null, 'offset', '45%');
	stop2.setAttributeNS(null, 'style', 'stop-color:rgb(250,240,0);stop-opacity:1');

	const stop3 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
	stop3.setAttributeNS(null, 'offset', '80%');
	stop3.setAttributeNS(null, 'style', 'stop-color:rgb(150,170,40);stop-opacity:1');

	const stop4 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
	stop4.setAttributeNS(null, 'offset', '100%');
	stop4.setAttributeNS(null, 'style', 'stop-color:rgb(80,80,90);stop-opacity:1');

	linearGradient.appendChild(stop1);
	linearGradient.appendChild(stop2);
	linearGradient.appendChild(stop3);
	linearGradient.appendChild(stop4);
	defs.appendChild(linearGradient);
	
	const clip = document.createElementNS('http://www.w3.org/2000/svg', 'clipPath');
	clip.setAttributeNS(null, 'id', 'clipping');
	this.clipPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
	this.clipString = 'M0 0 H324 V120 C270 '+ (120+this.amp)+' 216 '+(120-this.amp)+ ' 162 120  C108 '+ (120+this.amp)+ ' 54 ' +(120-this.amp)+ ' 0 120 Z';
	this.clipPath.setAttributeNS(null, 'd', this.clipString);
	this.clipPath.setAttributeNS(null, 'fill', this.whiteColor);
	this.clipPath.setAttributeNS(null, 'transform', "translate(0)");
	clip.appendChild(this.clipPath);
	defs.appendChild(clip);
	
	svgNode.appendChild(defs);

	this.bouyPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
	this.bouyPath.setAttributeNS(null, 'id', "bouyShape");
	this.bouyString = 'M61 21 L101 21 L153 76 C162 85, 162 95,162 113 C162 113, 162 136, 152 136 C81 136 81 136 10 136 C0 136, 0 120, 0 113 C0 130, 0 120 0 113 C0 90, 0 87 9 76 Z';
	this.bouyPath.setAttributeNS(null, 'd', this.bouyString);
	this.bouyPath.setAttributeNS(null, 'fill', 'url(#bouyColor)');
	this.bouyPath.setAttributeNS(null, 'clip-path', 'url(#clipping)');
	svgNode.appendChild(this.bouyPath);

	const bouyTopPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
	bouyTopPath.setAttributeNS(null, 'd', 'M81 0 L 61 21 L 101 21 Z');
	bouyTopPath.setAttributeNS(null, 'fill', this.redColor);
	svgNode.appendChild(bouyTopPath);

	const bouyTopGlossPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
	bouyTopGlossPath.setAttributeNS(null, 'd', 'M81 0 L 78 21 L 84 21 Z');
	bouyTopGlossPath.setAttributeNS(null, 'fill', this.redLight);
	svgNode.appendChild(bouyTopGlossPath);

	const bouyGlossPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
	bouyGlossPath.setAttributeNS(null, 'd', 'M78 21 L 84 21 L 87 85 L 75 85 Z');
	bouyGlossPath.setAttributeNS(null, 'fill', this.yellowLight);
	svgNode.appendChild(bouyGlossPath);
	}
	
	wave(){
		if (this.timer<= -162){
		this.timer = 0};
		this.timer -= Math.round(this.animSpeed);
		//this.amp = 55+this.timer/10;
		//var amp =  Math.round(this.amp*Math.sin(Math.PI/180*this.timer*this.animSpeed));
		//this.pathString = 'M61 21 L101 21 L153 76 C162 85, 162 95,162 113 C162 113, 162 136,152 136 C81 '+ (136 + this.amp)+ ' 81 '+ (136 - this.amp)+' 10 136 C0 136, 0 120, 0 113 C0 130, 0 120 0 113 C0 90, 0 87 9 76 Z';
		//this.clipPath.setAttributeNS(null, 'd', this.pathString);
		//this.bouyPath.setAttributeNS(null, 'd', this.bouyString);
		//this.okDiv.innerHTML =this.boyString;
		this.translateString = "translate("+ this.timer + ")";
		this.clipPath.setAttributeNS(null, 'transform', this.translateString);
		window.requestAnimationFrame(this.wave.bind(this));
		//setInterval (this.wave.bind(this), 20);
	} 
}

