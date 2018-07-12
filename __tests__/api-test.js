'use strict';

const superTest = require('supertest');
const app = require('../index').app;

jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;

describe('search', () => {
    test('without query', async () => {
        const result = await superTest(app).get('/searchnews');
        expect(result.body.length).toBeGreaterThan(0);
        result.body.forEach(story => {
            expect(story.title).toBeDefined();
            expect(story.type).toBeDefined();
            expect(story.time).toBeDefined();
            expect(story.score).toBeDefined();
        })
    });

    test('with query', async () => {
        const result = await superTest(app).get('/searchnews?query=google');
        expect(result.body.length).toBeGreaterThan(0);
        result.body.forEach(story => {
            expect(story.title.toLowerCase()).toContain('google');
            expect(story.type).toBeDefined();
            expect(story.time).toBeDefined();
            expect(story.score).toBeDefined();
        })
    });
});