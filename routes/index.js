var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose();
var db = require('../models');
const vaeresteder = require('../models/vaeresteder');

// GET home page.
router.get('/', function(req, res, next) {
  res.render('index', { title: 'KBHværesteder' });
});

// GET væresteder1 page.
router.get('/vaeresteder1', function(req, res, next) {
  res.render('vaeresteder1', { title: 'KBHværesteder' });
});

// GET væresteder2 page.
router.get('/vaeresteder2', function(req, res, next){
  var oplysninger = [
    {
    nummer: "1",
    navn: "Aktivitetshuset Sidelinien",
    adresse: "Bragesgade 8C",
    bydel: "Nørrebro",
    },
    {
    nummer: "2",
    navn: "Cafe - Den varme stue",
    adresse: "Rigensgade 21",
    bydel: "Indre By",
    },
    {
    nummer: "3",
    navn: "Cafe Dammen, Bethesda",
    adresse: "Rømersgade 17",
    bydel: "Indre By",
    },
    {
    nummer: "4",
    navn: "Cafe Klareboderne",
    adresse: "Klareboderne 3",
    bydel: "Indre By",
    },
    {
    nummer: "5",
    navn: "Cafe Mødestedet",
    adresse: "Købmagergade 52",
    bydel: "Indre By",
    },
    {
    nummer: "6",
    navn: "Cafe Sankt Lukas",
    adresse: "Sankt Lukas Kirke, Christian den 4. gade 1",
    bydel: "Indre By",
    }
];

  res.render('vaeresteder2', { title: 'KBHværesteder', oplysninger: oplysninger });
});

// GET væresteder3 page.
router.get('/vaeresteder3', function(req, res){

  const vaeresteders = db.vaeresteder.findAll().then(vaeresteders => {
    res.render('vaeresteder3', { title: 'KBHværesteder', vaeresteders: vaeresteders });
  });
});

// GET soegvaerested page.
router.get('/soegvaerested', function(req, res, next) {
  res.render('soegvaerested', { title: 'KBHværesteder' });
});

// POST sporID form.
router.post('/sporID', async function(req, res, next) {
  try {
    const vaeresteder = await db.vaeresteder.findOne({
      where: {id: req.body.id}
    });

    res.render('soegvaerestedresultat', { title: 'KBHværesteder', vaeresteder: vaeresteder });
  }
  catch (error) {
    console.log(error);
  }
});

// GET API toiletter page.
router.get('/toiletter', async function(req, res, next) {
  try {
    const response = await fetch('https://gist.githubusercontent.com/andracs/e09f344f810d30b6c7bb8930df3d4bdf/raw/2ad18f7a3a063001f49eda0e2e8ba6b1444ec2c2/toiletter.json');
    const data = await response.json();

    res.render('toiletter', { title: 'Toiletter', toiletter: data.features });
  }
  catch (error) {
    console.log(error);
  }
});

// GET opretvaerested page.
router.get('/opretvaerested', function(req, res, next) {
  res.render('opretvaerested', { title: 'KBHværesteder' });
});

// POST submit-vaerested-info form.
router.post('/submit-vaerested-info', async function(req, res, next) {

  try {

    const vaeresteder = await db.vaeresteder.create({

      navn: req.body.navn,
      adresse: req.body.adresse,
      bydel: req.body.bydel,
    
    });

    res.redirect('/vaeresteder3');
  }
  catch (error) {
    console.log(error);
  }
});

// GET sletvaerested page.
router.get('/sletvaerested', function(req, res, next) {
  res.render('sletvaerested', { title: 'KBHværesteder' });
});

// POST sletID form.
router.post('/sletID', async function(req, res, next) {
  try {
    const vaeresteder = await db.vaeresteder.destroy({
      where: {id: req.body.id}
    });

    res.redirect('/vaeresteder3');
  }
  catch (error) {
    console.log(error);
  }
});

// GET opdatervaerested page.
router.get('/opdatervaerested', function(req, res, next) {
  res.render('opdatervaerested', { title: 'KBHværesteder' });
});

// POST opdaterID form.
router.post('/opdaterID', async function(req, res, next) {
  try {
    const vaeresteder = await db.vaeresteder.update(
      { 
        navn: req.body.navn,
        adresse: req.body.adresse,
        bydel: req.body.bydel
      },
      { 
        where: {id: req.body.id}
      }
      );

    res.redirect('/vaeresteder3');
  }
  catch (error) {
    console.log(error);
  }
});

module.exports = router;
