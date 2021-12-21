const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
    const github_token = core.getInput('GITHUB_TOKEN');

    const context = github.context;
    if (context.payload.pull_request == null) {
        core.setFailed('No pull request found.');
        return;
    }
    const pull_request_number = context.payload.pull_request.number;

    const octokit = new github.getOctokit(github_token);
    await octokit.issues.createComment({
        ...context.repo,
        issue_number: pull_request_number,
        body: 'Thank you for submitting a pull request! We will try to review this as soon as we can'
      }); 
}

run();
