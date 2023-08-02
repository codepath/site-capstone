\echo ' Delete and recreate lifetraker db?'
\prompt ' Return for yes or control-c to cancel > ' answer

DROP DATABASE nomadia;
CREATE DATABASE nomadia;
\connect nomadia;

\i database.sql 