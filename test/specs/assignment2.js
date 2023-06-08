const path = require("path");
const assert = require("assert");

describe("Upload File", () => {
  it("should be able to upload a file", () => {
    // Find the file upload input and submit button
    const input = $("#file-upload");
    const submitBtn = $("#file-submit");

    // Define the local file path
    const filePath = path.join(
      __dirname,
      "../qareport/assignment2_QAReport.txt"
    );

    // Upload the file using the browser.uploadFile method
    const remoteFilePath = browser.uploadFile(filePath);

    // Open the test page to perform the file upload
    browser.url("http://the-internet.herokuapp.com/upload");

    // Set the file path value in the input field
    input.setValue(remoteFilePath);

    // Click the submit button
    submitBtn.click();

    // Verify that the file upload success message is displayed
    const uploadedFileMessage = $("h3=File Uploaded!");
    assert.ok(
      uploadedFileMessage.isExisting(),
      "File upload message is not displayed"
    );
  });
});
