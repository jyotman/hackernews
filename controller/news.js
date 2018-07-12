'use strict';

const hackernews = require('../service/hackernews'),
    debug = require('debug')('hackernews');

const BATCH_SIZE = 50;

exports.search = async (req, res, next) => {
    try {
        const topStoryIds = await hackernews.getTopStoryIds();
        let batches = [];
        for (let i = 0; i < topStoryIds.length; i += BATCH_SIZE) {
            batches.push(topStoryIds.slice(i, i + BATCH_SIZE));
        }
        const stories = await executeBatches(batches);
        const searchKeyword = req.query.query !== undefined ? req.query.query.toLowerCase() : '';
        const validStories = stories
            .filter(story => story.title.toLowerCase().includes(searchKeyword))
            .map(createShortStory);
        debug('TOTAL STORIES', stories.length);
        debug('VALID STORIES', validStories.length);
        res.send(validStories);
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
}

async function executeBatches(batches, index = 0, result = []) {
    if (index === batches.length)
        return result;
    const jobs = createJobs(batches[index])
    const jobsResult = await Promise.all(jobs);
    debug('Stories Fetched', (index + 1) * BATCH_SIZE);
    return executeBatches(batches, index + 1, result.concat(jobsResult));
}

function createJobs(batch) {
    return batch.map(storyId => hackernews.getStoryById(storyId));
}

function createShortStory(story) {
    return {
        title: story.title,
        time: story.time,
        type: story.type,
        score: story.score,
        url: story.url
    }
}