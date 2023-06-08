const { remote } = require("webdriverio");

describe("Assignment #1 - Broken Images Gallery", () => {
  let browser;

  before(async () => {
    // Create a new browser instance
    browser = await remote({
      capabilities: {
        browserName: "chrome", // or 'firefox', 'safari', 'edge', etc.
      },
    });
  });

  beforeEach(async () => {
    // Set the browser window size
    browser.maximizeWindow();
  });

  it("should display broken images", async () => {
    // Open the broken images page
    await browser.url("http://the-internet.herokuapp.com/broken_images");

    const images = await browser.$$("img.example");

    for (const image of images) {
      const imageSrc = await image.getAttribute("src");

      // Check if the image is broken
      const isBroken = await browser.execute((img) => {
        const image = new Image();
        image.src = img;
        return image.complete && image.naturalHeight !== 0;
      }, imageSrc);

      // Assert that the image is broken
      expect(isBroken).toBe(
        false,
        `Image with src "${imageSrc}" is not broken.`
      );
    }
  });

  it("should display a broken link", async () => {
    // Open the broken images page
    await browser.url("http://the-internet.herokuapp.com/broken_images");

    const link = await browser.$(".example");

    // Check if the link element was found
    if (!link) {
      throw new Error("Link element not found.");
    }

    const linkHref = await link.getAttribute("href");

    // Check if the link has an href attribute
    if (linkHref === null) {
      console.log("Link does not have an href attribute.");
      // Handle the case when the link does not have an href attribute
      // You can choose to skip the check or perform a different validation
      return;
    }

    // Check if the link is broken
    const isBroken = await browser.execute((a) => {
      const link = document.createElement("a");
      link.href = a;
      return link.protocol === "http:" || link.protocol === "https:";
    }, linkHref);

    // Throw an error if the link is not broken
    if (isBroken) {
      throw new Error(`Link with href "${linkHref}" is not broken.`);
    }
  });
});
