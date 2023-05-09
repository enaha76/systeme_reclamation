const express = require('express');
const mongoose = require('mongoose');
const usersRoutes = require('./routes/user');
const adminRoutes = require('./routes/admin');
const stRoutes = require('./routes/student');
const session = require('express-session');
const bodyParser = require('body-parser');
const User = require('./models/User');
const xlsx = require('xlsx');
const multer = require('multer');
const Student = require('./models/Student');
const claim =require('./models/claim');
const upload = multer({ dest: 'uploads/' }); // 'uploads/' is the directory where the uploaded file will be stored
// const fs = require('fs');
const claimTime = require('./models/claimTime');



const app = express();
app.use(session({
  secret: 'my-secret-key',
  resave: false,
  saveUninitialized: false
}));



// app.use(express.static('public'));
app.use(express.static('public'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Body parser middleware
app.use(express.json());
app.set('view engine', 'ejs');

// Connect to MongoDB
mongoose.connect('mongodb+srv://root:1234@cluster0.ddjbo47.mongodb.net/user?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB Atlas!');
}).catch((error) => {
  console.error('Error connecting to MongoDB Atlas:', error);
});

// Routes
app.use('/', usersRoutes);
// app.use('/admin', adminRoutes);
app.use('/student', stRoutes);


app.get('/test', (req, res) => {
  res.render('a');
});




app.get('/studentclaim', async (req, res) => {
  if (req.session.isLoggedIn) {
    const data = await Student.findOne({ matricule: req.session.mat }).exec();
    claimTime.findOne({}, {}, { sort: { '_id' : -1 } })
    .then((latestClaim) => {
       lastDuration = latestClaim.duration;
      
    console.log(data);
    res.render('studentclaim', { data: data ,naming: `${req.session.userName}`, lastDuration: lastDuration  });
  })
  } else {
    res.redirect('/');
  }
});



// app.get('/studentclaim', (req, res) => {
  
//   if (req.session.isLoggedIn) {
//     res.render('studentclaim', { naming: `${req.session.userName}` })
// } else {
//     res.redirect('/');
// }
  
// })

// app.get('/studentclaimaff', (req, res) => {
  
//   if (req.session.isLoggedIn) {
//     res.render('studentclaimaff', { naming: `${req.session.userName}` })
// } else {
//     res.redirect('/');
// }
// })
app.get('/studentclaimaff', async (req, res) => {
  if (req.session.isLoggedIn) {
    const data = await claim.find({ marticule: req.session.mat });
    console.log(data);

    

    res.render('studentclaimaff', { data: data ,naming: `${req.session.userName}` });
  } else {
    res.redirect('/');
  }
});






app.get('/studentnote', async (req, res) => {
  if (req.session.isLoggedIn) {
    const data = await Student.findOne({ matricule: req.session.mat }).exec();
    // console.log(data);
    res.render('studentnote', { data: data });
  } else {
    res.redirect('/');
  }
});


app.get('/admin', (req, res) => {
  
  if (req.session.isAdmin) {
    res.render('adminclaim')
} else {
    res.redirect('/');
  }
})

app.get('/adminm', (req, res) => {
  
  if (req.session.isAdmin) {
    res.render('adminclainm')
} else {
    res.redirect('/');
}
  
})

// router.get('/subject', usersController.displayadmins);
app.get('/adminsubject', (req, res) => {
  
  if (req.session.isAdmin) {
    res.render('adminsubject')
} else {
    res.redirect('/');
}
  
})

// app.get('/data', (req, res) => {
//   const workbook = XLSX.readFile("C:\Users\hp\Documents\ISMM.xlsx");
//   const worksheet = workbook.Sheets['Sheet1'];
//   const data = XLSX.utils.sheet_to_json(worksheet);

//   res.json(data);
// });






app.post('/upload', upload.single('file'), (req, res) => {
  const file = req.file;
  const filePath = file.path;
  
  // Use the xlsx package to read the file data and convert it into a JavaScript object
  const workbook = xlsx.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const data = xlsx.utils.sheet_to_json(worksheet);
  
  function mate(grades){
    const gradesArray = Object.entries(grades);
    let v = gradesArray
    let ars = [];
    for (let i = 0; i < gradesArray.length; i++) {
        let ar = []
        if (gradesArray[i][0].startsWith('EM Validé')) {
            ar.push(gradesArray[i - 1][0])
            ar.push(gradesArray[i - 1][1])
            ar.push(gradesArray[i][0])
            ar.push(gradesArray[i][1])
            ars.push(ar);
        }

    };
    let newars=[]
    for(let i = 0; i < ars.length; i++) {
        let ar =[]
        const splitIndex = ars[i][0].trim().indexOf(" ");
        const courseCode = ars[i][0].substr(0, splitIndex);
        const courseName = ars[i][0].substr(splitIndex + 1);
        let firstNumber = '';
        for (let i = 0; i < courseCode.length; i++) {
            if (!isNaN(parseInt(courseCode[i], 10))) {
            firstNumber = parseInt(courseCode[i], 10);
            break;
        }
}
        const sm="S"+firstNumber
        ar.push(courseCode)
        ar.push(courseName)
        ar.push(ars[i][1])
        ar.push(ars[i][3])
        ar.push(sm)
        newars.push(ar);
    }
    return newars;
}


  function extractInfo(original) {

        // const mat = "Matricule";
        // const newmat = `${mat}`;
        // original[newmat] = original[mat];
        // delete original[mat];

        // const pre = "Prénom";
        // const newpre = `${pre}`;
        // original[newpre] = original[pre];
        // delete original[pre];


        // const nom = "Nom";
        // const newnom = `${nom}`;
        // original[newnom] = original[nom];
        // delete original[nom];
        
        const { Matricule, 'Prénom ': prenom, Nom, ...grades } = original;
        let newars = mate(grades)


        

        let result = {
            matricule: Matricule,
            prenom : prenom,
            nom: Nom,
            matiere: []
        };
        for(let i = 0; i < newars.length; i++){
            let code = newars[i][0];
            let name =  newars[i][1];
            let note = typeof newars[i][2] === "string" ? parseFloat(newars[i][2].replace(",", ".")) : 0;
            let valide = newars[i][3];
            let semester = newars[i][4];

            result.matiere.push({
                code:code,
                nom: name,
                note:note,
                valide:valide,
                semestre: semester
            });
        }

        return result;
    
}

    let result = extractInfo(data[0]);
    let savedCount = 0;
    for (let i = 0; i < data.length; i++) {
      const newStudent = new Student(extractInfo(data[i]));
      newStudent.save()
        .then(result => {
          savedCount++;
          if (savedCount === data.length) {
            // All students have been saved, so redirect the user
            res.redirect('/dl');
          }
        })
        .catch(error => {
          res.status(500).json({
            error: error
          });
        });
    }
    
  console.log(result)
  // res.redirect('/dl');
});





app.post('/claimTime', async (req, res) => {
  const newclaim = new claimTime({
    duration: req.body.Days
  
  });
  console.log(newclaim.duration);
  newclaim.save()
    .then(savedduration => {
      res.redirect(302, '/adminm'); // Redirect to success page
    })
    .catch(err => {
      console.error(err);
      res.redirect('/'); // Redirect to error page
    });
});


// Start the server
app.listen(7000, () => {
  console.log('Server is running on port 7000');
});


