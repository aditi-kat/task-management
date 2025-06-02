FROM node:20-alpine

WORKDIR /app

# Copy package and install deps first for better caching
COPY package*.json ./
RUN npm install

# Copy the rest of the code
COPY . .

# Copy .env manually if needed (optional, for local test)
# COPY .env .env

EXPOSE 5000
CMD ["node", "index.js"]
