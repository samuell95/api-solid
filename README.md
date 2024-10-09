# App

GymPass style app.

## RFs (Requisitos funcionais)

- [x] Deve ser possível se cadastrar;
- [x] Deve ser possível se autenticar;
- [x] Deve ser possível obter o perfil de um usuário logado;
- [x] Deve ser possível obter o número de check-ins realizados pelo usuário logado;
- [x] Deve ser possível o usuario obter seu historico de check-ins;
- [x] Deve ser possível o usuario buscar academias próximas (até 10km);
- [x] Deve ser possível o usuario buscar academias pelo nome;
- [x] Deve ser possível o usuario realizar check-in em uma academia;
- [x] Deve ser possível validar o check-in de um usuário;
- [x] Deve ser possível cadastrar uma academia;

## RNs (Regras de negócio)

- [x] O usuario não deve poder se cadastrar com um e-mail duplicado;
- [x] O usuario não deve fazer 2 check-ins no mesmo dia;
- [x] O usuario não deve fazer check-in se não estiver pero (100m) da academia;
- [x] O check-in só pode ser validado até 20 minutos após criado;
- [x] O check-in só pode ser validado por administradores;
- [x] A academia só pode ser cadastrada por administradores;

## RNFs (Requiitos não-funcionais)

- [x] A senha do usuário presisa estar criptografada;
- [x] Os dados da aplicação precisam estar persistidos em um banco PostgresSQL;
- [x] Todas as listas de dados precisam estar paginadas com 20 itens por páginas;
- [x] O usuario deve ser identificado por um JWT (JSON Web Token);