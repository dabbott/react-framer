BIN = ./node_modules/.bin

publish-gh-pages:
	npm run build
	git checkout -b gh-pages
	git add dist -f
	git commit -m "Update gh-pages"
	git push -f origin gh-pages:gh-pages
	git checkout -
	git branch -D gh-pages
