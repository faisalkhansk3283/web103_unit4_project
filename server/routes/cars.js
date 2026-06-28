import express from 'express'
import { getAllCars, getCarById, createCar, updateCar, deleteCar } from '../controllers/CarsController.js'

const router = express.Router()

router.get('/', getAllCars)
router.get('/:id', getCarById)
router.post('/', createCar)
router.patch('/:id', updateCar)
router.delete('/:id', deleteCar)

export default router