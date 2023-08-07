const db = require("../volunteerverse-api/dist/src/db");
const fs = require("fs");

//const { validateFields } = require("../volunteerverse-api/src/utils/validate");

const scraperObject = {
  url: "https://www.democracylab.org/projects",
  async scraper(browser) {
    let page = await browser.newPage();
    console.log(`Navigating to ${this.url}...`);
    await page.goto(this.url);

    // load the page
    for (let i = 0; i <= 5; i++) {
      console.log(i);
      await page.waitForSelector("#MainController > div.SectionBody > div.FindProjectsController-root.container > div > div.ProjectCardContainer.col > div:nth-child(4) > div > button");
      await page.click(
        "#MainController > div.SectionBody > div.FindProjectsController-root.container > div > div.ProjectCardContainer.col > div:nth-child(4) > div > button"
      );
      await page.waitForTimeout(5000);
    }

    // list of the urls of each of the project cards
    let urls = await page.$$eval(
      ".ProjectCardContainer.col .ProjectCard-root > a",
      (links) => {
        links = links.map((el) => el.href);
        return links;
      }
    );

    console.log(urls);

    // Loop through each of those links, open a new page instance and get the relevant data from them
    let pagePromise = (link) =>
      new Promise(async (resolve, reject) => {
        let dataObj = {}; // object that will hold the information about a single project
        let newPage = await browser.newPage();
        await newPage.goto(link);

        dataObj["externalLink"] = link;

        dataObj["projectTitle"] = await scrapeDataWithSelector(
          newPage,
          "div.Profile-top-details > h1"
        );

        dataObj["problem"] = await scrapeDataWithSelector(
          newPage,
          "#AboutProject-tabs-tabpane-proj-details > div.markdown-container >p "
        );

        let descriptionText = await newPage.$$eval(
          "#AboutProject-tabs-tabpane-proj-details > div > div.markdown-container",
          (desc) => {
            desc = desc.map((el) => el.textContent);
            return desc;
          }
        );

        dataObj["action"] = descriptionText;

        dataObj["founder"] = await scrapeDataWithSelector(
          newPage,
          "div.AboutProject-staff.AboutProject-secondary-section > div > div > div > a:nth-child(2)"
        );

        let technologies = await newPage.$$eval(
          "div.AboutProject-technologies > span",
          (tags) => {
            tags = tags.map((el) => el.textContent);
            return tags;
          }
        );

        dataObj["technologies"] = technologies;

        dataObj["website"] = await scrapeDataWithSelector(
          newPage,
          ".AboutProject-url-text > a"
        );

        try {
          dataObj["image"] = await newPage.$eval(
            "div.container.Profile-root > div > div > div > div.Profile-top-logo > img",
            (el) => el.src
          );
        } catch (error) {
          dataObj["image"] = null;
        }

        try {
          // Wait for the element with class "IconLink-root" to appear on the page
          await newPage.waitForSelector(".IconLink-root");

          // Extract contact information using $$eval
          const contactInformation = await newPage.$$eval(
            ".IconLink-root",
            (elements) =>
              elements.map((e) => ({
                platform: e.querySelector(
                  ".IconLink-right > p.IconLink-topText"
                ).textContent,
                link: e.querySelector("a").href,
              }))
          );

          // Store the results in the dataObj
          dataObj["contactInfo"] = contactInformation;
        } catch (error) {
          console.error("Error occurred while scraping:", error);
          dataObj["contactInfo"] = null;
        }

        resolve(dataObj);

        await newPage.close();
      });

    projects = [];
    for (link in urls) {
      let currentPageData = await pagePromise(urls[link]);
      // scrapedData.push(currentPageData);
      console.log(currentPageData);
      projects.push(currentPageData);
    }

    // saves the array of projects as a JSON
    fs.writeFile("projects.json", JSON.stringify(projects), (err) => {
      if (err) throw err;
      console.log("file saved");
    });
  },
};

async function scrapeDataWithSelector(newPage, selector) {
  try {
    return await newPage.$eval(selector, (el) => el.textContent);
  } catch (error) {
    return null;
  }
}

module.exports = scraperObject;
