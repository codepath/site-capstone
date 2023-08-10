const db = require("../volunteerverse-api/dist/src/db");
const fs = require("fs");

async function insertData() {
  try {
    const jsonData = fs.readFileSync("projects.json", "utf-8");
    // Parse the JSON into an array of objects
    const dataArray = JSON.parse(jsonData);

    // Insert each object in the array into the database
    for (const dataObj of dataArray) {
      const {
        projectTitle,
        problem,
        action,
        founder,
        technologies,
        website,
        image,
        externalLink,
      } = dataObj;

      console.log('current object', projectTitle)
      let links = "";
     
      if (!projectTitle) {
        continue;
      }

      const query1 = `
        INSERT into projects(org_name, project_name, project_description, image_url, external_link, public_email) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *
        `;
      const values = [
        projectTitle,
        projectTitle,
        problem + action,
        image,
        externalLink,
        ""
      ];
      let results = await db.query(query1, values);

      const query2 = `UPDATE projects SET external=$1`
      await db.query(query2, [true])

      try {
        technologies.forEach((tag) => {
          insertProjectTags(projectTitle, results.rows[0].id, tag);
        });
        
        console.log(links);
      } catch (error) {
        continue;
      }
    }
    console.log("populated");
  } catch (error) {
    console.log(error);
  }
}

async function insertProjectTags(name, project_id, tag) {
  try {
    const query = `INSERT into project_tags(project_name, tag_name, project_id) VALUES ($1, $2, $3) RETURNING *`;
    await db.query(query, [name, tag.toLowerCase(), project_id]);
  } catch (error) {}
}

insertData();
