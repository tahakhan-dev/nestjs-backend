# Use Node.js LTS version
FROM node:18

# Install pnpm globally
RUN npm install -g pnpm

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and pnpm-lock.yaml files
COPY package.json pnpm-lock.yaml ./

# Install dependencies using pnpm
RUN pnpm install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Build the application
RUN pnpm run build

# Expose the application port
EXPOSE 3000

# Run the application
CMD ["pnpm", "run", "start:prod"]
