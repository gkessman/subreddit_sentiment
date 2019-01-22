$(document).ready(function () {
    //connect to the socket server.
    var socket = io.connect('http://' + document.domain + ':' + location.port + '/test');
    var comments_received = [];
    var sentiment = { 'politics': { 'POSITIVE': 0, 'NEUTRAL': 0, 'NEGATIVE': 0, 'MIXED': 0 }, 'funny': { 'POSITIVE': 0, 'NEUTRAL': 0, 'NEGATIVE': 0, 'MIXED': 0 }, 'askreddit': { 'POSITIVE': 0, 'NEUTRAL': 0, 'NEGATIVE': 0, 'MIXED': 0 }, 'todayilearned': { 'POSITIVE': 0, 'NEUTRAL': 0, 'NEGATIVE': 0, 'MIXED': 0 }, 'science': { 'POSITIVE': 0, 'NEUTRAL': 0, 'NEGATIVE': 0, 'MIXED': 0 }, 'worldnews': { 'POSITIVE': 0, 'NEUTRAL': 0, 'NEGATIVE': 0, 'MIXED': 0 }, 'pics': { 'POSITIVE': 0, 'NEUTRAL': 0, 'NEGATIVE': 0, 'MIXED': 0 }, 'iama': { 'POSITIVE': 0, 'NEUTRAL': 0, 'NEGATIVE': 0, 'MIXED': 0 }, 'gaming': { 'POSITIVE': 0, 'NEUTRAL': 0, 'NEGATIVE': 0, 'MIXED': 0 }, 'videos': { 'POSITIVE': 0, 'NEUTRAL': 0, 'NEGATIVE': 0, 'MIXED': 0 }, 'movies': { 'POSITIVE': 0, 'NEUTRAL': 0, 'NEGATIVE': 0, 'MIXED': 0 }, 'aww': { 'POSITIVE': 0, 'NEUTRAL': 0, 'NEGATIVE': 0, 'MIXED': 0 }, 'nfl': { 'POSITIVE': 0, 'NEUTRAL': 0, 'NEGATIVE': 0, 'MIXED': 0 }, 'the_donald': { 'POSITIVE': 0, 'NEUTRAL': 0, 'NEGATIVE': 0, 'MIXED': 0 }, 'gifs': { 'POSITIVE': 0, 'NEUTRAL': 0, 'NEGATIVE': 0, 'MIXED': 0 }, 'news': { 'POSITIVE': 0, 'NEUTRAL': 0, 'NEGATIVE': 0, 'MIXED': 0 }, 'explainlikeimfive': { 'POSITIVE': 0, 'NEUTRAL': 0, 'NEGATIVE': 0, 'MIXED': 0 }, 'relationships': { 'POSITIVE': 0, 'NEUTRAL': 0, 'NEGATIVE': 0, 'MIXED': 0 }, 'showerthoughts': { 'POSITIVE': 0, 'NEUTRAL': 0, 'NEGATIVE': 0, 'MIXED': 0 }, 'soccer': { 'POSITIVE': 0, 'NEUTRAL': 0, 'NEGATIVE': 0, 'MIXED': 0 } };

    //receive details from server
    socket.on('newcomment', function (msg) {
        console.log("Received sentiment", msg);
        sentiment[msg.subreddit][msg.sentiment]++;
        $('#log').html(JSON.stringify(sentiment, null, 4));
    });
});