FROM node

WORKDIR /app

COPY package.json .
COPY .env .
COPY start-services.sh . 
RUN npm i

COPY . .

# Add these lines to copy the api folder to the container
COPY api /app/api

# Add these lines to install the api packages
WORKDIR /app/api
COPY /api/package.json .
COPY /api/.env .
RUN npm i
RUN chmod +x /app/start-services.sh

WORKDIR /app

EXPOSE 5174
EXPOSE 3001

CMD ["/app/start-services.sh"]
