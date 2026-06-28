import dotenv from 'dotenv'
dotenv.config()
import { pool } from './database.js'

const createTables = async () => {
  await pool.query(`DROP TABLE IF EXISTS cars`)

  await pool.query(`
    CREATE TABLE cars (
      id             SERIAL PRIMARY KEY,
      name           VARCHAR(100) NOT NULL,
      exterior_color VARCHAR(50)  NOT NULL,
      wheel_style    VARCHAR(50)  NOT NULL,
      interior       VARCHAR(50)  NOT NULL,
      engine         VARCHAR(50)  NOT NULL,
      roof           VARCHAR(50)  NOT NULL,
      total_price    DECIMAL(10,2) NOT NULL,
      created_at     TIMESTAMP DEFAULT NOW()
    )
  `)

  await pool.query(`
    INSERT INTO cars (name, exterior_color, wheel_style, interior, engine, roof, total_price) VALUES
      ('Red Rocket',   'Red',   'Sport',   'Leather',      'V8',      'Hardtop',     75000.00),
      ('Silent Storm', 'Black', 'Luxury',  'Carbon Fiber', 'Electric','Sunroof',     95000.00),
      ('Blue Cruiser', 'Blue',  'Classic', 'Fabric',       'V6',      'Hardtop',     55000.00)
  `)

  console.log('✅ Cars table created and seeded!')
  pool.end()
}

createTables()