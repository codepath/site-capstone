const scraperObject = {
  url: "https://www.democracylab.org/projects",
  async scraper(browser) {
    let page = await browser.newPage();
    console.log(`Navigating to ${this.url}...`);
    await page.goto(this.url);

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
        let dataObj = {};
        let newPage = await browser.newPage();
        await newPage.goto(link);

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

        dataObj["action"] = descriptionText

        // dataObj["founder"] = await scrapeDataWithSelector(newPage, "div.AboutProject-staff.AboutProject-secondary-section > div > div > div ")

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

        resolve(dataObj);

        await newPage.close();
      });

      dataObj["image"] = await newPage.$eval("div.container.Profile-root > div > div > div > div.Profile-top-logo > img", (el) => el.src.getProperty("src"));
  

    for (link in urls) {
      let currentPageData = await pagePromise(urls[link]);
      // scrapedData.push(currentPageData);
      console.log(currentPageData);
    }
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
