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

Add functionality to do the reverse of the process above - using the data in the database you have just created, reconstruct the HTML file. 
