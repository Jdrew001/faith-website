#Stage 0, "build-stage"
FROM  tiangolo/node-frontend:latest as build-stage

WORKDIR /app

COPY . /app

RUN ls

RUN npm install

COPY ./ /app/

ARG configuration=production

RUN npm run build -- --output-path=./dist/out --configuration production

#stage 1
FROM nginx

COPY --from=build-stage /app/dist/out /usr/share/nginx/html

#COPY 
COPY --from=build-stage /nginx.conf /etc/nginx/conf.d/default.conf