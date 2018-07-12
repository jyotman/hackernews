'use strict';

const hackernews = require('../service/hackernews');

exports.search = async (req, res, next) => {
    try {
        const topStoryIds = await hackernews.getTopStoryIds();
        const batchSize = 10;
        let batches = [];
        for (let i = 0; i < topStoryIds.length; i += batchSize) {
            batches.push(topStoryIds.slice(i, i + batchSize));
        }
        const stories = await executeBatches(batches);
        res.send(stories);
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
    console.log('Stories Fetched', (index + 1) * 10);
    return executeBatches(batches, index + 1, result.concat(jobsResult));
}

function createJobs(batch) {
    return batch.map(storyId => hackernews.getStoryById(storyId));
}