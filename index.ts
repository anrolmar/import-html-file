import db from './src/config/knex';
import express from 'express';
import { sectionRouter } from './src/sections/section.router';

const app = express();

app.use(express.json());
app.use('/api/sections', sectionRouter);

app.listen(3000, async () => {
  console.log('server up');

  const sectionsTableExists = await db.schema.hasTable('sections');
  if (!sectionsTableExists) {
    await db.schema.createTable('sections', (table) => {
      table.increments('id');
      table.string('header').notNullable();
      table.text('body', 'TEXT').nullable();
      table.integer('parent_id').nullable().references('sections.id');
      table.timestamps(undefined, true);
    });
  }
});
