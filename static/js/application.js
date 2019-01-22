$(document).ready(function(){
    console.log('what?');
    //connect to the socket server.
    var socket = io.connect('http://' + document.domain + ':' + location.port + '/test');
    var comments_received = [];

    //receive details from server
    socket.on('newcomment', function(msg) {
        console.log("Received comment" + msg.comment);
        //maintain a list of ten numbers
        if (comments_received.length >= 10){
            comments_received.shift();
        }            
        comments_received.push(msg.comment);
        comment_string = '';
        for (var i = 0; i < comments_received.length; i++){
            comment_string = comment_string + '<p>' + comments_received[i].toString() + '</p>';
        }
        $('#log').html(comment_string);
    });

});