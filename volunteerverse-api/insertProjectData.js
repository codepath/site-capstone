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
        contactInfo,
      } = dataObj;

      console.log('current object', projectTitle)
      let links = "";
      try {
        technologies.forEach((tag) => {
          insertProjectTags(projectTitle, tag);
        });
        
        contactInfo.forEach((obj) => {
          links += obj.platform + ":" + obj.link + ",";
        });
        console.log(links);
      } catch (error) {
        continue;
      }
      if (!projectTitle) {
        continue;
      }

      const query1 = `
        INSERT INTO projects (org_name, website, project_name, project_description, image_url, contact_info) VALUES ($1, $2, $3, $4, $5, $6)
        `;
      const values = [
        projectTitle,
        website,
        projectTitle,
        problem + action,
        image,
        links,
      ];
      await db.query(query1, values);
    }
    console.log("populated");
  } catch (error) {
    console.log(error);
  }
}

async function insertProjectTags(name, tag) {
  try {
    const query = `INSERT into project_tags(project_name, tag_name) VALUES ($1, $2) RETURNING *`;
    await db.query(query, [name, tag]);
  } catch (error) {}
}

insertData();
