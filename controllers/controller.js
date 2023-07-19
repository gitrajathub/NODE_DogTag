const nodemailer = require('nodemailer');
const qrcode = require('qrcode');
const fs = require('fs');
const Dog = require("../models/model");


const dotenv = require("dotenv");
require('dotenv').config();


//addData-----------------

exports.addData = async (req, res) => {
  try {
    const { dogName, email, parentName, nature, address, contact } = req.body;

    const options = {
      errorCorrectionLevel: 'H',
      type: 'image/png',
      rendererOpts: {
        quality: 0.8 
      }
    };

    const filename = `${contact}.png`;
    const qrCodeData = `http://localhost:${process.env.port}/getData/${contact}`;

    // Generate the QR code and save it to a file
    await qrcode.toFile(filename, qrCodeData, options);

    // Read the QR code image file and convert it to a buffer
    const imageBuffer = await fs.readFileSync(filename);

    const newUser = await new Dog({
      dogName,
      email,
      parentName,
      nature,
      address,
      contact,
      image: {
        data: imageBuffer,
        contentType: 'image/png' // Modify the content type according to your image format
      },
      url: `http://localhost:${process.env.port}/getData/${contact}`
    });

    // Save the new instance in the database
    await newUser.save();

    // Delete the QR code image file
    //fs.unlinkSync(filename);

    res.status(201).json({ message: 'User created successfully' });
  } 
  catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Server Error' });
  }
};



//getData-----------------

exports.getData = async (req, res) => {
    const contact  = req.params.id;
    console.log(contact);
    try {
        const dogData = await Dog.findOne({ contact });
    
        if (dogData) {

                    const fs = require("fs");

                    const imageData = Buffer.from(dogData.image.data, "binary");
                    const imageFilePath = `${dogData.contact}_.png`; // Replace 'output_image.png' with your desired file name and extension

                    fs.writeFile(imageFilePath, imageData, "binary", (err) => {
                    if (err) {
                        console.error("Error writing image file:", err);
                    } else {
                        console.log("Image file created successfully:", imageFilePath);
                    }
                    });

            res.status(200).json({ dogData });
            
            const { dogName, nature, parentName, contact, email, address } = dogData;
            console.log(`
            Dog name: ${dogName}, 
            Nature of dog: ${nature}, 
            Owner: ${parentName}, 
            Contact number: ${contact}, 
            Email: ${email}, 
            Address: ${address}`);
        } 
        else {
            res.status(404).json({ error: "Data not found" });
        }
    } 
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
  };

