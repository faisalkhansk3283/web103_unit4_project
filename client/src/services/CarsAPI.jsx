const getAllCars = async () => {
  const response = await fetch('/api/cars')
  const data = await response.json()
  return data
}

const getCarById = async (id) => {
  const response = await fetch(`/api/cars/${id}`)
  const data = await response.json()
  return data
}

const createCar = async (car) => {
  const response = await fetch('/api/cars', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(car)
  })
  const data = await response.json()
  return data
}

const updateCar = async (id, car) => {
  const response = await fetch(`/api/cars/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(car)
  })
  const data = await response.json()
  return data
}

const deleteCar = async (id) => {
  const response = await fetch(`/api/cars/${id}`, {
    method: 'DELETE'
  })
  const data = await response.json()
  return data
}

export { getAllCars, getCarById, createCar, updateCar, deleteCar }