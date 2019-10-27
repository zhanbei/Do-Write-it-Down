'use strict';

import {convertRepositoriesToMarkdown} from './lib-convert-repos-to-markdown';
import {groupRepositories} from './lib-group-repositories';
import {tagsToBeInjected} from './mid-inject-tags';
import {IGithubRepositoryBase} from './typed-repositories';

const repos = require('../assets/statistics/repositories.json');
const m = new Map<number, IGithubRepositoryBase>();
repos.map(repo => m.set(repo.id, repo));

const groups = groupRepositories(repos);

// Inject custom tags as needed.
tagsToBeInjected.map(tag => {
	const repo = m.get(tag.repoId);
	if (!repo) {throw new Error('Failed to find the target repository: ' + tag.repoId);}
	if (tag.noLanguageTag) {repo.useLanguageTag = false;}
	repo.tags = tag.tags;
});

// Convert groups of repositories to a full markdown document.
const md = `# Personal Repositories\n\nThere are total ${repos.length} repositories.\n\n` +
	groups.map(group => convertRepositoriesToMarkdown(group.name, group.repositories, group.description)).join('\n');

console.log(md);
