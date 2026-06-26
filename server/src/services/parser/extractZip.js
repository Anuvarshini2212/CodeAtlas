const path = require("path");
const fs = require("fs-extra");
const unzipper = require("unzipper");

const extractZip = async (zipFilePath) => {
  try {
    console.log("ZIP FILE PATH:", zipFilePath);

    // Check if zip exists
    const exists = await fs.pathExists(
      zipFilePath
    );

    if (!exists) {
      throw new Error(
        "ZIP file does not exist"
      );
    }

    // Create unique extraction folder
    const extractFolderName =
      Date.now() + "-repo";

    const extractPath = path.join(
      process.cwd(),
      "src",
      "extracted",
      extractFolderName
    );

    console.log(
      "EXTRACT PATH:",
      extractPath
    );

    await fs.ensureDir(extractPath);

    // Extract zip
    await fs
      .createReadStream(zipFilePath)
      .pipe(
        unzipper.Extract({
          path: extractPath,
        })
      )
      .promise();

    console.log(
      "ZIP extracted successfully"
    );

    return extractPath;
  } catch (error) {
    console.log(
      "FULL EXTRACTION ERROR:"
    );

    console.log(error);

    throw new Error(
      "ZIP extraction failed"
    );
  }
};

module.exports = extractZip;