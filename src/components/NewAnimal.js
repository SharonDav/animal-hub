import React from 'react'

import { useState } from "react";


const NewAnimal = (props) => {

    


 const [image, setImage] = useState('');
 const [name, setName] = useState('');
 const [breed, setBreed] = useState('');
 const [age, setAge] = useState('');
 const [price, setPrice] = useState('');

 const submitHandler = (e) => {
    e.preventDefault();

 if(!image || !name || !breed || !age || !price  ) {
    alert('Please fill up the form')
    return

}
props.addAnimal(image, name, breed, age, price);

setImage('')
setName('')
setBreed('')
setAge('')
setPrice('')
};

return ( 
   <body>
   <div className="container"> 
      <div className='text center mt-5'>
      <form  onSubmit={submitHandler}>
  <div class="form-group">
    <label for="name">input Image url</label>
    <input type="text" class="form-control" id="Enter image" value={image}  onChange={(e) => setImage(e.target.value)}
 placeholder="Enter Image url"/>
    
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Enter Animal Name</label>
    <input type="text" class="form-control" id="input name" placeholder="Name of Animal" value={name}  onChange={(e) => setName(e.target.value)}
/>
      </div>
      <div class="form-group">
    <label for="exampleInputPassword1">Enter Animal Breed</label>
    <input type="text" class="form-control" id="exampleInputPassword1" placeholder="Enter Animal Breed" value={breed}  onChange={(e) => setBreed(e.target.value)}
/>
    </div>

    <div class="form-group">
    <label for="exampleInputPassword1">Enter Animal Age</label>
    <input type="text" class="form-control" id="exampleInputPassword1" placeholder="Enter Animal Age" value={age}  onChange={(e) => setAge(e.target.value)}
/>
    </div>

    <div class="form-group">
    <label for="exampleInputPassword1">Enter Animal Price</label>
    <input type="text" class="form-control" id="exampleInputPassword1" placeholder="Enter Animal Price" value={price}  onChange={(e) => setPrice(e.target.value)}
/>
    </div>

    <button type="submit" class="btn btn-outline-dark">Add Animal</button>
      </form>
      </div>
      </div>
   </body>
)
}
   
   
   export default NewAnimal;
   
  