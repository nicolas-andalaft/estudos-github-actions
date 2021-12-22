const axios = require('axios');
const core = require('@actions/core');
const github = require('@actions/github');

var media = undefined;
var search_item = 'Thank You';

async function run() {
    const GITHUB_TOKEN = core.getInput('GITHUB_TOKEN');
    const TENOR_TOKEN = core.getInput('TENOR_TOKEN');

    const randomPos = Math.round(Math.random() * 10);
    const url = `https://api.tenor.com/v1/search?q=palmeiras%20palmeiras&pos=${randomPos}&limit=1&media_filter=minimal&contentfilter=high&key=${TENOR_TOKEN}`;
    await axios.get(url).then(function (response) { 
        var x = response.data.results
        media=x[0].media[0].tinygif.url
        console.log(media)

    }).catch(function (error) { 
        console.log(error)
    });

    const octokit = github.getOctokit(GITHUB_TOKEN);

    const { context = {} } = github;
    const { pull_request } = context.payload;

    await octokit.rest.issues.createComment({
        ...context.repo,
        issue_number: pull_request.number,
        body: `Obrigado GitHUb Actions por testar a minha paciência!\n\n<img src="${media}" alt="${search_item}">`
    });

}

  run();