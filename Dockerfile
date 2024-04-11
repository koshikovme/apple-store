# Stage 1: Build the frontend
FROM node:20.10.0 AS frontend
WORKDIR /app/frontend
COPY . /app/frontend
RUN npm install
CMD ["npm", "start"]

## Stage 1: Build the frontend
#FROM node:20.10.0 AS frontend
#WORKDIR /app/frontend
#COPY package.json ./
#COPY package-lock.json ./
#RUN npm install
#COPY . .
#RUN npm run build
#
## Stage 2: Create the final frontend image
#FROM nginx:alpine
#COPY --from=frontend /app/frontend/build /usr/share/nginx/html
#EXPOSE 3000
#CMD ["nginx", "-g", "daemon off;"]
