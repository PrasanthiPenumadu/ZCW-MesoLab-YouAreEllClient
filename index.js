import MessageService from "./message-service.js";

let userId = "PrasanthiPenumadu";
const messageService = new MessageService();

window.addEventListener("load", function () {

    document.getElementById("greeting").innerHTML = `Welcome ${userId}!`;
    messageService.getAllMessages().then(successCallback,errorCallback);
        function  successCallback(response){
            populateMessages(response);
            //console.log(response);
        }
        function errorCallback(response){
            console.log(response);
        }
createFormListener();
});
function populateMessages(messages) {
    messages.forEach(message => {
        addMessageToThread(message);
    });
}
function createFormListener() {
    const form=document.getElementById("new-message-form");
    form.onsubmit=function (event) {
        event.preventDefault();
        const data={
            fromid: userId,
            message:form.message.value
        };
        messageService.createNewMessage(data).then(successCallback,errorCallback);
        function successCallback(response){
            addMessageToThread(response);
        }
        function errorCallback(response) {
            console.log(response);
        }
    }
};
function addMessageToThread(message) {
    const messageListItem = document.createElement("LI");
    const userIdHeading = document.createElement("h3");
    const messageParagraph = document.createElement("p");
    const messageContent = document.createTextNode(message.message);
    const userIdContent = document.createTextNode(message.fromid);
    userIdHeading.appendChild(userIdContent);
    messageParagraph.appendChild(messageContent);
    messageListItem.appendChild(userIdHeading);
    messageListItem.appendChild(messageParagraph);
    document.getElementById("message-list").appendChild(messageListItem);
}