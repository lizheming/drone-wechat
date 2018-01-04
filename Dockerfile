FROM mhart/alpine-node:8.9.3

LABEL maintainer="lizheming <i@imnerd.org>" \
  org.label-schema.name="Drone Telegram Node" \
  org.label-schema.vendor="lizheming" \
  org.label-schema.schema-version="1.0"

WORKDIR /wechat
COPY package.json /wechat/package.json
RUN npm install

COPY index.js /wechat/index.js
ENTRYPOINT [ "node", "/wechat/index.js" ]