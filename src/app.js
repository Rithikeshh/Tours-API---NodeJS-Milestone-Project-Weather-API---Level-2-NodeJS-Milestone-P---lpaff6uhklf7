const fs = require('fs');
const express = require('express');
const app = express();

//Middleware
app.use(express.json());

const tourDetails = JSON.parse(fs.readFileSync(`${__dirname}/data/tours.json`));
app.get('/tours', (req, res) => {
  //write a code here to get all the tours from tours.json
  // res.status(200).json({
  //   "message": "Success",
  //   "data": [...tourDetails]
  // })
  res.status(200).json(
    
    [...tourDetails]
  )
});

app.post('/tours', (req, res) => {
  const { name, description, duration, price } = req.body;
  //Write a code here for creating new tour from data/tours.json
  //For creating new id use this logic
  if(name && description && duration && price){
    const id = tourDetails.length > 0 ? tourDetails[tourDetails.length - 1].id + 1 : 1;
    tourDetails.push({id, ...req.body})
    fs.writeFile(
      `${__dirname}/data/tours.json`,
      JSON.stringify(tourDetails),
      (err)=>{
        res.status(200).json({
          "message": "Tour added successfully"
        })
      }
    )
  }
  else{
    res.status(400).send({error:"insufficient data"})
  }
});

app.put('/tours/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updatedTour = req.body;

  //write a code here for updating a tour
  const searchTour = tourDetails.find((tour)=>{
    return tour.id == id;
  })
  if(searchTour){
    const index = tourDetails.indexOf(searchTour);
    tourDetails[index] = {id, ...updatedTour};
    fs.writeFile(
      `${__dirname}/data/tours.json`,
      JSON.stringify(tourDetails),
      (err)=>{
        res.status(200).json({
          "message": "Tour updated successfully"
        })
      }
    )
  }
  else{
    res.status(404).send({"message": "Tour not found"})
  }
});

app.delete('/tours/:id', (req, res) => {
  const id = parseInt(req.params.id);
  //Write a code here for deleting a tour from data/tours.json
  const searchTour = tourDetails.find((tour)=>{
    return tour.id == id;
  })
  if(searchTour){
    const index = tourDetails.indexOf(searchTour);
    tourDetails.splice(index,1);
    fs.writeFile(
      `${__dirname}/data/tours.json`,
      JSON.stringify(tourDetails),
      (err)=>{
        res.status(200).json({
          "message": "Tour deleted successfully"
        })
      }
    )
  }
  else{
    res.status(404).send({"message": "Tour not found"})
  }
});

module.exports = app;
