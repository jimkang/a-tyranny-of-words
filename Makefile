PROJECTNAME = a-tyranny-of-words
HOMEDIR = $(shell pwd)
USER = bot
PRIVUSER = root
SERVER = smidgeo
SSHCMD = ssh $(USER)@$(SERVER)
APPDIR = /opt/$(PROJECTNAME)

pushall: update-remote
	git push origin master

sync:
	rsync -a $(HOMEDIR) $(USER)@$(SERVER):/opt --exclude node_modules/ --exclude data/
	$(SSHCMD) "cd $(APPDIR) && npm install"

set-permissions:
	$(SSHCMD) "chmod 777 -R $(APPDIR)/data"

update-remote: sync set-permissions

test:
	node tests/format-collective-noun-sentence-tests.js
	node tests/prefix-with-article-tests.js
	node tests/pick-first-unused-collective-noun-tests.js

test-integration:
	node tests/integration/get-collective-noun-tests.js

update-collectivizer:
	npm update --save collectivizer && git commit -a -m"Updated collectivizer" && make pushall
