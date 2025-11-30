# ---------- STAGE 1: BUILD ----------
FROM node:21-alpine3.18 AS build

# Set working directory
WORKDIR /usr/src/app

# Copy dependencies metadata
COPY package*.json ./

# Install all dependencies (including devDependencies for TypeScript)
RUN npm install

# Copy TypeScript config and source code
COPY tsconfig.json ./
COPY src ./src

# Build TypeScript → dist/
RUN npm run build


# ---------- STAGE 2: RUNTIME ----------
FROM node:21-alpine3.18 AS runtime

# Set working directory
WORKDIR /usr/src/app

# Copy package files to install production dependencies
COPY package*.json ./

# Install only production dependencies
RUN npm install --omit=dev

# Copy compiled code from build stage
COPY --from=build /usr/src/app/dist ./dist

# Create upload folders
RUN mkdir -p storage/uploads

# Expose application port
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start"]
