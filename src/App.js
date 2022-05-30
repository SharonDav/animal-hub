import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
import { useState, useEffect, useCallback } from "react";




import Web3 from "web3";
import { newKitFromWeb3 } from "@celo/contractkit";
import BigNumber from "bignumber.js";
import IERC from "./contract/IERC.abi.json";
import AnimalHub from  './contract/AnimalHub.abi.json';
import Animals from './components/Animals';
import NewAnimal from './components/NewAnimal';


const ERC20_DECIMALS = 18;


const contractAddress = "0x95dF9dcC96EFBbD517A414F2aBdE079321016cE8";
const cUSDContractAddress = "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1";




function App() {

  const [contract, setcontract] = useState(null);
  const [address, setAddress] = useState(null);
  const [kit, setKit] = useState(null);
  const [cUSDBalance, setcUSDBalance] = useState(0);
  const [animals, setAnimals] = useState([]);

  const connectToWallet = async () => {
    if (window.celo) {
      try {
        await window.celo.enable();
        const web3 = new Web3(window.celo);
        let kit = newKitFromWeb3(web3);

        const accounts = await kit.web3.eth.getAccounts();
        const user_address = accounts[0];

        kit.defaultAccount = user_address;

        await setAddress(user_address);
        await setKit(kit);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Error Occurred");
      
     }
   };
 
   const getBalance = (async () => {
     try {
       const balance = await kit.getTotalBalance(address);
       const USDBalance = balance.cUSD.shiftedBy(-ERC20_DECIMALS).toFixed(2);
       const contract = new kit.web3.eth.Contract(AnimalHub, contractAddress);
       setcontract(contract);
       setcUSDBalance(USDBalance);
     } catch (error) {
       console.log(error);
     }
   });

   
   useEffect(() => {
    connectToWallet();
  }, []);

  useEffect(() => {
    if (kit && address) {
      getBalance();
     
    }
  }, [kit, address]);

  useEffect(() => {
    if (contract) {
      getAnimal();
    }
  }, [contract]);  


  const UpdateAnimalAge = async (_index, _newAge) => {
    console.log(_index);
    try {
      await contract.methods.UpdateAge(_index, _newAge).send({ from: address });
      getAnimal();
      getBalance();
    } catch (error) {
     console.log(error);
     alert("The Animal Age has been updated")
    }};

   

 
   
   const getAnimal = (async () => {
     const animalsLength = await contract.methods.getanimalsLength().call();
     const _pett = []
     for (let index = 0; index < animalsLength; index++) {
       console.log(animalsLength);
       let _animals = new Promise(async (resolve, reject) => {
       let animal = await contract.methods.getAnimal(index).call();

       resolve({
        index: index,
        owner: animal[0],
        image: animal[1],
        name: animal[2],
        breed: animal[3],
        age: animal[4],
       price: animal[5]

                 
      });
    });
    _pett.push(_animals);
  }
  const animals = await Promise.all(_pett);
  setAnimals(animals);
  console.log(animals)
});

const addAnimal = async (
  _image,
  _name,
  _breed,
  _age,
  price
) => {

  const _price = new BigNumber(price).shiftedBy(ERC20_DECIMALS).toString();
    try {
      await contract.methods
        .addAnimal(_image, _name, _breed, _age, _price)
        .send({ from: address });
       getAnimal();
    } catch (error) {
      console.log(error);
    }
  };

  const buyAnimal = async (_index,) => {
    try {
      const cUSDContract = new kit.web3.eth.Contract(IERC, cUSDContractAddress);
    
      
      await cUSDContract.methods
        .approve(contractAddress, animals[_index].price)
        .send({ from: address });
      await contract.methods.buyAnimal(_index).send({ from: address });
      getAnimal();
      getBalance();
    } catch (error) {
      console.log(error)
    }};

  

  return (
    <div>
      <Navbar balance = {cUSDBalance} />
      <Animals animals ={animals}
      buyAnimal = {buyAnimal}
      UpdateAnimalAge = {UpdateAnimalAge}
      
       
      />
       <NewAnimal addAnimal = {addAnimal}
       
/>
    </div>
    )
  }

export  default App;
