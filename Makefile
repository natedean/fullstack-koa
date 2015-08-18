build:
  # home page build
	jspm bundle-sfx --minify home/main -o public/js/home/app.min.js
	./node_modules/.bin/html-dist src/index.html --remove-all --minify --insert js/home/app.min.js -o views/home.html