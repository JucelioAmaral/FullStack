
# Curso completo FullStack

Api feita em .Net SDK 5.0.202, usando Entity framework para persistencia e acesso ao banco de dados,
Swagger para documentação da Api, SQLServer como SGBD.
Front-End utilizando Angular 12.

## Pré requisitos
 
1. [Node.js - Recommended For Most Users](https://nodejs.org/en/download/)
2. [Visual Code](https://code.visualstudio.com/download)
3. [Download .NET 5.0](https://dotnet.microsoft.com/download/dotnet/5.0)
4. [Angular](https://angular.io/guide/setup-local)

## Como baixar o código

git clone https://github.com/JucelioAmaral/FullStack.git

## Como configurar a api(back)?

1. Abrir a Visual Code;
2. Configurar o arquivo "appsettings.Development.json" com a connectionString, apontando para o banco SQL server;
3. Abrir o Console/Terminal do Visual Code e entrar no diretório da api;
4. Executar o comando: "dotnet ef migrations Add Initial -o Data/Migrations";
5. Executar o comando: "dotnet ef database update";
6. Executar a API pelo Visual Code usando o comando: dotnet watch run;

**API roda na porta https://localhost:5001/swagger/index.html**

## Como executar o app (Front)?

1. Abrir o Console/Terminal do Visual Code e entrar no diretório do app;
2. Instalar o Angular versão mais nova usando o comando: npm install -g @angular/cli;
3. Execute ao comando: npm start ou ng serve;
4. Acesso a página Angula: http://localhost:4200/
