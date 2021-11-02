import logo from './logo.svg';
import './App.css';
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
                    Make: <input type='text' onChange={handleNewMakeChange}></input><br/>
                    Model: <input type='text' onChange={handleNewModelChange}></input><br/>
                    Image: <input type='text' onChange={handleNewImgChange}></input><br/>
                    Sold: <input type='checkbox' onChange={handleNewSoldChange}></input><br/>
                    <input type='submit' value='Submit'></input>
                </form>
            </section>
            <section>
                <h2>Cars</h2>
                {
                    cars.map((car)=>{
                        return <div>
                            <h4>{
                                car.make
                            }</h4>

                        </div>
                    })
                }
            </section>
        </div>
    )
}

export default App;
