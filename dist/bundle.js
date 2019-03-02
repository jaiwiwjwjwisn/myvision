!function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=1)}([function(e,t){e.exports=fabric},function(e,t,n){"use strict";n.r(t);var o=n(0),r=n.n(o);function i(e){e.forEachObject(e=>{e.selectable=!0}),e.defaultCursor="default",e.hoverCursor="move"}function s(e,t){const n=document.getElementById("labelNamePopUp");n.style.display="block";const o=document.getElementById("canvas-wrapper").getBoundingClientRect(),r=o.top,i=o.left;n.style.top=`${t+r}px`,n.style.left=`${e+i}px`}function a(){document.getElementById("labelNamePopUp").style.display="none"}const l={};function c(e,t,n){const o=n.getPointer(t.e);return{radius:5,fill:"#ffffff",stroke:"#333333",strokeWidth:.5,left:o.x,top:o.y,selectable:!0,hasBorders:!1,hasControls:!1,originX:"center",originY:"center",id:e,objectCaching:!1}}l.newPolygon={stroke:"rgba(255,0,0)",strokeWidth:1.75,fill:"rgba(237, 237, 237, 0.01)",perPixelTargetFind:!0,hasBorders:!1,hasControls:!1,lockMovementY:!0,lockMovementX:!0,shapeName:"polygon",selectable:!0},l.newTempPolygon={stroke:"#333333",strokeWidth:.8,fill:"#cccccc",opacity:.3,selectable:!1,hasBorders:!1,hasControls:!1,evented:!1,objectCaching:!1},l.newFinalPolygon={perPixelTargetFind:!0,hasBorders:!1,hasControls:!1,lockMovementY:!0,lockMovementX:!0,shapeName:"polygon",selectable:!0},l.newLine={strokeWidth:1.1,fill:"#999999",stroke:"#999999",class:"line",originX:"center",originY:"center",selectable:!1,hasBorders:!1,hasControls:!1,evented:!1,objectCaching:!1},l.firstCircle={fill:"red"},l.newCircle=c;const u={inProgress:!1};let d=null,f=null;function h(e,t){d=e,f=t,u.inProgress=!0}function g(){f.remove(d),u.inProgress=!1}function m(){const e=document.getElementById("label-title").value;a();const t=new r.a.Text(e,function(e){return{fontSize:10,fill:"yellow",left:e.left,top:e.top,width:e.width,height:e.height}}(d));if("bndBoxTemp"===d.shapeName){const e=new r.a.Group([d,t],function(e){return{left:e.left,top:e.top,width:e.width,height:e.height,stroke:"rgba(255,0,0)",strokeWidth:2,fill:"rgba(255,0,0,0.1)",shapeName:"bndBox"}}(d));f.add(e)}else if("polygon"===d.shapeName){const e=new r.a.Group([d,t],l.newFinalPolygon);f.add(e)}g()}function p(e){e.discardActiveObject(),e.renderAll(),e.forEachObject(e=>{e.selectable=!1}),e.defaultCursor="crosshair",e.hoverCursor="crosshair"}let b=null,w=!1,y=!1;const v={};function x(){b.remove(b.getActiveObject())}function C(e){(b=e).backgroundImage&&(w=!0,p(b),b.discardActiveObject()),e.on("mouse:down",()=>{!function(){if(w){y=!0;const e=b.getPointer(b.e);v.origX=e.x,v.origY=e.y,v.rect=new r.a.Rect(function(e,t){return{left:e.origX,top:e.origY,width:t.x-e.origX,height:t.y-e.origY,stroke:"rgba(255,0,0)",strokeWidth:2,fill:"rgba(255,0,0,0)",shapeName:"bndBoxTemp"}}(v,e)),b.add(v.rect)}}()}),e.on("mouse:move",e=>{!function(e){if(!y)return;const t=b.getPointer(e.e);v.origX>t.x&&v.rect.set({left:Math.abs(t.x)}),v.origY>t.y&&v.rect.set({top:Math.abs(t.y)}),v.rect.set({width:Math.abs(v.origX-t.x)}),v.rect.set({height:Math.abs(v.origY-t.y)}),b.renderAll()}(e)}),e.on("mouse:up",e=>{!function(e){if(y){w=!1,y=!1,v.rect.setCoords(),v.rect.selectable=!1,i(b);const t=b.getPointer(e.e);h(v.rect,b),s(t.x,t.y)}}(e)})}const P=99,j=999999;let k=null,_=[],B=[],O=!0,A=null,L=!1;function M(){B.forEach(e=>{k.remove(e)}),k.remove(L).remove(A)}function W(){_[0]&&(_.forEach(e=>{k.remove(e)}),M(),_=[],B=[],L=null,A=null)}function E(e){e.target&&e.target.id&&e.target.id===_[0].id&&function(e){const t=[];_.forEach(e=>{t.push({x:e.left,y:e.top}),k.remove(e)}),M();const n=new r.a.Polygon(t,l.newPolygon);k.add(n),A=null,L=null,O=!1;const o=k.getPointer(e.e);h(n,k),s(o.x,o.y),i(k)}(e),O&&function(e){const t=Math.floor(Math.random()*(j-P+1))+P,n=(new Date).getTime()+t,o=k.getPointer(e.e),i=new r.a.Circle(l.newCircle(n,e,k));0===_.length&&i.set(l.firstCircle);let s=[o.x,o.y,o.x,o.y];const a=new r.a.Line(s,l.newLine);if(L){(s=L.get("points")).push({x:o.x,y:o.y});const e=new r.a.Polygon(s,l.newTempPolygon);k.remove(L),k.add(e),L=e,k.renderAll()}else{const e=[{x:o.x,y:o.y}],t=new r.a.Polygon(e,l.newTempPolygon);L=t,k.add(t)}A=a,_.push(i),B.push(a),k.add(a),k.add(i),k.selection=!1}(e)}function N(e){k=e,O=!0,W(),k.discardActiveObject(),p(k),e.on("mouse:down",e=>{E(e)}),e.on("mouse:move",e=>{!function(e){if(A&&"line"===A.class){const t=k.getPointer(e.e);A.set({x2:t.x,y2:t.y});const n=L.get("points");n[_.length]={x:t.x,y:t.y},L.set({points:n}),k.renderAll()}k.renderAll()}(e)}),e.on("mouse:over",t=>{t.target&&t.target.selectable?e.hoverCursor="move":e.hoverCursor="crosshair"})}function T(e){e.__eventListeners&&(e.__eventListeners["mouse:down"]=[],e.__eventListeners["mouse:over"]=[],e.__eventListeners["mouse:out"]=[],e.__eventListeners["mouse:move"]=[],e.__eventListeners["mouse:up"]=[])}let X=null,I=!1;function U(){T(X),C(X),I=!1}function Y(){T(X),N(X),I=!1}const $={uploaded:!1,name:null},H={};let R=null;function S(e,t){t?function(e,t){R.setWidth(t.width),R.setHeight(t.height),r.a.Image.fromURL(e.src,e=>{R.setBackgroundImage(e,R.renderAll.bind(R),{scaleX:R.width/e.width,scaleY:R.height/e.height})})}(e,t):function(e){R.setWidth(e.width),R.setHeight(e.height),R.setBackgroundColor({source:e.src},()=>{R.renderAll()})}(e)}function F(e){const t={},n=H.maximumCanvasWidth/e.width;return t.width=H.maximumCanvasWidth,t.height=e.height*n,t}function z(){$.uploaded=!0;const e=this;if(H.maximumCanvasHeight<e.height){let t=function(e){const t={},n=H.maximumCanvasHeight/e.height;return t.height=H.maximumCanvasHeight,t.width=e.width*n,t}(e);H.maximumCanvasWidth<t.width&&(t=F(t)),S(e,t)}else if(H.maximumCanvasWidth<e.width){S(e,F(e))}else S(e)}function D(e){const t=new Image;t.src=e.target.result,t.onload=z}function G(e){R=e,H.maximumCanvasHeight=window.innerHeight-54,H.maximumCanvasWidth=window.innerWidth-110}function q(e){return function e(t){let n="";return Object.keys(t).forEach(o=>{"object"==typeof t[o]?n+=`<${o}>${e(t[o])}</${o}>`:n+=`<${o}>${t[o]}</${o}>`}),n}(e)}let J=null;function K(e){const t=document.createElement("a"),n=new Blob([e],{type:"text/plain"});return t.setAttribute("href",window.URL.createObjectURL(n)),t.setAttribute("download",`${new RegExp("^([^.]+)").exec($.name)[0]}.xml`),t.dataset.downloadurl=["text/plain",t.download,t.href].join(":"),t.draggable=!0,t.classList.add("dragout"),t}function Q(){if(J.backgroundImage){!function(e){K(e).click()}(q(function(e,t){const n={};return n.annotations=function(e,t){return{folder:"Unknown",filename:t.name,path:"Unknown",source:{database:"Unknown"},size:{width:e.getWidth(),height:e.getHeight(),depth:1},segmented:0}}(e,t),n.annotations.object=function(e){let t={};return e.forEachObject(e=>{const n=e._objects[0],o=e._objects[1].text;t={name:o,pose:"Unspecified",truncated:1,difficult:0,bndbox:{xmin:n.left,ymin:n.top,xmax:n.left+n.width,ymax:n.top+n.height}}}),t}(e),n}(J,$)))}}function V(){var e;m(),I||(T(X),i(X),(e=X).on("mouse:over",t=>{t.target&&t.target._objects&&(t.target._objects[0].set("fill","rgba(255,0,0,0.2)"),e.renderAll())}),e.on("mouse:out",t=>{t.target&&t.target._objects&&("bndBox"===t.target.shapeName?t.target._objects[0].set("fill","rgba(255,0,0,0"):"polygon"===t.target.shapeName&&t.target._objects[0].set("fill","rgba(255,0,0,0.01)"),e.renderAll())}),I=!0)}function Z(){W(),u.inProgress&&(a(),g(),u.inProgress=!1)}function ee(e){Z(),e()}function te(e){Z(),function(e){if(e.files&&e.files[0]){const t=new FileReader;$.name=e.files[0].name,t.onload=D,t.readAsDataURL(e.files[0])}}(e)}!function(){const e=new r.a.Canvas("c",{selection:!1});r.a.Object.prototype.transparentCorners=!1,X=e,G(e),function(e){J=e}(e)}(),function(){window.createNewBndBox=ee.bind(this,U),window.createNewPolygon=ee.bind(this,Y),window.removeBndBox=ee.bind(this,x),window.downloadXML=ee.bind(this,Q),window.uploadImage=te,window.labelShape=V}()}]);