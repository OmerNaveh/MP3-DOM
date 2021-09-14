const Title= document.createElement("h1");
Title.innerText= "My Cool Music Player";
const theTitle=document.getElementById("title");
theTitle.appendChild(Title);
let playedsongID; //used in playsong function
const outputSong= document.getElementById("songOutput");
const playedSong= document.createElement("h2");
outputSong.appendChild(playedSong);
/**
 * Plays a song from the player.
 * Playing a song means changing the visual indication of the currently playing song.
 *
 * @param {String} songId - the ID of the song to play
 */
function playSong(songId) {
    const generatedID= "this"+songId
    const div= document.getElementById(generatedID);
    div.style.borderLeft="thin dotted green";
    if(playedsongID===undefined)
    {
        playedsongID=generatedID;
        playedSong.innerText= songplayedDet(GetsongById(songId));
    }
    else
    {
        let resetback= document.getElementById(playedsongID);
        resetback.style.borderLeft="none";
        playedsongID=generatedID;
        playedSong.innerText= songplayedDet(GetsongById(songId));
    }

}
function songplayedDet(song)
{
    return ("Playing "+song.title+ " from " +song.album+" by "+song.artist+" | "+durationConvert(song.duration)+".")
}

 // Creates a song DOM element based on a song object.
function createSongElement({ id, title, album, artist, duration, coverArt }) {
    const children = []
    const ul= document.createElement("ul");
    for(let i=0; i<5; i++)
    {
        if(arguments[i] === arguments[4]) //convert duration to mm:ss format
        {
            arguments[i] = durationConvert(arguments[4]);
        }
        let li= document.createElement("li");
        li.innerHTML = arguments[i];
        ul.appendChild(li);
    }
    let a= document.createElement("img");
    a.src= arguments[5];
    ul.appendChild(a);
    children.push(ul);
    const classes = []
    classes.push(["songs"]);
    const generatedID= "this"+ arguments[0]
    const attrs = { onclick:`playSong(${arguments[0]})`, id:generatedID} //defined id to every div so it can be used in playsong function
    return createElement("div", children, classes, attrs)
}

 // Creates a playlist DOM element based on a playlist object.
function createPlaylistElement({ id, name, songs }) {
    const children = []
    const ul= document.createElement("ul");
    for(let i=0; i<3; i++)
    {
        let li= document.createElement("li");
        li.innerHTML = arguments[i];
        ul.appendChild(li);
    }
    let li= document.createElement("li");
    li.innerHTML = durationConvert(playlistDuration(arguments[0]));  //add mm:ssdurationto playlist list
    ul.appendChild(li);
    children.push(ul);
    const classes = []
    classes.push(["playlists"])
    const attrs = {}
    return createElement("div", children, classes, attrs)
}

/**
 * Creates a new DOM element.
 *
 * Example usage:
 * createElement("div", ["just text", createElement(...)], ["nana", "banana"], {id: "bla"})
 *
 * @param {String} tagName - the type of the element
 * @param {Array} children - the child elements for the new element.
 *                           Each child can be a DOM element, or a string (if you just want a text element).
 * @param {Array} classes - the class list of the new element
 * @param {Object} attributes - the attributes for the new element
 */
function createElement(tagName, children = [], classes = [], attributes = {}) {
    const createdElement= document.createElement(tagName);
    for(let childElement of children)
    {
        if(typeof childElement==="string")
        {
            createdElement.textContent=childElement;
        }
        else
        {
            createdElement.appendChild(childElement);
        }
    }
    createdElement.classList.add(classes);
    const seperatekeys= Object.entries(attributes)
    for (let key of seperatekeys)
    {
        createdElement.setAttribute(key[0],key[1]);
    }
    return createdElement;
}
// You can write more code below this line
const songdiv= document.getElementById("songs");
const playlistDiv= document.getElementById("playlists")
sortsongs(); //sorts songs by title
sortplaylists(); //sorts playlists by name
PrintAllSongs();
PrintAllPlaylists();
function PrintAllSongs()
{
    for(let song of player.songs)
    {
        const { id, title, album, artist, duration, coverArt}= song;
        const songElem = createSongElement(id, title, album, artist, duration, coverArt);
        songdiv.appendChild(songElem);
    }
}
function PrintAllPlaylists()
{
    for(let playlist of player.playlists)
    {
        const { id, name, songs}= playlist;
        const playlistElem = createPlaylistElement(id, name, songs);
        playlistDiv.appendChild(playlistElem);
    }
}
