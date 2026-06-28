import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createCar } from '../services/CarsAPI'
import { calcTotalPrice } from '../utilities/calcPrice'
import '../App.css'

const colorMap = {
  Red: '#e74c3c',
  Blue: '#3498db',
  Black: '#2c3e50',
  White: '#ecf0f1',
  Yellow: '#f1c40f'
}

const CreateCar = () => {
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [car, setCar] = useState({
    name: '',
    exterior_color: 'Red',
    wheel_style: 'Sport',
    interior: 'Leather',
    engine: 'V4',
    roof: 'Hardtop',
    total_price: 0
  })

  const handleChange = (e) => {
    const updated = { ...car, [e.target.name]: e.target.value }
    updated.total_price = calcTotalPrice(updated)
    setCar(updated)
    setError(validate(updated) || '')
  }

  const validate = (car) => {
    if (!car.name.trim()) {
      return 'Please give your car a name'
    }
    // Convertible roof cannot be combined with Off-road wheels
    if (car.roof === 'Convertible' && car.wheel_style === 'Off-road') {
      return 'A Convertible roof cannot be combined with Off-road wheels'
    }
    // Electric engine cannot have Carbon Fiber interior (weight/heat issues)
    if (car.engine === 'Electric' && car.interior === 'Carbon Fiber') {
      return 'Electric engine cannot be paired with Carbon Fiber interior'
    }
    return null
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const err = validate(car)
    if (err) {
      setError(err)
      return
    }
    setError('')
    await createCar(car)
    navigate('/customcars')
  }

  return (
    <div className='create-car'>
      <h2>Customize Your Car</h2>
      <p>Total Price: ${calcTotalPrice(car).toLocaleString()}</p>

      {/* Visual car preview — color changes with selection */}
      <div style={{
        width: '200px',
        height: '100px',
        backgroundColor: colorMap[car.exterior_color],
        borderRadius: '20px 20px 10px 10px',
        margin: '20px auto',
        border: '3px solid white',
        transition: 'background-color 0.3s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <p style={{ color: car.exterior_color === 'White' ? 'black' : 'white', margin: 0 }}>
          {car.exterior_color} · {car.roof}
        </p>
      </div>

      {error && (
        <div style={{
          position: 'fixed',
          bottom: '30px',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: '#c0392b',
          color: 'white',
          padding: '12px 24px',
          borderRadius: '8px',
          fontWeight: 'bold',
          zIndex: 1000,
          boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
          whiteSpace: 'nowrap'
        }}>
          ⚠️ {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <label>Car Name
          <input name='name' value={car.name} onChange={handleChange} placeholder='e.g. My Dream Car' />
        </label>

        {/* Color swatches */}
        <label>Exterior Color</label>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
          {Object.entries(colorMap).map(([color, hex]) => (
            <div
              key={color}
              onClick={() => handleChange({ target: { name: 'exterior_color', value: color } })}
              title={color}
              style={{
                width: '40px',
                height: '40px',
                backgroundColor: hex,
                borderRadius: '50%',
                cursor: 'pointer',
                border: car.exterior_color === color ? '3px solid white' : '3px solid transparent',
                transition: 'border 0.2s ease'
              }}
            />
          ))}
        </div>

        <label>Wheel Style
          <select name='wheel_style' value={car.wheel_style} onChange={handleChange}>
            <option>Sport</option>
            <option>Classic</option>
            <option>Off-road</option>
            <option>Luxury</option>
          </select>
        </label>

        <label>Interior
          <select name='interior' value={car.interior} onChange={handleChange}>
            <option>Leather</option>
            <option>Fabric</option>
            {/* disabled when Off-road wheels selected */}
            <option disabled={car.engine === 'Electric'}>Carbon Fiber</option>
          </select>
        </label>

        <label>Engine
          <select name='engine' value={car.engine} onChange={handleChange}>
            <option>V4</option>
            <option>V6</option>
            <option>V8</option>
            <option>Electric</option>
          </select>
        </label>

        <label>Roof
          <select name='roof' value={car.roof} onChange={handleChange}>
            <option>Hardtop</option>
            <option>Sunroof</option>
            <option disabled={car.wheel_style === 'Off-road'}>Convertible</option>
          </select>
        </label>

        <button type='submit'>Save Car</button>
      </form>
    </div>
  )
}

export default CreateCar
