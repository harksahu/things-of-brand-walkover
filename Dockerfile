FROM node:16
WORKDIR /app/frontend/
ENV PATH /app/frontend/node_modules/.bin:$PATH
COPY frontend/package.json ./
COPY frontend/package-lock.json ./
RUN npm install --silent
RUN npm install react-scripts@5.0.1 -g --silent
COPY . ./
EXPOSE 8080
WORKDIR /app
RUN npm install i npm@latest -g
RUN npm install dotenv-cli -g
COPY package.json package-lock*.json ./
RUN npm install
COPY . .    
CMD ["npm", "start"]
