HOMEDIR = $(shell pwd)
SERVER = smidgeo-headporters
SSHCMD = ssh $(SMUSER)@$:(SERVER)
PROJECTNAME = a-tyranny-of-words
APPDIR = /var/apps/$(PROJECTNAME)

# Many of these targets need the SMUSER environment to be defined, which should be the
# username of the user on SERVER that has the permissions to execute these operations.

pushall: sync
	git push origin master

sync:
	rsync -a $(HOMEDIR) $(SMUSER)@smidgeo-headporters:/var/apps/ --exclude node_modules/ --exclude data/
	ssh $(SMUSER)@smidgeo-headporters "cd /var/apps/$(PROJECTNAME) && npm install"

set-permissions:
	$(SSHCMD) "chmod 777 -R $(APPDIR)/data"

update-remote: sync set-permissions

HOMEDIR = $(shell pwd)

test:
	node tests/format-collective-noun-sentence-tests.js
	node tests/prefix-with-article-tests.js
	node tests/pick-first-unused-collective-noun-tests.js

test-integration:
	node tests/integration/get-collective-noun-tests.js

update-collectivizer:
	npm update --save collectivizer && git commit -a -m"Updated collectivizer" && make pushall
