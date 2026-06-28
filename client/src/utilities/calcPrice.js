const prices = {
  exterior_color: { Red: 5000, Blue: 5500, Black: 6000, White: 4500, Yellow: 7000 },
  wheel_style:    { Sport: 3000, Classic: 2000, 'Off-road': 4000, Luxury: 5000 },
  interior:       { Leather: 8000, Fabric: 3000, 'Carbon Fiber': 12000 },
  engine:         { V4: 15000, V6: 22000, V8: 35000, Electric: 45000 },
  roof:           { Hardtop: 3000, Sunroof: 6000, Convertible: 9000 }
}

const BASE_PRICE = 20000

export const getOptionPrice = (feature, option) => {
  return prices[feature]?.[option] || 0
}

export const calcTotalPrice = (car) => {
  let total = BASE_PRICE
  total += getOptionPrice('exterior_color', car.exterior_color)
  total += getOptionPrice('wheel_style', car.wheel_style)
  total += getOptionPrice('interior', car.interior)
  total += getOptionPrice('engine', car.engine)
  total += getOptionPrice('roof', car.roof)
  return total
}
