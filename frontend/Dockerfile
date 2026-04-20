FROM node:22-slim

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app

COPY package.json pnpm-lock.yaml* ./
RUN rm -f pnpm-lock.yaml && pnpm install

COPY . .

EXPOSE 5173

# We use --host to ensure Vite binds to 0.0.0.0, allowing access from outside the container
# We also run pnpm install on startup to guarantee node_modules syncs with the mounted directory
CMD ["sh", "-c", "pnpm install && pnpm run dev --host"]
