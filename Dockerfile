# Étape 1 : Builder l'app
FROM node:20-alpine AS builder
WORKDIR /app

# Installer les dépendances
COPY package*.json ./
RUN npm install

# Copier le reste du code
COPY . .

# Build (Next.js + TypeORM migration si besoin)
RUN npm run build

# Étape 2 : Runner
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copier uniquement ce qu’il faut du builder
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

# Exposer le port
EXPOSE 3000

CMD ["npm", "run", "start"]
