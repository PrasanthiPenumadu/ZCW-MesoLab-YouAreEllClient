
export default class MessageService {
    getAllMessages() {
        const request = new XMLHttpRequest();
       return new Promise(function (resolve, reject){
        request.onload = function() {
            if (request.status >= 200 && request.status < 300) {
                const threads = JSON.parse(request.responseText);
                //console.log(JSON.parse(request.responseText));
                resolve(threads);
            } else {
                reject({
                    status: request.status,
                    statusText: request.statusText
                    //console.log('Error: ' + request.status); // An error occurred during the request.
                });
            }
        };
        request.open("GET", "http://zipcode.rocks:8085/messages");

        request.send();
    });
    }
    createNewMessage(message){
        const request=new XMLHttpRequest();
        return new Promise(function (resolve, reject) {
            request.onload=function () {
                if(request.status>=200&&request.status<300){
                    resolve(JSON.parse(request.responseText));
                }else{
                    reject({
                        status: request.status,
                        statusText: request.statusText
                    });
                }
            };
            request.open("POST",`http://zipcode.rocks:8085/ids/${message.fromid}/messages`);
            request.send(JSON.stringify(message));
        });
    }
}