.PHONY: install dev build render lint upgrade clean

install:
	npm install

dev:
	npm run dev

build:
	npm run build

render:
	npm run render

lint:
	npm run lint

upgrade:
	npm run upgrade

clean:
	rm -rf node_modules dist build out
