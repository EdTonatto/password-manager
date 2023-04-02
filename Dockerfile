FROM  node:18.15.0-alpine as development

WORKDIR /app

COPY tsconfig*.json ./
COPY package*.json ./

RUN npm install -g @nestjs/cli

RUN npm ci

COPY src/ src/

RUN npm run build

EXPOSE 3000

CMD [ "node", "dist/main.js" ]