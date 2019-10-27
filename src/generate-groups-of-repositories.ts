'use strict';

import {groupRepositories} from './lib-group-repositories';

const repos = require('../assets/statistics/repositories.json');

const groups = groupRepositories(repos);

// Again, generate codes used to update the metadata in comments.
const defs =
	`'use strict';\n\n` +
	groups.map(group =>
		group.name.includes(' ') ? '' : `const ${group.name.toLowerCase()} = [\n${group.repositories.map(repo => `\t${repo.id}, // ${repo.name}\n`).join('')}];\n`,
	).join('\n') + '\n' +
	`export const publicRepositoriesInGroups = {\n${groups.map(group => group.name.includes(' ') ? '' : '\t' + group.name.toLowerCase() + ',\n').join('')}};`;

console.log(defs);
