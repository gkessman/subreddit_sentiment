$(document).ready(function () {
    //connect to the socket server.
    var socket = io.connect('http://' + document.domain + ':' + location.port + '/test');
    var comments_received = [];
    var sentiment = { 'politics': { 'POSITIVE': 0, 'NEUTRAL': 0, 'NEGATIVE': 0, 'MIXED': 0 }, 'funny': { 'POSITIVE': 0, 'NEUTRAL': 0, 'NEGATIVE': 0, 'MIXED': 0 }, 'askreddit': { 'POSITIVE': 0, 'NEUTRAL': 0, 'NEGATIVE': 0, 'MIXED': 0 }, 'todayilearned': { 'POSITIVE': 0, 'NEUTRAL': 0, 'NEGATIVE': 0, 'MIXED': 0 }, 'science': { 'POSITIVE': 0, 'NEUTRAL': 0, 'NEGATIVE': 0, 'MIXED': 0 }, 'worldnews': { 'POSITIVE': 0, 'NEUTRAL': 0, 'NEGATIVE': 0, 'MIXED': 0 }, 'pics': { 'POSITIVE': 0, 'NEUTRAL': 0, 'NEGATIVE': 0, 'MIXED': 0 }, 'iama': { 'POSITIVE': 0, 'NEUTRAL': 0, 'NEGATIVE': 0, 'MIXED': 0 }, 'gaming': { 'POSITIVE': 0, 'NEUTRAL': 0, 'NEGATIVE': 0, 'MIXED': 0 }, 'videos': { 'POSITIVE': 0, 'NEUTRAL': 0, 'NEGATIVE': 0, 'MIXED': 0 }, 'movies': { 'POSITIVE': 0, 'NEUTRAL': 0, 'NEGATIVE': 0, 'MIXED': 0 }, 'aww': { 'POSITIVE': 0, 'NEUTRAL': 0, 'NEGATIVE': 0, 'MIXED': 0 }, 'nfl': { 'POSITIVE': 0, 'NEUTRAL': 0, 'NEGATIVE': 0, 'MIXED': 0 }, 'the_donald': { 'POSITIVE': 0, 'NEUTRAL': 0, 'NEGATIVE': 0, 'MIXED': 0 }, 'gifs': { 'POSITIVE': 0, 'NEUTRAL': 0, 'NEGATIVE': 0, 'MIXED': 0 }, 'news': { 'POSITIVE': 0, 'NEUTRAL': 0, 'NEGATIVE': 0, 'MIXED': 0 }, 'explainlikeimfive': { 'POSITIVE': 0, 'NEUTRAL': 0, 'NEGATIVE': 0, 'MIXED': 0 }, 'relationships': { 'POSITIVE': 0, 'NEUTRAL': 0, 'NEGATIVE': 0, 'MIXED': 0 }, 'showerthoughts': { 'POSITIVE': 0, 'NEUTRAL': 0, 'NEGATIVE': 0, 'MIXED': 0 }, 'soccer': { 'POSITIVE': 0, 'NEUTRAL': 0, 'NEGATIVE': 0, 'MIXED': 0 } };

    var x_axis = Object.keys(sentiment);

    full_data = load_data(x_axis, sentiment);

    var positive = {
        x: x_axis,
        y: full_data[0],
        name: 'Positive Sentiment',
        type: 'bar',
        marker: {
            color: 'rgb(58, 145, 31)'
        }
    };

    var neutral = {
        x: x_axis,
        y: full_data[1],
        name: 'Neutral Sentiment',
        type: 'bar',
        marker: {
            color: 'rgb(255, 187, 0)'
        }
    };

    var negative = {
        x: x_axis,
        y: full_data[2],
        name: 'Negative Sentiment',
        type: 'bar',
        marker: {
            color: 'rgb(242, 67, 67)'
        }
    };

    var mixed = {
        x: x_axis,
        y: full_data[3],
        name: 'Mixed Sentiment',
        type: 'bar',
        marker: {
            color: 'rgb(132, 91, 163)'
        }
    };

    var data = [positive, neutral, negative, mixed];

    var layout = { barmode: 'stack' };

    Plotly.newPlot('chartDiv', data, layout);

    //receive details from server
    socket.on('newcomment', function (msg) {
        sentiment[msg.subreddit][msg.sentiment]++;
        var full_data = load_data(x_axis, sentiment);
        positive.y = full_data[0];
        neutral.y = full_data[1];
        negative.y = full_data[2];
        mixed.y = full_data[3];
        Plotly.redraw('chartDiv');
    });
});

function load_data(x_axis, sentiment) {
    var full_data = [[],[],[],[]];
    for(const key of x_axis) {
        full_data[0].push(sentiment[key]['POSITIVE']);
        full_data[1].push(sentiment[key]['NEUTRAL']);
        full_data[2].push(sentiment[key]['NEGATIVE']);
        full_data[3].push(sentiment[key]['MIXED']);
    }

    return full_data;
}