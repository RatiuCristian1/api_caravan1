import React from "react"
import { getVans } from "./api"


function App() {

  const [vans, setVans] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState(null)

  React.useEffect(() => {
    async function loadVans() {
        setLoading(true)
        try {
            const data = await getVans()
            setVans(data)
        } catch (err) {
            setError(err)
        } finally {
            setLoading(false)
        }
    }

    loadVans()
}, [])


const vanElements = vans.map(van => (
  <div key={van.id} className="van-tile">
      
          <img src={van.imageUrl} />
          <div className="van-info">
              <h3>{van.name}</h3>

          </div>
  </div>
))

 return (
  <div className="van-list">
      {vanElements}
  </div>
 )
}

export default App
