# Proyecto NOC
El objetivo es crear una serie de tareas usando Arquitectura Limpia con TypeScript.


# dev

1. Clonar el archivo env.template a .env
2. configurar las variables de entorno.
```
PORT=4000

MAILER_EMAIL=
MAILER_SECRET_KEY=
PROD=true
```
3. Ejecutar el comando ```npm install```
4. Levantar las bases de datos con el comando ``` docker compose up -d ```
5. Ejecuatar ``` npm run dev ```


## Obtener Gmail Key
[Google AppsPasswords](https://myaccount.google.com/u/0/appasswords)