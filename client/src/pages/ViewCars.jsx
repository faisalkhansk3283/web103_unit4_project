import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllCars, deleteCar } from '../services/CarsAPI'
import '../App.css'

const ViewCars = () => {
  const [cars, setCars] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    // fetch all cars and setCars
    const fetchCars = async () => {
      const carsData = await getAllCars()
      setCars(carsData)
    }
    fetchCars()
  }, [])

  const handleDelete = async (id) => {
    // call deleteCar(id) then refetch all cars
    await deleteCar(id)
    const carsData = await getAllCars()
    setCars(carsData)   
  }

  return (
    <div className='view-cars'>
      <h2>Custom Cars</h2>
      {cars.map(car => (
        <div key={car.id} className='car-card'>
          <h3>{car.name}</h3>
          <p>Exterior: {car.exterior_color}</p>
          <p>Wheels: {car.wheel_style}</p>
          <p>Interior: {car.interior}</p>
          <p>Engine: {car.engine}</p>
          <p>Price: ${car.total_price}</p>

          <button onClick={() => navigate(`/customcars/${car.id}`)}>View</button>
          <button onClick={() => navigate(`/edit/${car.id}`)}>Edit</button>
          <button onClick={() => handleDelete(car.id)}>Delete</button>
        </div>
      ))}
    </div>
  )
}

export default ViewCars