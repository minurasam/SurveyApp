build-dev:
	docker build -t react-app .

build-local:
	docker build \
	 -t react-app-production:local \
	 --build-arg CADDYFILE=Caddyfile.local \
	 --build-arg BASE_URL=http://localhost:8000/ \
	 -f Dockerfile.production .

build-production:
	docker build \
	-t react-app-production:production \
	--build-arg CADDYFILE=Caddyfile.production \
	--build-arg BASE_URL=https://mern.mysurveyappwebsite.com/ \
	-f Dockerfile.production . 