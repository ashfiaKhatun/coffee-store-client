
import { useLoaderData } from 'react-router-dom'
import './App.css'
import CoffeeCard from './components/CoffeeCard';
import { useState } from 'react';

function App() {

  const loadedCoffees = useLoaderData();

  const [coffees, setCoffees] = useState(loadedCoffees);

  return (
    <>

      <h1 className='text-6xl text-purple-600 text-center my-10'>Hot Hot Cold Coffee {coffees.length}</h1>
      <div className='grid md:grid-cols-2 gap-8 m-8'>

        {
          coffees.map(coffee => <CoffeeCard
            key={coffee._id} coffee={coffee}
            coffees={coffees}
            setCoffees={setCoffees}
          ></CoffeeCard>)
        }
      </div>
    </>
  )
}

export default App
