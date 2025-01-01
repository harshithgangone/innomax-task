import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import cloudinary from 'cloudinary';
import dotenv from 'dotenv';
import cors from 'cors';
import nodemailer from 'nodemailer';

dotenv.config();


cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});


mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log(err));

const app = express();
app.use(cors());  
app.use(express.json());  
const port = 5000;


const storage = multer.memoryStorage();
const upload = multer({ storage });


const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: process.env.EMAIL_USER,  
    pass: process.env.EMAIL_PASS,  
  },
});

const sendConfirmationEmail = async (email, fullName) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Registration Successful',
    text: `Hello ${fullName},\n\nThank you for registering for the event! Your registration has been successfully received.\n\nWe look forward to your participation.\n\nBest Regards,\nThe JNV Event Team`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Confirmation email sent to ${email}`);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};


app.post('/submit-registration', async (req, res) => {
  try {
    
    const registrationData = {
      fullName: req.body.fullName,
      email: req.body.email,
      phone: req.body.phone,
      college: req.body.college,
      designation: req.body.designation,
      batch: req.body.batch,
      gender: req.body.gender,
      role: req.body.role,
      about: req.body.about,
      dob: req.body.dob,
      location: req.body.location,
      linkedIn: req.body.linkedIn,
    };


    const Registration = mongoose.models.Registration || mongoose.model('Registration', new mongoose.Schema({}, { strict: false }));
    const registration = new Registration(registrationData);
    await registration.save();


    await sendConfirmationEmail(registrationData.email, registrationData.fullName);

    res.status(200).json({ message: 'Registration form submitted successfully', registrationData });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});


app.post('/submit-application', upload.single('pdf'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }


    cloudinary.v2.uploader.upload_stream(
      { resource_type: 'auto' },
      async (error, cloudinaryResponse) => {
        if (error) {
          return res.status(500).json({ message: 'File upload failed', error });
        }

        
        const applicationData = {
          nameOfStartup: req.body.nameOfStartup,
          foundersName: req.body.foundersName,
          alumniId: req.body.alumniId,
          category: req.body.category,
          description: req.body.description,
          pdfUrl: cloudinaryResponse.secure_url,  
        };

     
        const Application = mongoose.models.Application || mongoose.model('Application', new mongoose.Schema({}, { strict: false }));
        const application = new Application(applicationData);
        await application.save();

       
        res.status(200).json({ message: 'Application form submitted successfully', applicationData });
      }
    ).end(req.file.buffer);  

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
