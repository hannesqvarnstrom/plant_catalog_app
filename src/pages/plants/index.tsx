import { useState } from "react";

interface Plant {
  id: string,
  name: string,
  from?: string,
  image?: string,
  // ETC
}

function Plants() {
  const [plants, setPlants] = useState([] as Plant[])

  const fillWithDummyPlants = () => {
    const plantNames = [
      "Kohleria stupifugata",
      "Kohleria monofolia x stupenda",
      "Drosera EatMyA$$",
      "OtherPlant Plantsson",
    ]

    setPlants(plantNames.map(name => {
      return {
        name,
        id: (Math.random() + 1).toString(36).substring(3, 12),
      }
    }))
  }

  return (
    <div>
      PLANTS
      <button onClick={fillWithDummyPlants}>(Fill with dummy plants)</button>
      {
        plants.length ? <ul>
          {
            plants.map((plant, i) => <li key={i}>
              <p>{plant.name}</p>
              <small>(ID: {plant.id})</small>
            </li>)
          }
        </ul> : <p>No plants right now</p>
      }
    </div>)
}

export default Plants;
