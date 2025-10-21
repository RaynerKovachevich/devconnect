# Use official Node image
FROM node:20-alpine

# Create app directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm ci --omit=dev

# Copy source
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build TypeScript (optional if you run compiled output)
RUN npm run build || true

EXPOSE 5000

CMD ["node", "dist/app.js"]
