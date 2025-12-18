import { rm } from "fs/promises";
import { join } from "path";
import dotenv from "dotenv";

dotenv.config({ path: '.env.test' });

global.beforeEach(async () => {
    try {
        await rm(join(__dirname, '..', process.env.DB_NAME || 'db_test.sqlite'), { force: true });
    } catch (error) {
        console.log("🔥 --- error:", error)
    }
})