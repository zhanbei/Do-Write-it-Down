'use strict';

import {IGithubRepositoryBase} from './typed-repositories';

const repoToMarkdown = (repo: IGithubRepositoryBase): string => {
	let md = '';
	md += `- ${repo.name}${repo.useLanguageTag && repo.language ? ' `' + repo.language + '`' : ''}${repo.tags ? repo.tags.map(tag => ' `' + tag + '`') : ''}\n`;
	if (repo.description) {md += `\t- ${repo.description}\n`;}
	return md;
};

const reposToMarkdown = (repos: IGithubRepositoryBase[]): string => {
	return repos.map(repo => repoToMarkdown(repo)).join('');
};

const renderModule = (label: string, repos: IGithubRepositoryBase[], description?: string): string => {
	let md = `## ${label}\n`;
	md += '\n';
	if (description) {md += description + '\n\n';}
	md += reposToMarkdown(repos) + '\n';
	return md;
};

export const convertRepositoriesToMarkdown = renderModule;