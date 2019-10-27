#!/usr/bin/env bash

cd "${BASH_SOURCE%/*}"

# Update offline resources.
curl https://api.github.com/users/zhanbei/repos?per_page=100 > ./raw-repositories.json

# Reformat the target resources.
node update-repos.js > repositories.json
