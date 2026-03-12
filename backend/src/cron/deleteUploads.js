import cron from "node-cron";
import fs from "fs";
import path from "path";

const uploadsPath = path.resolve("uploads");

cron.schedule("* * * * *", () => {
  console.log("Running cron job: Cleaning uploads folder");

  fs.readdir(uploadsPath, (err, files) => {
    if (err) {
      console.log("Error reading uploads folder:", err);
      return;
    }

    for (const file of files) {
      const filePath = path.join(uploadsPath, file);

      try {
        const stats = fs.statSync(filePath);

        const fileAge = Date.now() - stats.mtimeMs;

        // delete files older than 1 minute
        if (fileAge > 1 * 60 * 1000) {
          fs.unlinkSync(filePath);
          console.log("Deleted:", file);
        }

      } catch (error) {
        console.log("Error processing file:", file, error);
      }
    }
  });
});