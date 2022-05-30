import React from 'react';
import { useState } from 'react';

const Animals = (props) => {
  const [newAge, setnewAge] = useState('');
  const [newPrice, setnewPrice] =useState('');
  const submitHandler = (e) => {
    e.preventDefault();}

  return (

    
     <body>
       <section class="container">
         <div class="row">
         
         {props.animals.map((pet) => (
          
           <div class="col-4"  key={pet.index}>
             <div class="shadow
             d-flex
             justify-content-center
             align-items-center p-3 bg-dark rounded-lg
             flex-column
             ">
               <div class="img">
               <img class="img-fluid rounded-circle" src={pet.image} alt=" img top"/>
               </div>
               <div class="Animal-name my-2">
                 <h3 class="text-white"> 
                 Pet Name : {pet.name}
                 </h3>

               </div>
               <div class="Animal-breed">
                 <h6 class="text-white"> Pet Breed :
                   {pet.breed}
                 </h6>

               </div>
               <div class="Animal-age
               ">
                 <h6 class="text-white"> Pet Age :
                   {pet.age}
                 </h6>

               </div>
               <div class="animal-price">
               <h6 class="text-white"> Pet Price :
                   {pet.price / 1000000000000000000} cUSD
                 </h6>
               </div>

               <div><button type="button" class="btn tip btn-outline-primary" onClick={() => props.buyAnimal(pet.index)}>Buy Pet</button>
               </div>
               <div><input class="form-control form-control-lg"  onChange={(e) => setnewAge(e.target.value)} type="text" placeholder="Update Pet Age"></input>
               <button class="btn btn-primary mb-2"  onClick={() => props.UpdateAnimalAge(pet.index, newAge)}>Update Age</button>
               </div>
                
               


             </div>

           </div>
           
         ))};
         </div>

       </section>

     </body>
  );
}
export default Animals;