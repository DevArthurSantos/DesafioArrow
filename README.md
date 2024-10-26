# Desafio Back-End - Arrow Digital (Arthur Santos)

## ⛏️ Construído usando

- [Node.js](https://nodejs.org/en/) - Ambiente do servidor.
- [NestJs](https://nestjs.com/) - Estrutura do servidor (Back-End).
- [MongoDB](https://www.mongodb.com/) - Banco de dados.
- [Mongoose](https://mongoosejs.com/) - TypeScript ODM.
- [Axios](https://axios-http.com/ptbr/docs/intro) - Cliente HTTP.
- [Dotenv](https://www.npmjs.com/package/dotenv) - Módulo para variáveis de ambiente.
- [Docker](https://www.docker.com/) - Contêiner de aplicações.

## Módulos e recursos do desafio

1. **Módulos**
   - **auth**     - Responsável por todos os endpoints de autenticação.
   - **axios**    - Cliente para requisições HTTP/HTTPS.
   - **post**     - Responsável por todos os endpoints dos posts (`post/list`, `post/by-date`, `post/sorted`).
   - **reddit**   - Responsável pelo cron job diário para salvar os posts mais populares.

2. Cache para múltiplas requisições.

3. Clusters.

4. Docker.

5. Documentação via Swagger em http://localhost:3000/docs.

6. Coleção de APIs para [Bruno API Client](https://www.usebruno.com/), localizada em `./Desafio Arrow`.

## Vídeos

- [Demonstração Desafio Arrow Digital](https://youtu.be/_TlXMmUYJSo)

### Instalação

1. Clone este projeto:
   git clone https://github.com/DevArthurSantos/ArrowDigital

2. Entre na pasta criada.

3. Renomeie o arquivo .env.example para .env.

4. Altere as variáveis do novo .env para os valores apropriados.

5. Instale as dependências: `npm install`

6. Execute o projeto: `npm run dev`

7. Para utilizar o docker: `docker compose up --build -d`

8. Acesse http://localhost:3000/docs para ver os endpoints.

## 🎉 Reconhecimentos

- [Desenvolvedor FullStack](https://github.com/DevArthurSantos) - Arthur Santos.

## Licença

[Apache 2.0](https://choosealicense.com/licenses/apache-2.0/)





-   **Testes unitários**
-   **Testes de integração**
-   **Uso de contêiner (Docker)**
- **Projeto rodando em algum serviço cloud**