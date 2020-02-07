// onload actions
window.onload = function () {
    fetchDefaultGames(updateGames);
    fetchGenres(updateGenres);
    fetchPlatforms(updatePlatforms);
    fetchDevelopers(updateDevelopers);
};

// search
var searchInputField = document.querySelector("#search-input");
function searchLoad() {
    var searchValue = searchInputField.value;
    if (!searchValue) return;
    fetchGameSearch(updateGames, searchValue);

    if (lastSelectedGenreBtn) lastSelectedGenreBtn.classList.remove("selected");
    lastSelectedGenreBtn = null;

    gameCategoryTitle.innerHTML = `Search "${searchValue}"`;
}


// show
var gameCategoryTitle = document.querySelector('#games-title');
var genreContentDiv = document.querySelector('#genres-content');
var gamesContentDiv = document.querySelector('#games-row-content');
var gameCardTemplate = document.querySelector('#card-template');
var platformContentDiv = document.querySelector('#platforms-content');
var developersContentDiv = document.querySelector('#developers-content');
var lastSelectedGenreBtn = null;

function updateGenres(json) {
    genreContentDiv.innerHTML = "";

    json.results.forEach(genre => {

        // create btn
        var btn = document.createElement("button");
        btn.innerHTML = genre.name.toUpperCase();
        // onclick
        btn.onclick = function () {
            gameCategoryTitle.innerHTML = genre.name;
            fetchGenreGames(genre.id, updateGames);
            btn.classList.add("selected");
            if (lastSelectedGenreBtn) lastSelectedGenreBtn.classList.remove("selected");
            lastSelectedGenreBtn = btn;
        };
        // add
        genreContentDiv.appendChild(btn);
    });
}

function updatePlatforms(json) {
    platformContentDiv.innerHTML = "";
    json.results.forEach(platform => {

        // create btn
        var btn = document.createElement("button");
        btn.innerHTML = platform.name.toUpperCase();
        // onclick
        btn.onclick = function () {
            gameCategoryTitle.innerHTML = platform.name;
            fetchPlatformGames(platform.id, updateGames);
            btn.classList.add("selected");
            if (lastSelectedGenreBtn) lastSelectedGenreBtn.classList.remove("selected");
            lastSelectedGenreBtn = btn;
        };
        // add
        platformContentDiv.appendChild(btn);
    });
}

function updateDevelopers(json) {
    developersContentDiv.innerHTML = "";

    json.results.forEach(developer => {

        // create btn
        var btn = document.createElement("button");
        btn.innerHTML = developer.name.toUpperCase();
        // onclick
        btn.onclick = function () {
            gameCategoryTitle.innerHTML = developer.name;
            fetchDeveloperGame(developer.id, updateGames);
            btn.classList.add("selected");
            if (lastSelectedGenreBtn) lastSelectedGenreBtn.classList.remove("selected");
            lastSelectedGenreBtn = btn;
        };
        // add
        developersContentDiv.appendChild(btn);
    });
}

// game info modal
var modalGameInfo = document.querySelector('#modal-game-info');
var modalGameContentDiv = modalGameInfo.querySelector('.modal-content');
var modalGameTitle = modalGameInfo.querySelector('.modal-title');
var modalGameDesc = modalGameInfo.querySelector('.modal-description');
var modalGameGenres = modalGameInfo.querySelector('#modal-genres');
var modalGameDevs = modalGameInfo.querySelector('#modal-developers');
var modalGameRating = modalGameInfo.querySelector('#modal-rating');
var modalGameMetacritic = modalGameInfo.querySelector('#modal-metacritic');
var modalGamePlatforms = modalGameInfo.querySelector('#modal-platforms');
var modalGameStores = modalGameInfo.querySelector('#modal-stores');
var modalGameReleased = modalGameInfo.querySelector('#modal-released');
var modalGameVideo = modalGameInfo.querySelector('#modal-video');
function updateModal(game) {
    // populate
    modalGameTitle.innerHTML = game.name;
    modalGameDesc.innerHTML = game.description;
    modalGameGenres.innerHTML = arrayToStringJSONValue(game.genres, "name");
    modalGameDevs.innerHTML = arrayToStringJSONValue(game.developers, "name");
    modalGameRating.innerHTML = Math.round((game.rating * 2) * 10) / 10; // round
    modalGameMetacritic.innerHTML = (game.metacritic) ? game.metacritic : "-";
    modalGamePlatforms.innerHTML = arrayToStringJSONValue(game.platforms, "platform.name");
    modalGameStores.innerHTML = arrayToStringJSONValue(game.stores, "store.name");
    modalGameReleased.innerHTML = (game.released);
    modalGameReleased.innerHTML += (game.tba) ? " (TBA)" : "";

    //video
    if (game.clip) {
        modalGameVideo.style.display = "block";
        modalGameVideo.src = game.clip.clip;
        modalGameVideo.volume = 0;
        modalGameVideo.onclick = function () {
            modalGameVideo.volume = (modalGameVideo.volume === 0) ? 1 : 0;
        };
    }
    else {
        modalGameVideo.style.display = "none";
    }

    modalGameContentDiv.style.background =
        `linear-gradient(rgba(26, 26, 26, 0.9), rgba(55, 35, 56, 0.97)), url('${game.background_image}')`;
    // show modal
    $('#modal-game-info').modal('show')

    // actions on close
    $('#modal-game-info').on('hidden.bs.modal', function () {
        // stop video and unload it
        modalGameVideo.pause();
        modalGameVideo.removeAttribute('src');
        modalGameVideo.load();
    });
}

function updateGames(json) {
    // update games category title text
    if (json.seo_title)
        gameCategoryTitle.innerHTML = json.seo_title;

    gamesContentDiv.innerHTML = "";

    json.results.forEach(game => {

        // create DOM node from template
        var node = gameCardTemplate.content.cloneNode(true);

        // fill content
        node.querySelector('[data-content=title]')
            .innerHTML = game.name;
        node.querySelector('[data-content=release]')
            .innerHTML = game.released;
        node.querySelector('[data-content=genre]')
            .innerHTML = arrayToStringJSONValue(game.genres, "name");
        node.querySelector('[data-content=platforms]')
            .innerHTML = arrayToStringJSONValue(game.platforms, "platform.name");
        node.querySelector('[data-content=rating]')
            .innerHTML = Math.round((game.rating * 2) * 10) / 10; // round 1 decimal
        // fill visuals
        node.querySelector('[data-is=frontground-card]')
            .style.backgroundImage = `url('${game.background_image}')`;

        var cardTopDiv = node.querySelector('.card');
        // set id for integrity purposes
        cardTopDiv.id = 'game' + game.id;
        // set onclick propierty
        cardTopDiv.onclick = function () {
            fetchGame(game.id, updateModal);
        };

        gamesContentDiv.appendChild(node);

    });
}