'use strict';

const request = require('request');

const BASE_API = 'https://hacker-news.firebaseio.com/v0';

exports.getTopStoryIds = () => {
    return fetch('topstories.json')
}

exports.getStoryById = (storyId) => {
    return fetch(`item/${storyId}.json`);
}

function fetch(path) {
    const URL = `${BASE_API}/${path}`;
    return new Promise((resolve, reject) => {
        request(URL, { json: true }, (err, resp, body) => {
            if (err !== null)
                reject(err);
            else if (resp.statusCode >= 300)
                reject(body);
            else
                resolve(body);
        });
    })
}