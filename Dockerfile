FROM node:15.10.0-alpine AS build
WORKDIR /build
COPY . .
RUN npm install
RUN npm run build

FROM node:15.10.0-alpine AS production
WORKDIR /app
COPY --from=build /build/package*.json ./
COPY --from=build /build/.next ./.next
COPY --from=build /build/public ./public
COPY --from=build /build/config ./config
RUN npm install next

EXPOSE 3000
CMD npm run start