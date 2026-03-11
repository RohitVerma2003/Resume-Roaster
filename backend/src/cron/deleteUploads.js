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

        if (fileAge > 5 * 60 * 1000) {
          fs.unlink(filePath);
          console.log("Deleted:", file);
        }
      } catch (error) {
        console.log("Error processing file:", file, err);
      }

    }
  });
});