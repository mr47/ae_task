FROM node:12.16.2

WORKDIR /usr/app

# Install dependencies
COPY ./package.json ./
RUN npm install

# Copy everything else
COPY ./ ./

# Default commands
CMD ["npm", "run", "dev"]
