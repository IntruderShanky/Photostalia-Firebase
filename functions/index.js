let functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.sendNotifiaction = functions.https.onRequest((request, response) => {
    let token = request.body.token;
    let type = request.body.type;
    let data = request.body.data;
    let title = "New notification";
    let sender_name = data["sender_name"];
    let message = "";
    if (type === "album_shared") {
        title = "New album shared";
        message = sender_name + " shared an album with you.";
    }
    if (type === "like") {
        title = "Your album has new like";
        message = sender_name + " like your album.";
    }
    if (type === "new_album") {
        title = "New Album for you";
        message = sender_name + " uploaded a new album.";
    }

    let payload = {
        notification: {
            "title": "" + title,
            "body": message
        },
        data: data
    };

    admin.messaging().sendToDevice(token, payload)
        .then(res => {
            response.send(res);
        })
        .catch(error => {
            response.send(error);
        });
});