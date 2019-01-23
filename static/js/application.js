$(document).ready(function () {
    //connect to the socket server.
    var socket = io.connect('http://' + document.domain + ':' + location.port + '/test');
    var comments_received = [];
    var sentiment = { 'politics': { 'POSITIVE': 0, 'NEUTRAL': 0, 'NEGATIVE': 0, 'MIXED': 0 }, 'funny': { 'POSITIVE': 0, 'NEUTRAL': 0, 'NEGATIVE': 0, 'MIXED': 0 }, 'askreddit': { 'POSITIVE': 0, 'NEUTRAL': 0, 'NEGATIVE': 0, 'MIXED': 0 }, 'todayilearned': { 'POSITIVE': 0, 'NEUTRAL': 0, 'NEGATIVE': 0, 'MIXED': 0 }, 'science': { 'POSITIVE': 0, 'NEUTRAL': 0, 'NEGATIVE': 0, 'MIXED': 0 }, 'worldnews': { 'POSITIVE': 0, 'NEUTRAL': 0, 'NEGATIVE': 0, 'MIXED': 0 }, 'pics': { 'POSITIVE': 0, 'NEUTRAL': 0, 'NEGATIVE': 0, 'MIXED': 0 }, 'iama': { 'POSITIVE': 0, 'NEUTRAL': 0, 'NEGATIVE': 0, 'MIXED': 0 }, 'gaming': { 'POSITIVE': 0, 'NEUTRAL': 0, 'NEGATIVE': 0, 'MIXED': 0 }, 'videos': { 'POSITIVE': 0, 'NEUTRAL': 0, 'NEGATIVE': 0, 'MIXED': 0 }, 'movies': { 'POSITIVE': 0, 'NEUTRAL': 0, 'NEGATIVE': 0, 'MIXED': 0 }, 'aww': { 'POSITIVE': 0, 'NEUTRAL': 0, 'NEGATIVE': 0, 'MIXED': 0 }, 'nfl': { 'POSITIVE': 0, 'NEUTRAL': 0, 'NEGATIVE': 0, 'MIXED': 0 }, 'the_donald': { 'POSITIVE': 0, 'NEUTRAL': 0, 'NEGATIVE': 0, 'MIXED': 0 }, 'gifs': { 'POSITIVE': 0, 'NEUTRAL': 0, 'NEGATIVE': 0, 'MIXED': 0 }, 'news': { 'POSITIVE': 0, 'NEUTRAL': 0, 'NEGATIVE': 0, 'MIXED': 0 }, 'explainlikeimfive': { 'POSITIVE': 0, 'NEUTRAL': 0, 'NEGATIVE': 0, 'MIXED': 0 }, 'relationships': { 'POSITIVE': 0, 'NEUTRAL': 0, 'NEGATIVE': 0, 'MIXED': 0 }, 'showerthoughts': { 'POSITIVE': 0, 'NEUTRAL': 0, 'NEGATIVE': 0, 'MIXED': 0 }, 'soccer': { 'POSITIVE': 0, 'NEUTRAL': 0, 'NEGATIVE': 0, 'MIXED': 0 } };

    populate_data_arrays(sentiment);

    //receive details from server
    socket.on('newcomment', function (msg) {
        console.log("Received sentiment", msg);
        sentiment[msg.subreddit][msg.sentiment]++;
        // $('#log').html(JSON.stringify(sentiment, null, 4));
        populate_data_arrays(sentiment);
    });
});

function populate_data_arrays(sentiment) {
    var x_axis = Object.keys(sentiment);

    var positive_arr = [];
    var neutral_arr = [];
    var negative_arr = [];
    var mixed_arr = [];

    for(const key of x_axis) {
        positive_arr.push(sentiment[key]['POSITIVE']);
        neutral_arr.push(sentiment[key]['NEUTRAL']);
        negative_arr.push(sentiment[key]['NEGATIVE']);
        mixed_arr.push(sentiment[key]['MIXED']);
    }

    graph_sentiment(x_axis, positive_arr, neutral_arr, negative_arr, mixed_arr);
}

function graph_sentiment(x_axis, positive_arr, neutral_arr, negative_arr, mixed_arr) {
    var positive = {
        x: x_axis,
        y: positive_arr,
        name: 'Positive Sentiment',
        type: 'bar'
    };

    var neutral = {
        x: x_axis,
        y: neutral_arr,
        name: 'Neutral Sentiment',
        type: 'bar'
    };

    var negative = {
        x: x_axis,
        y: negative_arr,
        name: 'Negative Sentiment',
        type: 'bar'
    };

    var mixed = {
        x: x_axis,
        y: mixed_arr,
        name: 'Mixed Sentiment',
        type: 'bar'
    };

    var data = [positive, neutral, negative, mixed];

    var layout = { barmode: 'stack' };

    Plotly.newPlot('chartDiv', data, layout);
}