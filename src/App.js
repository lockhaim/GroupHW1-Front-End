import {useState, useEffect} from 'react'
import axios from 'axios'

const App = () => {
    const [newCarMake, setNewCarMake] = useState('')
    const [newCarModel, setNewCarModel] = useState('')
    const [newCarImg, setNewCarImg] = useState('')
    const [newCarSold, setNewCarSold] = useState(false)
    const [cars, setCars] = useState([])

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
        ).then(() => {
          axios
            .get('http://localhost:3000/cars')
            .then((response) => {
              setCars(response.data)
            })
        })
        event.currentTarget.reset()
    }

    useEffect(() => {
        axios
            .get('http://localhost:3000/cars')
            .then((response) => {
                setCars(response.data)
            })
    },[])

    const handleCarDelete = (carData) => {
      axios
        .delete(`http://localhost:3000/cars/${carData._id}`)
        .then((response) => {
          axios
            .get('http://localhost:3000/cars')
            .then((response) => {
              setCars(response.data)
          })
        })
    }

  // Toggle handler
//   const showEditForm = (carData) => {
//   axios
//   .put(
//     `http://localhost:3000/cars/${carData._id}`,
//     {
//       make: carData.make,
//       model:  carData.model,
//       img:  carData.img,
//       sold:  carData.sold
//     }
//   ).then((response) => {
//     axios
//       .get('http://localhost:3000/cars')
//       .then((response) => {
//         setCars(response.data)
//       })
//   })
// }

// Button to reveal the EDIT Form
const showEditForm = (item) => {
  let showForm = document.getElementById("show-edit-car")
  if (getComputedStyle(showForm, null).display === "none") {
      showForm.style.display = "block";
    } else {
      showForm.style.display = "none";
    }
}

// Update/Edit handler
const handleUpdateCar = (carData, event) => {
    axios.put(
        `http://localhost:3000/cars/${carData._id}`,
        {
          make:newCarMake,
          model:newCarModel,
          img:newCarImg,
          sold:newCarSold
        }
    ).then(() => {
      axios
        .get('http://localhost:3000/cars')
        .then((response) => {
          setCars(response.data)
        })
    })
    // event.currentTarget.reset()
}


    return (
        <div>
            <h1>Cars Index</h1>
            <section>
                <h2>Add New Car</h2>
                <form onSubmit={handleNewCarFormSubmit}>
                  Make: <input type='text' onChange={handleNewMakeChange}/><br/>
                  Model: <input type='text' onChange={handleNewModelChange}/><br/>
                  Image: <input type='text' onChange={handleNewImgChange}/><br/>
                  <input type='checkbox' onChange={handleNewSoldChange} hidden/>
                  <input type='submit' value='Add New Car'/>
                </form>
            </section>

            <section>
                <h2>Cars</h2>
                <div className="car-container">
                {
                  cars.map((car)=>{
                    return <div className="car-display">
                      <h4>Make: {car.make}</h4>
                      <h4>Model: {car.model}</h4>
                      <img src={car.img} alt=""/>
                      {
                        (car.sold)?
                          <h6 className="sold-out">Sold Out</h6>
                          :
                          <button onClick={() => {
                            handleCarDelete(car)
                          }}>Buy Car</button>
                      }<br/>

                      <button onClick={showEditForm}>Edit</button>

                      <div id="show-edit-car">
                          <h3>Edit Car</h3>
                          <form onSubmit={event => {
                            event.preventDefault()
                            handleUpdateCar(car, event)}}>
                            Make: <input type='text' onChange={handleNewMakeChange}/><br/>
                            Model: <input type='text' onChange={handleNewModelChange}/><br/>
                            Image: <input type='text' onChange={handleNewImgChange}/><br/>
                            Sold Out? <input type='checkbox' onChange={handleNewSoldChange}/>
                            <input type='submit' value="Confirm Edit"/>
                          </form>
                      </div>

                    </div>
                  })
                }
                </div>
            </section>
        </div>
    )
}

export default App;
