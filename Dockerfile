FROM node:15.12.0-alpine3.10 AS builder
WORKDIR /opt/rc/worldwide-holidays
ENV NODE_ENV=build
COPY package.json ./
COPY ./src ./
COPY ./nest-cli.json ./
COPY ./tsconfig.build.json ./
COPY ./tsconfig.json ./
RUN npm i --verbose
RUN npm run build

FROM node:15.12.0-alpine3.10 AS production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /opt/rc/nestjs-authentication
COPY --from=builder /opt/rc/worldwide-holidays/package.json ./
COPY --from=builder /opt/rc/worldwide-holidays/dist ./dist
COPY --from=builder /opt/rc/worldwide-holidays/node_modules ./node_modules
CMD ["node", "dist/main"]