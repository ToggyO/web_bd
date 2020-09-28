FROM node:13.12.0 as build-stage
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --silent
COPY . ./
RUN npm run build


FROM nginx:1.19.1-alpine
COPY --from=build-stage /usr/src/app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
