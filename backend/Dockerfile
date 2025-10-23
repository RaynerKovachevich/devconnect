# Base image with Node 20
FROM node:20-alpine

# Working directory inside the container
WORKDIR /usr/src/app

# Install dependencies first (leverages Docker layer cache)
COPY package*.json ./
RUN npm install

# Copy the rest of the source code
COPY . .

# Generate Prisma client and compile TypeScript
RUN npx prisma generate
RUN npm run build

# Expose API port
EXPOSE 5000

# Start the compiled app
CMD ["npm", "run", "start"]
