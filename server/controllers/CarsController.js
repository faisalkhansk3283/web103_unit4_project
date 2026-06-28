import { pool } from '../config/database.js'

const getAllCars = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM cars ORDER BY created_at DESC')
    res.json(result.rows)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const getCarById = async (req, res) => {
  try {
    const { id } = req.params
    const result = await pool.query('SELECT * FROM cars WHERE id = $1', [id])
    res.json(result.rows[0])
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const createCar = async (req, res) => {
  try {
    const { name, exterior_color, wheel_style, interior, engine, roof, total_price } = req.body
    const result = await pool.query(
      `INSERT INTO cars (name, exterior_color, wheel_style, interior, engine, roof, total_price)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [name, exterior_color, wheel_style, interior, engine, roof, total_price]
    )
    res.status(201).json(result.rows[0])
  } catch (err) {
    res.status(409).json({ error: err.message })
  }
}

const updateCar = async (req, res) => {
  try {
    const { id } = req.params
    const { name, exterior_color, wheel_style, interior, engine, roof, total_price } = req.body
    const result = await pool.query(
      `UPDATE cars SET name=$1, exterior_color=$2, wheel_style=$3, interior=$4, engine=$5, roof=$6, total_price=$7
       WHERE id=$8 RETURNING *`,
      [name, exterior_color, wheel_style, interior, engine, roof, total_price, id]
    )
    res.status(200).json(result.rows[0])
  } catch (err) {
    res.status(409).json({ error: err.message })
  }
}

const deleteCar = async (req, res) => {
  try {
    const { id } = req.params
    await pool.query('DELETE FROM cars WHERE id = $1', [id])
    res.status(200).json({ message: 'Car deleted successfully' })
  } catch (err) {
    res.status(409).json({ error: err.message })
  }
}

export { getAllCars, getCarById, createCar, updateCar, deleteCar }
