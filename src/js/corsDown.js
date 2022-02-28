/* 
    Instagram does not return the image of the media, so Instagram returns the mistake: ERR_BLOCKED_BY_RESPONSE 
    
    Using the Google translation vulnerability, it can display any image URL, with or without permission. 
    All these processes are done by the visitor's IP and computer.

    With the following code we can avoid instagram´s CORS policy and show the photos of a certain profile

*/
"use strict";
class cDg {
    constructor(id) {
        this.id = id;
    }
    view() {
        var pictures = document.querySelectorAll('.instagramPicture');

        for(let picture of pictures){
            let pictueUrl = picture.src;
            const p = pictueUrl.split("/");
            var t = '';
            for (let i = 0; i < p.length; i++) {
                if(i==2){
                    t += p[i].replaceAll('-', '--').replaceAll('.','-')+atob('LnRyYW5zbGF0ZS5nb29n')+'/';
                } else { if(i != p.length-1){ t += p[i]+'/'; } else { t += p[i]; } }
            }
            picture.src = encodeURI(t);
        }
    }
}