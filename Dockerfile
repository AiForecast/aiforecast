# Use Node.js Alpine image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy frontend files
COPY . /app

# Install dependencies
RUN npm install -g pnpm
RUN pnpm install

# Expose frontend port
EXPOSE 3000

# Run the Next.js development server
CMD ["pnpm", "run", "dev"]
