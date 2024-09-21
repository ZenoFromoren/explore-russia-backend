export default () => ({
  server: {
    port: parseInt(process.env.PORT),
  },
  database: {
    host: process.env.POSTGRES_HOST,
    username: process.env.POSTGRES_USERNAME,
    name: process.env.POSTGRES_DB_NAME,
    schema: process.env.POSTGRES_DB_SCHEMA,
    password: process.env.POSTGRES_PASSWORD,
    port: parseInt(process.env.POSTGRES_PORT),
  },
  jwt: {
    secretkey: process.env.SERCRET_KEY,
  },
});
