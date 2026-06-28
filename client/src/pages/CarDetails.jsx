import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getCarById, deleteCar } from '../services/CarsAPI'
import '../App.css'

const CarDetails = () => {
  const { id } = useParams()
  const [car, setCar] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    // fetch car by id and setCar
    const fetchCar = async () => {
      const carData = await getCarById(id)
      setCar(carData)
    }
    fetchCar()
  }, [id])

  const handleDelete = async () => {
    // delete the car then navigate back to /customcars
    await deleteCar(id)
    navigate('/customcars')
  }

  return (
    <div>
      {car && (
        <div>
          <h2>{car.name}</h2>
          <p>Exterior: {car.exterior_color}</p>
          <p>Wheels: {car.wheel_style}</p>
          <p>Interior: {car.interior}</p>
          <p>Engine: {car.engine}</p>
          <p>Total Price: ${car.total_price}</p>

          <button onClick={() => navigate(`/edit/${id}`)}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
    </div>
  )
}

export default CarDetails