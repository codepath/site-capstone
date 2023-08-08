require("dotenv").config();
const secretKey = `${process.env.SECRET_KEY}`;

const PORT = process.env.PORT ? Number(process.env.PORT) : 3009;

function getDatabaseUri() {
    const dbUser = process.env.DATABASE_USER || "codepath_capstone_user"; //change this to ur name when you run psql 
    const dbPass = process.env.DATABASE_PASS ? encodeURIComponent(process.env.DATABASE_PASS) : "";
    const dbHost = process.env.DATABASE_HOST || "dpg-cislcdtph6et1s8irid0-a.oregon-postgres.render.com";
    const dbPort = process.env.DATABASE_PORT || 5432;
    const dbName = process.env.DATABASE_NAME || "codepath_capstone";

    return process.env.DATABASE_URL || `postgres://nomadia_db_user:ZzvYi2rnw40muzcdGVeTHTR7HtCCjyvb@dpg-cj8ki9cl975s738h521g-a.oregon-postgres.render.com/nomadia_db?sslmode=require`;
    //     `postgresql://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}`
}
const BCRYPT_WORK_FACTOR = 13
// console.log("process.env", Object.keys(process.env));
console.log("App Config");
console.log("PORT:", PORT);
console.log("Database URI:", getDatabaseUri());
console.log("---");
 

module.exports = {
    PORT,
    BCRYPT_WORK_FACTOR,
    getDatabaseUri,
    secretKey
};

