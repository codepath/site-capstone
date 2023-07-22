import {Pool} from "pg";
import { getDatabaseURI } from "./config";

const db = new Pool({
  connectionString: getDatabaseURI(),
});

// db.connect();


db.connect((err: { stack: any }) => {
  if (err) {
    console.error("connection error", err.stack);
  } else {
    // console.log("Successfully connected to postgres database!");
    
  }
});

export default db

