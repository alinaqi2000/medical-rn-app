const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// const {User} = require('./user');

require('./Doctor');
require('./Appointment');
require('./Prescription');
require('./Report');
require('./Ocr');
require('./user');

app.use(bodyParser.json());
const Doctor = mongoose.model('doctor');
const Appointment = mongoose.model('appointment');
const Prescription = mongoose.model('prescription');
const Report = mongoose.model('report');
const Ocr = mongoose.model('ocr');
const User = mongoose.model('user');
// 5Y1z8tzgY1nKEfkj
// UZKKJ0Ccqwfuxv5r
// const mongoUri =
//   'mongodb+srv://SyedUsamaShah:5Y1z8tzgY1nKEfkj@cluster0.mumqokd.mongodb.net/?retryWrites=true&w=majority';
const mongoUri =
  'mongodb+srv://alinaqi2000:UZKKJ0Ccqwfuxv5r@cluster0.35jrd.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(mongoUri);

mongoose.connection.on('connected', () => {
  console.log('connected to mongo ');
});
mongoose.connection.on('error', error => {
  console.log('error', error);
});

app.post('/signup', (req, res) => {
  console.log(req.body);
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.passwordHash,
  });
  user
    .save()
    .then(data => {
      console.log(data);
      res.send('success');
    })
    .catch(err => {
      console.log(err);
    });
});

//Doctor
//doctordetails
app.post('/send-data', (req, res) => {
  console.log(req.body);
  const doctor = new Doctor({
    name: req.body.name,
    speciality: req.body.speciality,
    phone: req.body.phone,
    email: req.body.email,
    address: req.body.address,
  });
  doctor
    .save()
    .then(data => {
      console.log(data);
      res.send('success');
    })
    .catch(err => {
      console.log(err);
    });
});

app.get('/d', (req, res) => {
  Doctor.find({})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      console.log(err);
    });
});

app.delete('/doctor-delete/:id', async (req, res) => {
  try {
    const result = await Doctor.findByIdAndRemove(req.params.id);
    if (!result) {
      return res
        .status(404)
        .json({success: false, message: 'Doctor Not Found'});
    }
    res.status(200).json({success: true, message: 'Doctor Deleted'});
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error in Doctor Routes (delete)',
      error: err,
    });
  }
});

app.put('/update-doctor/:id', async (req, res) => {
  try {
    const result = await Doctor.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        speciality: req.body.speciality,
        phone: req.body.phone,
        email: req.body.email,
        address: req.body.address,
      },
      {new: true},
    );

    if (!result) {
      return res
        .status(404)
        .json({success: false, message: 'Doctor Not Found'});
    }

    res
      .status(200)
      .send({user: result, message: 'Doctor Updated Successfully!'});
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error in Doctor Router (put)',
      error: err,
    });
  }
});

//appointment
app.get('/a', (req, res) => {
  Appointment.find({})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      console.log(err);
    });
});

// app.get('/', async (req, res) => {
//   const result = await Appointment.find({});
//   res.send({
//     result,
//   });
// });

//appointment
app.post('/send-appoin', (req, res) => {
  console.log(req.body);
  const appointment = new Appointment({
    title: req.body.title,
    date: req.body.date,
    location: req.body.location,
    notes: req.body.notes,
  });
  appointment
    .save()
    .then(data => {
      console.log(data);
      res.send('success');
    })
    .catch(err => {
      console.log(err);
    });
});

app.delete('/appointment-delete/:id', async (req, res) => {
  try {
    const result = await Appointment.findByIdAndRemove(req.params.id);
    if (!result) {
      return res
        .status(404)
        .json({success: false, message: 'Appointment Not Found'});
    }
    res.status(200).json({success: true, message: 'Appointment Deleted'});
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error in Appointment Routes (delete)',
      error: err,
    });
  }
});

app.put('/update-appointment/:id', async (req, res) => {
  try {
    const result = await Appointment.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        date: req.body.date,
        location: req.body.location,
        notes: req.body.notes,
      },
      {new: true},
    );

    if (!result) {
      return res
        .status(404)
        .json({success: false, message: 'Appointment Not Found'});
    }

    res
      .status(200)
      .send({user: result, message: 'Appointment Updated Successfully!'});
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error in Appointment Router (put)',
      error: err,
    });
  }
});

//prescription
app.get('/p', (req, res) => {
  Prescription.find({})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      console.log(err);
    });
});

app.post('/send-pres', (req, res) => {
  console.log(req.body);
  const prescription = new Prescription({
    medName: req.body.medName,
    prescriptionDetails: req.body.prescriptionDetails,
    text: req.body.text,
  });
  prescription
    .save()
    .then(data => {
      console.log(data);
      res.send('success');
    })
    .catch(err => {
      console.log(err);
    });
});

app.delete('/prescription-delete/:id', async (req, res) => {
  try {
    const result = await Prescription.findByIdAndRemove(req.params.id);
    if (!result) {
      return res
        .status(404)
        .json({success: false, message: 'Prescription Not Found'});
    }
    res.status(200).json({success: true, message: 'Prescription Deleted'});
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error in Prescription Routes (delete)',
      error: err,
    });
  }
});

app.put('/update-prescription/:id', async (req, res) => {
  try {
    const result = await Prescription.findByIdAndUpdate(
      req.params.id,
      {
        medName: req.body.medName,
        prescriptionDetails: req.body.prescriptionDetails,
        text: req.body.text,
      },
      {new: true},
    );

    if (!result) {
      return res
        .status(404)
        .json({success: false, message: 'Prescription Not Found'});
    }

    res
      .status(200)
      .send({user: result, message: 'Prescription Updated Successfully!'});
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error in Prescription Router (put)',
      error: err,
    });
  }
});

// app.post('/register', async (req, res) => {
//   const {name, email, passwordHash} = req.body;
//   try {
//     await User.create({
//       name,
//       email,
//       passwordHash,
//     });
//     res.send({status: 'Registered'});
//   } catch (error) {
//     res.send({status: 'error'});
//   }
// });

// app.post('/Login', (req, res) => {
//   const {email, password} = req.body;
//   User.findone({email: email}, (err, user) => {
//     if (user) {
//       if (password === user.password) {
//         res.send({message: 'login sucess', user: user});
//       } else {
//         res.send({message: 'wrong credentials'});
//       }
//     } else {
//       res.send('not register');
//     }
//   });
// });

app.post('/register', (req, res) => {
  console.log(req.body);
  const {name, email, passwordHash} = req.body;
  User.findOne({email: email}, (err, user) => {
    if (user) {
      res.send({message: 'user already exist'});
    } else {
      const user = new User({name, email, passwordHash});
      user.save(err => {
        if (err) {
          res.send(err);
        } else {
          res.send({message: 'sucessfull'});
        }
      });
    }
  });
});

//Report

app.post('/send-reportData', (req, res) => {
  console.log(req.body);
  const report = new Report({
    medName: req.body.medName,
    medForm: req.body.medForm,
    date: req.body.date,
  });
  report
    .save()
    .then(data => {
      console.log(data);
      res.send('success');
    })
    .catch(err => {
      console.log(err);
    });
});

app.get('/r', (req, res) => {
  Report.find({})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      console.log(err);
    });
});

app.delete('/report-delete/:id', async (req, res) => {
  try {
    const result = await Report.findByIdAndRemove(req.params.id);
    if (!result) {
      return res
        .status(404)
        .json({success: false, message: 'Report Not Found'});
    }
    res.status(200).json({success: true, message: 'Report Deleted'});
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error in Report Routes (delete)',
      error: err,
    });
  }
});

app.put('/update-report/:id', async (req, res) => {
  try {
    const result = await Report.findByIdAndUpdate(
      req.params.id,
      {
        medName: req.body.medName,
        medForm: req.body.medForm,
        date: req.body.date,
      },
      {new: true},
    );

    if (!result) {
      return res
        .status(404)
        .json({success: false, message: 'Report Not Found'});
    }

    res
      .status(200)
      .send({user: result, message: 'Report Updated Successfully!'});
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error in Report Router (put)',
      error: err,
    });
  }
});

//OCR

app.post('/send-ocrData', (req, res) => {
  console.log(req.body);
  const ocr = new Ocr({
    text: req.body.text,
  });
  ocr
    .save()
    .then(data => {
      console.log(data);
      res.send('success');
    })
    .catch(err => {
      console.log(err);
    });
});

app.get('/o', (req, res) => {
  Ocr.find({})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      console.log(err);
    });
});

app.delete('/ocr-delete/:id', async (req, res) => {
  try {
    const result = await Ocr.findByIdAndRemove(req.params.id);
    if (!result) {
      return res.status(404).json({success: false, message: 'Ocr Not Found'});
    }
    res.status(200).json({success: true, message: 'Ocr Deleted'});
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error in Ocr Routes (delete)',
      error: err,
    });
  }
});

//user

// =======================================  Getting All Users  =================================================

// router.get('/', async (req, res) => {
//   try {
//     const result = await User.find().select('-passwordHash');

//     if (!result) {
//       return res
//         .status(404)
//         .json({success: false, message: 'User Record is Empty'});
//     }

//     res.status(200).send(result);
//   } catch (err) {
//     res.status(500).json({
//       success: false,
//       message: 'Error in User Routes (get)',
//       error: err,
//     });
//   }
// });

// =======================================  Getting Single User by id  ========================================

// router.get('/:id', async (req, res) => {
//   try {
//     const result = await User.findById(req.params.id).select('-passwordHash');

//     if (!result) {
//       return res.status(404).json({success: false, message: 'User Not Found'});
//     }

//     res.status(200).send(result);
//   } catch (err) {
//     res.status(500).json({
//       success: false,
//       message: 'Error in User Routes (get)',
//       error: err,
//     });
//   }
// });

// app.get('/hello-test', async (req, res) => {
//   res.send('hell');
// });

// =======================================  Sign Up User  ======================================================
console.log('App ', app);

// app.post('/signup', async (req, res) => {
//   try {
//     console.log('Req ', req);
//     // const checkEmail = await User.findOne({email: req.body.email});
//     // if (checkEmail)
//     //   return res.status(400).json({
//     //     success: false,
//     //     message: 'Already have an account on this email',
//     //   });

//     // const insertUser = new User({
//     //   name: req.body.name,
//     //   email: req.body.email,
//     //   passwordHash: bcrypt.hashSync(req.body.password, 10),
//     // });

//     // const result = await insertUser.save();

//     // if (!result) {
//     //   res.status(500).json({success: false, message: 'User Not Inserted'});
//     // }
//     // res.status(201).send(result);
//   } catch (err) {
//     console.log('Err', err);
//     // res.status(500).json({
//     //   success: false,
//     //   message: 'Error in Users Router (post)',
//     //   error: err,
//     // });
//     // console.log('Error ', err);
//   }
// });

// =======================================  Sign In User  =====================================================

// router.post(`/signin`, async (req, res) => {
//   try {
//     const user = await User.findOne({email: req.body.email});

//     if (!user) {
//       return res.status(404).json({success: false, message: 'User Not Found'});
//     }

//     if (user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
//       res.status(200).send({user: user, signIn: true});
//     } else {
//       res.status(400).send({message: 'Wrong Password'});
//     }
//   } catch (err) {
//     res.status(500).json({
//       success: false,
//       message: 'Error in User Routes (post)',
//       error: err,
//     });
//   }
// });

app.listen(5000, () => {
  console.log('server running');
});
