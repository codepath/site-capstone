\echo 'Delete and recreate auth_starter db?'
\prompt 'Return for yes or control-C to cancel > ' answer

DROP DATABASE healthhero;
CREATE DATABASE healthhero;
\connect healthhero

\i healthhero-schema.sql

\echo 'Delete and recreate healthhero_test db?'
\prompt 'Return for yes or control-C to cancel > ' answer

DROP DATABASE healthhero_test;
CREATE DATABASE healthhero_test;
\connect healthhero_test

\i healthhero-schema.sql