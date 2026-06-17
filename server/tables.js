const pool = require("./db");

(async () => {
    try {
        const [rows] = await pool.query("SHOW TABLES");

        console.log(rows);

        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
})();