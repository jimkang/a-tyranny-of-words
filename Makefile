HOMEDIR = $(shell pwd)
SMUSER = noderunner
SERVER = sprigot-droplet
SSHCMD = ssh $(SMUSER)@$(SERVER)
PROJECTNAME = a-tyranny-of-words
APPDIR = /var/www/$(PROJECTNAME)

pushall: sync
	git push origin master

sync:
	rsync -a $(HOMEDIR) $(SMUSER)@$(SERVER):/var/www/ --exclude node_modules/ --exclude data/
	ssh $(SMUSER)@$(SERVER) "cd /var/www/$(PROJECTNAME) && npm install"

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
