const axios = require('axios');
const core = require('@actions/core');
const github = require('@actions/github');

module.exports = {
    action: async function action() {
        const GITHUB_TOKEN = core.getInput('GITHUB_TOKEN');
        const TENOR_TOKEN = core.getInput('TENOR_TOKEN');
        
        const url = `https://g.tenor.com/v1/random?q=Thank%20you&limit=1&media_filter=minimal&contentfilter=high&key=${TENOR_TOKEN}`;
        var media = undefined;
        
        try {
            var response = await axios.get(url);
            var x = response.data.results
            media = x[0].media[0].tinygif.url
        }
        catch(error) {
            console.log(error)
        }
        
        const octokit = github.getOctokit(GITHUB_TOKEN);
    
        const { context = {} } = github;
        const { pull_request } = context.payload;
    
        await octokit.rest.issues.createComment({
            ...context.repo,
            issue_number: pull_request.number,
            body: `Thank you for submitting a pull request! We will try to review this as soon as we can\n\n<img src="${media}" alt="Thank You gif">`
        });
    
    }
}