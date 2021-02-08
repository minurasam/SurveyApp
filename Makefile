build-local:
	cd client && $(MAKE) build-local
	cd backend && $(MAKE) build

run-local: 
	ENV = local docker-compose -f docker-compose-production.yml up


build-production:
	cd client && $(MAKE) build-production
	cd backend && $(MAKE) build

run-production: 
	ENV = production docker-compose -f docker-compose-production.yml up

