'use strict';

interface ITagInjection {
	repoId: number;
	tags: string[];
	noLanguageTag?: boolean;
}

export const tagsToBeInjected: ITagInjection[] = [
	{repoId: 155959044, tags: ['Browser-Extension/Chrome']},
	{repoId: 113680142, tags: ['Browser-Extension/Chrome']},
	{repoId: 80531029, tags: ['Web-Application'], noLanguageTag: true},
	{repoId: 70986305, tags: ['Desktop']},
	{repoId: 75750695, tags: ['Android']},
	{repoId: 103595127, tags: ['Desktop'], noLanguageTag: true},
];
