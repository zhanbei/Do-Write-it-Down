'use strict';

import {publicRepositoriesInGroups} from './lib-groups-of-repositories';
import {IGithubRepositoryBase, IGroupedRepositories} from './typed-repositories';

const def = (label: string, repos: IGithubRepositoryBase[], description?: string): IGroupedRepositories => ({name: label, description, repositories: repos});

export const groupRepositories = (repos: IGithubRepositoryBase[]): IGroupedRepositories[] => {
	const groups = publicRepositoriesInGroups;
	// Missed as well as duplicated repositories should be warned.

	const forked: IGithubRepositoryBase[] = [];
	const m = new Map<number, IGithubRepositoryBase>();
	repos.map(repo => {
		if (repo.private) {
			throw new Error('Found private repositories: ' + repo.name);
		} else if (repo.fork) {
			forked.push(repo);
		} else {
			// Public projects.
			m.set(repo.id, repo);
		}
	});
	const retrieve = (id: number): IGithubRepositoryBase => {
		const repo = m.get(id);
		if (!repo) {throw new Error('The target repository could not be retrieved: ' + Array.from(m.keys()).join(', '));}
		// The repositories from the pool could be retrieved once, to avoid duplication.
		m.delete(id);
		return repo;
	};
	const withLanguage = (repo: IGithubRepositoryBase): IGithubRepositoryBase => {
		repo.useLanguageTag = true;
		return repo;
	};
	const applications = groups.applications.map(retrieve).map(withLanguage);
	const tools = groups.tools.map(retrieve).map(withLanguage);
	const libraries = groups.libraries.map(retrieve).map(withLanguage);
	const helpers = groups.helpers.map(retrieve);
	const others = groups.personal.map(retrieve);

	const left = Array.from(m.keys());
	if (left.length > 0) {
		throw new Error('There are repositories left handled: ' + left.join(', '));
	}

	return [
		// Web Applications(including Browser Extensions)
		// Often for developers and public.
		def('Applications', applications),
		// Command-line Tools
		// Often for developers only.
		def('Tools', tools),
		// Codes Related Libraries
		def('Libraries', libraries),
		// Boilerplate or Demos
		def('Helpers', helpers),
		// Unclassified
		def('Personal', others),
		def('Forked Repositories', forked),
	];
};
