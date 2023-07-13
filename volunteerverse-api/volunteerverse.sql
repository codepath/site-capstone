\echo 'Delete and recreate VolunteerVerse database?'
\prompt 'Return for yes or control-C to cancel > ' 

DROP DATABASE IF EXISTS volunteerverse;
CREATE DATABASE volunteerverse;
\connect volunteerverse

\i volunteerverse-schema.sql