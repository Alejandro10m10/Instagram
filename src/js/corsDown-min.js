"use strict";class cDg{constructor(e){this.id=e}view(){var e=document.querySelectorAll(".instagramPicture");for(let l of e){const e=l.src.split("/");var t="";for(let l=0;l<e.length;l++)2==l?t+=e[l].replaceAll("-","--").replaceAll(".","-")+atob("LnRyYW5zbGF0ZS5nb29n")+"/":l!=e.length-1?t+=e[l]+"/":t+=e[l];l.src=encodeURI(t)}}}