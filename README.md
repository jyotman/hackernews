# Hackernews API
Express.js server connecting to Hackernews APIs

## API 
Request

    GET /searchnews?query={something}

`query` param is optional.

Response 

    [
        {
        "title": "What is the meaning of life in the digital world? [audio]",
        "time": 1531306499,
        "type": "story",
        "score": 22,
        "url": "https://machine-ethics.net/podcast/20-luciano-floridi/"
        },
        {
        "title": "The function that gives AI value is the ability to make predictions",
        "time": 1531197155,
        "type": "story",
        "score": 53,
        "url": "https://www.forbes.com/sites/bernardmarr/2018/07/10/the-economics-of-artificial-intelligence-how-cheaper-predictions-will-change-the-world/"
        },
        {
        "title": "Kubernetes Is the Platform. What’s Next? – Questions and Answers",
        "time": 1531140191,
        "type": "story",
        "score": 28,
        "url": "https://www.redhat.com/en/blog/kubernetes-platform-what%E2%80%99s-next-questions-and-answers"
        }
    ]

## Running
`npm install` - Install all dependencies

`npm start` - Starts the Express.js server

`npm test` - Runs all the tests using Jest library