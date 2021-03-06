#!/usr/local/bin/python3

from __future__ import print_function
from flask_socketio import SocketIO, emit
from flask import Flask, render_template
from threading import Thread, Event
import praw
import json
import boto3


__author__ = 'gkessman'

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
app.config['DEBUG'] = False

# Turn the flask app into a socketio app
socketio = SocketIO(app)

# Sentiment Thread
thread = Thread()
thread_stop_event = Event()

class SubredditSentiment(Thread):
    def __init__(self):
        super(SubredditSentiment, self).__init__()

        self.sub_list = ['askreddit', 'politics', 'nba', 'soccer', 'fortnitebr', 'worldnews',
                        'the_donald', 'funny', 'news', 'gaming', 'pics', 'squaredcircle',
                        'hockey', 'leagueoflegends', 'todayilearned', 'movies', 'nfl',
                        'showerthoughts', 'videos', 'gifs']
        self.sentiment_init = {'POSITIVE': 0, 'NEUTRAL': 0, 'NEGATIVE': 0, 'MIXED': 0}
        self.sentiment = {}
        self.bot_master = praw.Reddit('bot1')
        self.comprehend = boto3.client(service_name='comprehend', region_name='us-east-1')

        self.init_populate()

    def init_populate(self):
        for name in self.sub_list:
            self.sentiment[name] = self.sentiment_init.copy()

    def run(self):
        subreddit_list = self.bot_master.subreddit('+'.join(self.sub_list))
        for comment in subreddit_list.stream.comments():
            if thread_stop_event.isSet():
                break
            post = self.bot_master.submission(id=comment.submission)
            # print('')
            # print('Subreddit: {}'.format(post.subreddit))
            # print('Comment: {}'.format(comment.body))

            sentiment = self.comprehend.detect_sentiment(Text=comment.body, LanguageCode='en')['Sentiment']

            # print('Sentiment: {}'.format(sentiment))
            # print('-'*10)

            self.sentiment[str(post.subreddit).lower()][str(sentiment)] += 1

            socketio.emit('newcomment', {'subreddit': str(post.subreddit).lower(), 'comment': str(comment.body), 'sentiment': str(sentiment)}, namespace='/test')

@app.route('/')
def index():
    #only by sending this page first will the client be connected to the socketio instance
    return render_template('index.html')

@socketio.on('connect', namespace='/test')
def test_connect():
    # Need visibility on the global thread object
    global thread
    print('Client connected')
    # Start the sentiment analysis stream
    if not thread.isAlive():
        print('Starting Thread')
        thread = SubredditSentiment()
        thread_stop_event.clear()
        thread.start()

@socketio.on('disconnect', namespace='/test')
def test_disconnect():
    print('Client disconnected:')
    thread_stop_event.set()

if __name__ == "__main__":
    socketio.run(app)
