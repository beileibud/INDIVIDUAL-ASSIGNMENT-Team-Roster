import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

// get all teams to show
const getTeams = (uid) => new Promise((resole, reject) => {
  console.warn(uid);
  fetch(`${dbUrl}/teams.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    },
  })
    .then((Response) => Response.json())
    .then((data) => resole(Object.values(data)))
    .catch(reject);
});

// get single team to show
const getSingleTeam = (firebaseKey) => new Promise ((resolve, reject) => {
  fetch(`${dbUrl}/teams/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((Response) => Response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

// delete single team
const deleteTeam = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/teams/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// create team
const createTeam = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/teams.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => {
      const setcode = { firebaseKey: data.name };
      fetch(`${endpoint}/teams/${setcode.firebaseKey}.json`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(setcode),
      }).then(resolve);
    })
    .catch(reject);
});

const updateTeam = (payload) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/teams/${payload.firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

// TODO: GET A Team member from his team
const getTeamMember = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/members.json?orderBy="author_id"&equalTo="${firebaseKey}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

export {
    getTeams,
    getSingleTeam,
    deleteTeam,
    createTeam,
    updateTeam,
    getTeamMember,
};
