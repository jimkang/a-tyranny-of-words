HOMEDIR = $(shell pwd)
GITDIR = /var/repos/a-tyranny-of-words.git
PM2 = $(HOMEDIR)/node_modules/pm2/bin/pm2

test:
	node tests/format-collective-noun-sentence-tests.js
	node tests/prefix-with-article-tests.js
	node tests/pick-first-unused-collective-noun-tests.js

test-integration:
	node tests/integration/get-collective-noun-tests.js

run:
	node post-collective-noun.js

sync-worktree-to-git:
	git --work-tree=$(HOMEDIR) --git-dir=$(GITDIR) checkout -f

npm-install:
	cd $(HOMEDIR)
	npm install
	npm prune

post-receive: sync-worktree-to-git npm-install

pushall:
	git push origin master && git push server master

update-collectivizer:
	npm update --save collectivizer && git commit -a -m"Updated collectivizer" && make pushall
