import knex from 'knex';

const db = knex({
  client: 'pg',
  connection: {
    host: 'interview_task_db',
    port: 5432,
    user: 'postgres',
    password: 'interview_task_db_password',
    database: 'postgres',
  },
});

export default db;
