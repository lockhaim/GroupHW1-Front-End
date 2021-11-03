import {useState, useEffect} from 'react'
import axios from 'axios'

const App = () => {
    const [cars, setCars] = useState([])
    const [newCarMake, setNewCarMake] = useState('')
    const [newCarModel, setNewCarModel] = useState('')
    const [newCarImg, setNewCarImg] = useState('')
    const [newCarSold, setNewCarSold] = useState(false)

    //handlers
    const handleNewMakeChange = (event) => {
        setNewCarMake(event.target.value);
    }
    const handleNewModelChange = (event) => {
        setNewCarModel(event.target.value);
    }
    const handleNewImgChange = (event) => {
        setNewCarImg(event.target.value);
    }
    const handleNewSoldChange = (event) => {
        setNewCarSold(event.target.checked);
    }
    const handleNewCarFormSubmit = (event) => {
        event.preventDefault()
        axios.post(
            'http://localhost:3000/cars',
            {
                make:newCarMake,
                model:newCarModel,
                img:newCarImg,
                sold:newCarSold
            }
        )
    }

    useEffect(() => {
        axios
            .get('http://localhost:3000/cars')
            .then((response) => {
                setCars(response.data)
            })
    },[])

    return (
        <div>
            <h1>Cars Index</h1>
            <section>
                <h2>Add New Car</h2>
                <form onSubmit={handleNewCarFormSubmit}>
                    Make: <input type='text' onChange={handleNewMakeChange}/><br/>
                    Model: <input type='text' onChange={handleNewModelChange}/><br/>
                    Image: <input type='text' onChange={handleNewImgChange}/><br/>
                    Sold: <input type='checkbox' onChange={handleNewSoldChange}/><br/>
                    <input type='submit' value='Add New Car'/>
                </form>
            </section>
            <section>
                <h2>Cars</h2>
                <div className="car-container">
                {
                    cars.map((car)=>{
                      return <div className="car-display">
                        <h4>{car.make}</h4>
                        <h4>{car.model}</h4>
                        <img src={car.img} alt=""/>
                      </div>
                    })
                }
                </div>
            </section>
        </div>
    )
}

export default App;
