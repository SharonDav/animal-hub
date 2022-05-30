  // SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;
 


interface IERC20Token {
   function transfer(address, uint256) external returns (bool);

    function approve(address, uint256) external returns (bool);

    function transferFrom(
        address,
        address,
        uint256
    ) external returns (bool);

    function totalSupply() external view returns (uint256);

    function balanceOf(address) external view returns (uint256);

    function allowance(address, address) external view returns (uint256);

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(
        address indexed owner,
        address indexed spender,
        uint256 value
    );
}

 
 contract  AnimalHouse {
    
    
    uint internal animalsLength = 0;
    address internal cUsdTokenAddress =   0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1;

    struct  Animal {
        address payable owner;
        string image;
        string name;
        string breed;
        string age;
         uint price;
         
      
    }
       mapping (uint =>  Animal) internal animals;

       
     function addAnimal (
        string memory _image,
        string memory _name,
        string memory _breed,
         string memory _age,
        uint _price

          ) public {
       Animal storage animalhub = animals[animalsLength];

        animalhub.owner = payable(msg.sender);
           animalhub.image = _image;
            animalhub.name = _name;
            animalhub.breed = _breed;
           animalhub.age = _age;
           animalhub.price = _price;

          
        animalsLength++;
          }
         
         
      function buyAnimal(uint _index) public payable  {
        require(
          IERC20Token(cUsdTokenAddress).transferFrom(
            msg.sender,
            animals[_index].owner,
            animals[_index].price
          ),
          "Transfer failed."
        );

         animals[_index].owner = payable(msg.sender);
         
    }

    
     function getAnimal(uint _index) public view returns (
        address payable,
        string memory,  
        string memory,  
        string memory,
        string memory,
        uint
        
      
    ) {

      return (  
            animals[_index].owner,
            animals[_index].image,
             animals[_index].name,
            animals[_index].breed,
            animals[_index].age,
            animals[_index].price

                          
        );
    }
    

    function UpdateAge(uint _index, string memory _age) public {
        require(msg.sender == animals[_index].owner, "Only creator can perform this operation");
        animals[_index].age = _age;
    }

    function AddNewPrice(uint _index, uint _price) public {
        require(msg.sender == animals[_index].owner, "Only creator can perform this operation");
        animals[_index].price = _price;

    }
 function getanimalsLength() public view returns (uint) {
        return (animalsLength);
    }
}
