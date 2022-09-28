## Interview task

We have a document represented in an HTML file (`data/input.html`) which contains nested sections. Each section of the document is determined by the heading level, where smaller heading numbers i.e. (\<h3\> is smaller than \<h2\> which is smaller than \<h1\>) are children of the section above them: Section "1" is the parent of "1.1" and "1.2", which are themselves parents of "1.1.1" and "1.2.1" etc.

We need to be able to post HTML files like this to the server, and have them flattened and saved to the "sections" table in the database. Any content in the section heading tag is the "header" value. Any content following a heading tag until the next heading tag is the section's "body" value. All sections from `data/input.html` must be saved to the database. Here is the existing "sections" table schema, but please modify as you feel necessary.

```
+------------+--------------------------+--------------------------------------------------------+
| Column     | Type                     | Modifiers                                              | Notes
|------------+--------------------------+--------------------------------------------------------|
| id         | integer                  |  not null default nextval('sections_id_seq'::regclass) |
| header     | character varying(255)   |  not null                                              | HTML content of the section header
| body       | character varying(255)   |                                                        | HTML content of the section body
| parent_id  | integer                  |                                                        | Id of the section's parent
| created_at | timestamp with time zone |                                                        | Automatically set by Knex
| updated_at | timestamp with time zone |                                                        | Automatically set by Knex
+------------+--------------------------+--------------------------------------------------------+
```

### Additional Task

Add functionality to do the reverse of the process above - using the data in the database you have just created, reconstruct the HTML file. Additionally, include logic that allows the user to exclude sections at a specific level (and therefore any child levels). E.g., the user could request the document excluding sections that are >= 3 levels deep. In this context, parent-less sections are level 1.

## Using this repo

The repo is setup for you to use TypeScript, but you can use JavaScript if you prefer. You can modify any of the existing code if you desire, but the code does need to be able to run on someone elses machine with minimal setup.

We've setup the boilerplate for a Dockerized ExpressJS server, with a postgres database. Run `yarn dev` so spin up the docker containers for the application. This runs [https://nodemon.io/](https://nodemon.io/) which restarts the server when you save changes. Port 3000 is exposed, so you can make requests to http://localhost:3000.

We've installed [knexjs](https://knexjs.org/) for you to connect to the database with, but feel free to replace that with any libraries you require.

## Instructions when complete

Once complete please zip up the repo (exclude any node_modules), and send it to: `alistair.mcclelland@clarivate.com`, with any comments or instructions to be aware of highlighted in this README file.

It's anticipated that this should take around 2 hours to complete.
