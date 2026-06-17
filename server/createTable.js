const pool = require("./db");

(async () => {
    try {
        await pool.query(`
INSERT INTO users (
    name,
    info,
    email,
    password_hash,
    last_login_time,
    last_activity_time,
    status,
    is_blocked,
    verification_token
) VALUES

(
    'Alice Johnson',
    'Frontend developer specializing in React applications.',
    'alice.johnson@example.com',
    '$2b$10$8K1p/a0dA2zv5S8v1XoWLe0v2l4F6W8TQ2J1I7v2Xl9o1aJgD8n5a',
    '2026-06-12 14:32:00',
    '2026-06-12 18:45:00',
    'active',
    0,
    NULL
),

(
    'Bob Smith',
    'Backend engineer working with Node.js and MySQL.',
    'bob.smith@example.com',
    '$2b$10$8K1p/a0dA2zv5S8v1XoWLe0v2l4F6W8TQ2J1I7v2Xl9o1aJgD8n5a',
    '2026-06-10 09:15:00',
    '2026-06-11 16:20:00',
    'active',
    0,
    NULL
),

(
    'Carol Davis',
    NULL,
    'carol.davis@example.com',
    '$2b$10$8K1p/a0dA2zv5S8v1XoWLe0v2l4F6W8TQ2J1I7v2Xl9o1aJgD8n5a',
    '2026-05-28 11:00:00',
    '2026-05-28 11:30:00',
    'unverified',
    0,
    'verify-token-carol'
),

(
    'David Lee',
    'Account temporarily blocked due to multiple failed login attempts.',
    'david.lee@example.com',
    '$2b$10$8K1p/a0dA2zv5S8v1XoWLe0v2l4F6W8TQ2J1I7v2Xl9o1aJgD8n5a',
    '2026-06-08 13:45:00',
    '2026-06-09 10:10:00',
    'active',
    1,
    NULL
),

(
    'Eva Martinez',
    'UI/UX designer and accessibility advocate.',
    'eva.martinez@example.com',
    '$2b$10$8K1p/a0dA2zv5S8v1XoWLe0v2l4F6W8TQ2J1I7v2Xl9o1aJgD8n5a',
    '2026-06-11 16:20:00',
    '2026-06-12 19:05:00',
    'active',
    0,
    NULL
),

(
    'Frank Wilson',
    NULL,
    'frank.wilson@example.com',
    '$2b$10$8K1p/a0dA2zv5S8v1XoWLe0v2l4F6W8TQ2J1I7v2Xl9o1aJgD8n5a',
    '2026-01-01 00:00:00',
    '2026-01-01 00:00:00',
    'unverified',
    0,
    'verify-token-frank'
),

(
    'Grace Brown',
    'Former moderator account.',
    'grace.brown@example.com',
    '$2b$10$8K1p/a0dA2zv5S8v1XoWLe0v2l4F6W8TQ2J1I7v2Xl9o1aJgD8n5a',
    '2026-06-05 08:30:00',
    '2026-06-05 09:00:00',
    'active',
    1,
    NULL
),

(
    'Henry Clark',
    'Project manager coordinating cross-functional teams.',
    'henry.clark@example.com',
    '$2b$10$8K1p/a0dA2zv5S8v1XoWLe0v2l4F6W8TQ2J1I7v2Xl9o1aJgD8n5a',
    '2026-06-14 12:15:00',
    '2026-06-15 08:45:00',
    'active',
    0,
    NULL
),

(
    'Isabella Moore',
    'QA engineer focused on automated testing.',
    'isabella.moore@example.com',
    '$2b$10$8K1p/a0dA2zv5S8v1XoWLe0v2l4F6W8TQ2J1I7v2Xl9o1aJgD8n5a',
    '2026-06-13 17:20:00',
    '2026-06-14 09:10:00',
    'active',
    0,
    NULL
),

(
    'Jack Taylor',
    NULL,
    'jack.taylor@example.com',
    '$2b$10$8K1p/a0dA2zv5S8v1XoWLe0v2l4F6W8TQ2J1I7v2Xl9o1aJgD8n5a',
    '2026-04-22 10:00:00',
    '2026-04-22 10:30:00',
    'unverified',
    0,
    'verify-token-jack'
);
        `);

        console.log("Users table created");

        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
})();