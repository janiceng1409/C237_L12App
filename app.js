// Import required modules
const express = require('express');

const app = express();

// Set EJS as view engine
app.set('view engine', 'ejs');

// Middleware
app.use(express.urlencoded({ extended: true }));

// Static folder
app.use(express.static('public'));

// Sample song data
const songs = [
    {
        id: 1,
        title: 'Blinding Lights',
        artist: 'The Weeknd',
        image: '/image/theweeknd.jpg'
    },
    {
        id: 2,
        title: 'Levitating',
        artist: 'Dua Lipa',
        image: '/image/dualipa.jpg'
    },
    {
        id: 3,
        title: 'Stay',
        artist: 'The Kid LAROI',
        image: '/image/stay.jpg'
    }
];

// Store favourites
let favourites = [];

// Home page
app.get('/', (req, res) => {
    res.render('index', { songs });
});

// Remove from favourites
app.post('/removeFavourite/:id', (req, res) => {

    const songId = parseInt(req.params.id);

    favourites = favourites.filter(song => song.id !== songId);

    res.redirect('/favourites');

});

// Favourite page
app.get('/favourites', (req, res) => {
    res.render('favourites', { favourites });
});

// Add to favourites
app.post('/favourite/:id', (req, res) => {

    const songId = parseInt(req.params.id);

    const selectedSong = songs.find(song => song.id === songId);

    if (selectedSong && !favourites.includes(selectedSong)) {
        favourites.push(selectedSong);
    }

    res.redirect('/');
});

// View favourites page
app.get('/favourites', (req, res) => {
    res.render('favourites', { favourites });
});

// Start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});