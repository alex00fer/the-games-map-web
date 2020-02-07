/* Fetches from the API */

function fetchGenres(callbackFunc) {
    fetchURL('https://api.rawg.io/api/genres', callbackFunc);
}

function fetchPlatforms(callbackFunc) {
    fetchURL(`https://api.rawg.io/api/platforms?page_size=10`, callbackFunc);
}

function fetchDevelopers(callbackFunc) {
    fetchURL('https://api.rawg.io/api/developers', callbackFunc);
}

function fetchGameSearch(callbackFunc, search) {
    var urlsearch = encodeURI(search);
    fetchURL(`https://api.rawg.io/api/games?search=${urlsearch}`, callbackFunc);
}

function fetchGenreGames(id, callbackFunc) {
    fetchURL(`https://api.rawg.io/api/games?genres=${id}`, callbackFunc);
}

function fetchPlatformGames(id, callbackFunc){
    fetchURL(`https://api.rawg.io/api/games?platforms=${id}`, callbackFunc);
}

function fetchDeveloperGame(id, callbackFunc) {
    fetchURL(`https://api.rawg.io/api/games?developers=${id}&page_size=5`, callbackFunc);
}

function fetchDefaultGames(callbackFunc) {
    fetchURL('https://api.rawg.io/api/games', callbackFunc);
}

function fetchGame(id, callbackFunc) {
    fetchURL(`https://api.rawg.io/api/games/${id}`, callbackFunc);
}

function fetchURL(url, callbackFunc) {
    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((response) => response.json())
        .then((data) => {
            //console.log('Success:', data);
            callbackFunc(data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}