FROM registry.ntq.solutions/other/yarn:1.22.19-ubi9-node19.x
RUN mkdir /opt/skill-inventory-frontend
COPY . /opt/skill-inventory-frontend/
WORKDIR /opt/skill-inventory-frontend
RUN yarn install
EXPOSE 3000
CMD ["yarn", "run", "dev"]