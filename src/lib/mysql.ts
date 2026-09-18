import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: process.env.DB_HOST || '127.0.0.1',
  port: parseInt(process.env.DB_PORT || '8889', 10), // Port default MAMP Mac adalah 8889
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'root', // Password default MAMP adalah root
  database: process.env.DB_NAME || 'mochi_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

let isTableInitialized = false;

export async function ensureTableExists() {
  if (isTableInitialized) return;
  try {
    const connection = await pool.getConnection();
    await connection.query(`
      CREATE TABLE IF NOT EXISTS product_ratings (
        id INT AUTO_INCREMENT PRIMARY KEY,
        product_id VARCHAR(100) NOT NULL,
        rating INT NOT NULL,
        reviewer_name VARCHAR(150) DEFAULT 'Pelanggan Jajan Yuk',
        comment TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);
    connection.release();
    isTableInitialized = true;
  } catch (error) {
    console.error('Database initialization note:', error);
  }
}

export default pool;
