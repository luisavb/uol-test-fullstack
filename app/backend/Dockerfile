# Use a imagem base que tenha suporte a apt-get (por exemplo, uma imagem base do Node.js)
FROM node:lts-alpine AS development

# Etapa de desenvolvimento
WORKDIR /backend

# Copie os arquivos de manifesto de pacote e instale as dependências
COPY package.json /backend/package.json
COPY package-lock.json /backend/package-lock.json
RUN npm install

# Copie o restante dos arquivos da aplicação
COPY . .

# Exponha a porta 3001
EXPOSE 3000

# Comando para iniciar sua aplicação (por exemplo, node.js)
CMD [ "npm", "run", "dev"]

# Crie uma nova etapa para configurações de desenvolvimento
FROM development AS dev-envs
