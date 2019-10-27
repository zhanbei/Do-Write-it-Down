'use strict';

/*
- Info / Basic
	- Name
	- Description
	- Language
	- Homepage
- Meta
	- Size
	- Created
	- Updated
	- Pushed
- Type & Status
	- Private
	- Fork
	- Archived
	- Disabled
- Issue
	- Open Issues Count
- Statistics
	- Forks
	- Watchers
	- Stargazers
- Extra
	- Mirror URL
*/
export interface IGithubRepositoryBase {
	id: number;
	name: string;
	description: string;
	language: string;
	homepage: string;

	// Use the repo language as a tag.
	useLanguageTag?: boolean;
	// [CACHE] Custom Tags
	tags?: string[];

	private: boolean;
	fork: boolean;

	size: number;

	created_at: string;
	updated_at: string;
	pushed_at: string;
}

export interface IGroupedRepositories {
	name: string;
	description?: string;
	repositories: IGithubRepositoryBase[];
}
