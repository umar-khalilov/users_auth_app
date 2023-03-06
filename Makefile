DOCKERFILE = ./docker-compose.yaml
DOCKERDIR = ./

build:
	docker compose -f ${DOCKERFILE} --project-directory ${DOCKERDIR} --env-file=./.development.env build
up-dev:
	docker compose -f ${DOCKERFILE} --project-directory ${DOCKERDIR} --env-file=./.development.env up
stop:
	docker compose -f ${DOCKERFILE} --project-directory ${DOCKERDIR} --env-file=./.development.env stop
down: 
	docker compose -f ${DOCKERFILE} --project-directory ${DOCKERDIR} --env-file=./.development.env down
logs:
	docker compose -f ${DOCKERFILE} --project-directory ${DOCKERDIR} logs --follow ${c}
prune:
	docker system prune --all --force --volumes