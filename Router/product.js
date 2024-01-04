const express = require("express");
const router = express.Router();
const Destination = require("../models/TravelModel")


const {
    GetAllProducts,
     GetAllProductsTesting } = 
    require("../controllers/product")

router.route("/").get(GetAllProducts);
router.route("/Testing").get(GetAllProductsTesting)


async function createTravelDestination(destinationData) {
    try {
      const newDestination = await Destination.create(destinationData);
      console.log('New destination created:', newDestination);
      return newDestination;
    } catch (error) {
      console.error('Error creating destination:', error);
      throw error;
    }
  }
  
  
  router.post('/destination', async (req, res) => {
    try {
      const savedDestination = await createTravelDestination(req.body);
      res.status(201).json({ message: 'Destination added', destination : savedDestination });
    } catch (error) {
      console.log({ error })
      res.status(500).json({ error: 'Failed to add destination' });
    }
  });


  
  async function readDestinationByName(destinationName){
    try {
      const findname  = await Destination.findOne({name : destinationName})
      return(findname)
    } catch (error) {
      console.log(error)
    }
    
    }
    
    router.get("/destination/:name" , async (req,res) => {
      try {
        const destination = await readDestinationByName(req.params.name)
        res.status(201).json({destination : destination})
      } catch (error) {
        res.status(404).json({error: "error not found"})
      }
    })


    async function readAllDestination(){
        try {
          const findname  = await Destination.find({})
          return(findname)
        } catch (error) {
          console.log(error)
        }
        
        }
        
        router.get("/read" , async (req,res) => {
          try {
            const destination = await readAllDestination(req.params.read)
            res.status(201).json({destination : destination})
          } catch (error) {
            res.status(404).json({error: "error not found"})
          }
        })
      

        
      async function readDestinationByLocation(travelDestination){
        try {
          const findLocation  = await Destination.find({ location : travelDestination})
          return(findLocation)
        } catch (error) {
          console.log(error)
        }
        
        }
        
        router.get("/location/:locationName" , async (req,res) => {
          try {
            const destination = await readDestinationByLocation(req.params.locationName)
            console.log(destination)
            res.status(201).json({destination : destination})
          } catch (error) {
            res.status(404).json({error: "error not found"})
          }
        })


        async function readDestinationByLocation(travelDestination){
            try {
              const findLocation  = await Destination.find({ rating : travelDestination})
              return(findLocation)
            } catch (error) {
              console.log(error)
            }
            
            }
            
            router.get("/rating/:rating" , async (req,res) => {
              try {
                const destination = await readDestinationByLocation(req.params.rating)
                console.log(destination)
                res.status(201).json({destination : destination})
              } catch (error) {
                res.status(404).json({error: "error not found"})
              }
            })


            

async function updateDestination(destinationId, updatedData) {
    try {
      const updatedDestination = await Destination.findByIdAndUpdate(destinationId, updatedData, { new: true });
      return updatedDestination;
    } catch (error) {
      throw error;
    }
  }
  
  router.post('/update/:destinationId', async (req, res) => {
    try {
      const updatedDestination = await updateDestination(req.params.destinationId, req.body);
      if (updatedDestination) {
        res.json(updatedDestination);
      } else {
        res.status(404).json({ error: 'Destination not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to update destination' });
    }
  });
    


  async function updateDataById(movieId){
    try {
      const updateDestination = await Destination.findByIdAndDelete(movieId)
      return updateDestination
    } catch (error) {
      throw error
    }
    }
    
    router.delete("/delete/:destinationId" , async (req,res) => {
      try {
        const updateDestinationData = await updateDataById(req.params.destinationId)
        res.json(updateDestinationData)
      } catch (error) {
        res.status(404).json({error:"error hai"})
      }
    
    })


   
module.exports = router;