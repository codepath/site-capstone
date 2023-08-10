\echo 'Delete and recreate VolunteerVerse database?'
\prompt 'Return for yes or control-C to cancel >' 


SELECT pg_terminate_backend(pg_stat_activity.pid)
FROM pg_stat_activity
WHERE pg_stat_activity.datname = 'volunteerverse';


DROP DATABASE IF EXISTS volunteerverse;
CREATE DATABASE volunteerverse;
\connect volunteerverse

\i volunteerverse-schema.sql