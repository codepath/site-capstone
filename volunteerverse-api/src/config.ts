require("dotenv").config() //dotenv package to parse the environment variables from the .env file

export const PORT = process.env.PORT ? Number(process.env.PORT) : 3001;
export const SECRET_KEY = process.env.SECRET_KEY || "secret";
export const BCRYPT_WORK_FACTOR = 13;

export function getDatabaseURI(){
    const dbUser = process.env.DATABASE_USER || "mcristino"
    const dbPass = process.env.DATABASE_PASS ? encodeURI(process.env.DATABASE_PASS) : "postgres"
    const dbHost = process.env.DATABASE_HOST || "localhost"
    const dbPort = process.env.DATABASE_PORT || 5432
    const dbProdName = process.env.DATABASE_NAME || "volunteerverse"
    return process.env.DATABASE_URL || `postgresql://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbProdName}`
}

