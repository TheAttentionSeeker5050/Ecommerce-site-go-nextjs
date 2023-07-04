# Use the official Node.js 14 Alpine base image
FROM node:18.15.0-alpine AS builder

# Set the working directory inside the container
WORKDIR /client

# # Copy package.json and package-lock.json
# COPY package*.json ./

# Copy the entire project
COPY . .

RUN rm -rf node_modules

# Install dependencies
RUN npm install


# Build the Next.js application
RUN npm run build

# Remove development dependencies
RUN npm prune --production

# # # Use a smaller base image for the production image
# FROM node:18.15.0-alpine

# # Set the working directory
# WORKDIR /client

# # Copy the build output from the builder stage
# COPY --from=builder /client/.next ./.next
# COPY --from=builder /client/public ./public
# COPY --from=builder /client/node_modules ./node_modules

# Set environment variables
# ENV NODE_ENV=production
ENV NODE_ENV=development

# Expose the desired port
EXPOSE 3001

# Start the Next.js application
CMD ["npm", "start"]
