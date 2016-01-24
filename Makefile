HOMEDIR = $(shell pwd)

test:
	node tests/format-collective-noun-sentence-tests.js
	node tests/prefix-with-article-tests.js
	node tests/pick-first-unused-collective-noun-tests.js

test-integration:
	node tests/integration/get-collective-noun-tests.js

run:
	node post-collective-noun.js

update-collectivizer:
	npm update --save collectivizer && git commit -a -m"Updated collectivizer" && make pushall

create-docker-machine:
	docker-machine create --driver virtualbox dev

stop-docker-machine:
	docker-machine stop dev

start-docker-machine:
	docker-machine start dev

# connect-to-docker-machine:
	# eval "$(docker-machine env dev)"

build-docker-image:
	docker build -t jkang/a-tyranny-of-words .

push-docker-image: build-docker-image
	docker push jkang/a-tyranny-of-words

run-docker-image:
	docker run -v $(HOMEDIR)/config:/usr/src/app/config \
		-v $(HOMEDIR)/data:/usr/src/app/data \
		jkang/a-tyranny-of-words node post-collective-noun.js

pushall: push-docker-image
	git push origin master
