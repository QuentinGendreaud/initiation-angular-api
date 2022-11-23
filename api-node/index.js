const express = require('express');
// const bodyParser = require('body-parser')

// Load datas
const users = require('./data/users.json');
const teams = require('./data/teams.json');
const matchs = require('./data/matchs.json');
const pronostics = require('./data/pronostics.json');

// Variables to set next avaiallableID
let nextElementId = {
    user: 100,
    team: 100,
    match: 100,
    pronostic: 100,
}

// Init node Server
const app = express();

// Init Middleware
// app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

/**
 * User's routes
 */
app.get('/users', (req, res) => {
    res.status(200).json(users)
});

app.put('/users/:userId/habilitation', (req, res) => {
    const id = parseInt(req.params.userId);
    const userIndex = users.findIndex(userElement => userElement.id === id);
    if (userIndex !== -1) {
        users[userIndex].habilitation = req.body.habilitation;
    }
    res.status(200).json(users)
});

app.post('/user', (req, res) => {
    const createdUser = {
        id: nextElementId.user,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        habilitation: 2,
        login: req.body.login,
        password: req.body.password,
        activation: true
    }
    nextElementId.user ++;
    users.push(createdUser);
    res.status(200).json(createdUser);
});

/**
 * Login's routes
 */
app.post('/login', (req, res) => {
    const loggedUser = users.find((user) => user.login === req.body.login && user.password === req.body.password);
    if (loggedUser) {
        res.status(200).json(users);
    } else {
        res.status(204).json();
    }
});

/**
 * Team's routes
 */
app.get('/teams', (req, res) => {
    res.status(200).json(teams)
});

app.post('/teams', (req, res) => {
    const createdTeam = {
        id: nextElementId.team,
        name: req.body.name,
        flagUrl: req.body.flagUrl
    }
    nextElementId.team ++;
    teams.push(createdTeam);
    res.status(200).json(createdTeam);
});

app.put('/teams', (req, res) => {
    const updatedTeamIndex = teams.findIndex((team) => team.id === req.body.id);
    if (updatedTeamIndex !== -1) {
        teams[updatedTeamIndex] = req.body;
        res.status(200).json(req.body);
    } else {
        res.status(204).json();
    }
});

app.delete('/teams/:id', (req, res) => {
    const deletedTeamIndex = teams.findIndex((team) => team.id === parseInt(req.params.id, 10));
    if (deletedTeamIndex !== -1) {
        teams.splice(deletedTeamIndex, 1);
        res.status(200).json();
    } else {
        res.status(204).json();
    }
});

/**
 * Match's routes
 */
app.get('/matchs', (req, res) => {
    res.status(200).json(matchs)
});

app.get('/matchs/:matchId/pronostics', (req, res) => {
    let selectedMatch = matchs.find((match) => match.id === parseInt(req.params.matchId, 10));
    if (selectedMatch) {
        let matchPronostics = pronostics.filter((prono) => prono.matchId === selectedMatch.id);
        selectedMatch.teamA = teams.find((team) => team.id === selectedMatch.teamAId);
        selectedMatch.teamB = teams.find((team) => team.id === selectedMatch.teamBId);
        selectedMatch.pronostics = matchPronostics.map((pronostic) => {
            const pronoUser = users.find((user) => user.id === pronostic.userId);
            return {
                ...pronostic,
               displayedUserName: pronoUser ? `${pronoUser.firstname} ${pronoUser.lastname}` : '',
            }
        });
        res.status(200).json(selectedMatch)
    } else {
        res.status(204).json();
    }
});

app.get('/matchs/pronostics/:userId', (req, res) => {
    const userId = parseInt(req.params.userId, 10);
    const user = users.find((user) => user.id === userId);
    
    if (user) {
        const completedMatchs = [...matchs];
        completedMatchs.map((match) => {
            const pronostic = pronostics.find((prono) => prono.matchId === match.id && prono.userId === userId)
            if (pronostic) {
                match.pronostics = [pronostic];
            } else {
                match.pronostics = []
            }
        });
        res.status(200).json(completedMatchs);
    } else {
        res.status(204).json();
    }
});

app.post('/matchs', (req, res) => {
    const createdMatch = {
        id: nextElementId.match,
        teamAId: req.body.teamAId,
        teamBId: req.body.teamBId,
        startDate: req.body.startDate,
        scoreTeamA: 0,
        scoreTeamB: 0
    }
    nextElementId.match ++;
    matchs.push(createdMatch);
    res.status(200).json(createdMatch);
});

app.put('/matchs', (req, res) => {
    const updatedMatchIndex = matchs.findIndex((match) => match.id === req.body.id);
    if (updatedMatchIndex !== -1) {
        matchs[updatedMatchIndex] = req.body;
        res.status(200).json(req.body);
    } else {
        res.status(204).json();
    }
});

app.delete('/matchs/:id', (req, res) => {
    const deletedMatchIndex = matchs.findIndex((match) => match.id === parseInt(req.params.id, 10));
    if (deletedMatchIndex !== -1) {
        matchs.splice(deletedMatchIndex, 1);
        res.status(200).json();
    } else {
        res.status(204).json();
    }
});

/**
 * Pronostic's routes
 */
app.get('/pronostics', (req, res) => {
    res.status(200).json(pronostics)
});

app.get('/pronostics/:userId', (req, res) => {
    let usersPronostics = pronostics.filter((prono) => prono.userId === parseInt(req.params.userId, 10));
    usersPronostics.map((prono) => {
        prono.match = matchs.find((match) => match.id === prono.matchId);
        if (prono.match) {
            prono.match.teamA = teams.find((team) => team.id === prono.match.teamAId);
            prono.match.teamB = teams.find((team) => team.id === prono.match.teamBId);
        }
    });
    res.status(200).json(usersPronostics)
});

app.post('/pronostics', (req, res) => {
    const createdProno = {
        id: nextElementId.pronostic,
        userId: req.body.userId,
        matchId: req.body.matchId,
        choice: req.body.choice
    }
    nextElementId.pronostic ++;
    pronostics.push(createdProno);
    res.status(200).json(createdProno);
});

app.put('/pronostics', (req, res) => {
    const updatedPronosticIndex = pronostics.findIndex((pronostic) => pronostic.id === req.body.id);
    if (updatedPronosticIndex !== -1) {
        pronostics[updatedPronosticIndex] = req.body;
        res.status(200).json(req.body);
    } else {
        res.status(204).json();
    }
});

app.delete('/pronostics/:id', (req, res) => {
    const deletedPronosticIndex = pronostics.findIndex((pronostic) => pronostic.id === parseInt(req.params.id, 10));
    if (deletedPronosticIndex !== -1) {
        pronostics.splice(deletedPronosticIndex, 1);
        res.status(200).json();
    } else {
        res.status(204).json();
    }
});

// Launch server listening on port :8080
app.listen(8080, () => {  
    console.log("Server is listening")       
});
