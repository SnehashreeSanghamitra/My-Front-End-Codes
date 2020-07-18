import {renderTimeDetails} from './render.js';
import {DOMelements} from './getDOMelements.js'
import { moviesRender, rendermovie } from './getMovies.js';

const apikey = "d945889bb9934bf3d4195cc152d6f401"

//EVENT LISTENERS
const moviesAddEventListeners = () =>{
    const moviecards = Array.from(DOMelements.movieCards)
    moviecards.forEach(element => {
        element.addEventListener("click", async ()=>{
            const moviedetails = await getMovie(event.target.id)
            rendermovie(moviedetails)
            DOMelements.onboardingDisplay.style.display = "none"
            DOMelements.movieDisplay.style.display= "flex"
        })
    });
}

DOMelements.searchForm.onsubmit = async function searchresults(){
    //get serach results
    const data = await getSearchResults()
    //render search results with pagination
    // renderSearchCleaning()
    moviesRender(data)
    moviesAddEventListeners()
    // clearInput()
}

DOMelements.searchInput.onkeydown = function searchbarLength(){
    if(counter==0){
        counter++
        this.style.width = ((this.value.length + 1) * 100) + 'px';
    }
    else{
        if(this.value.length<1){
            counter=0;
            this.style.width= '60vw'
            return
        }
        counter++
        this.style.width = ((this.value.length + 1) * 100) + 'px';
    }
    console.log(`${this.value.length} and ${counter}`)
}



//UTILITIES

let counter=0;
const clearInput = () => {
    // DOMelements.searchInput.value=""
    // searchbarLength()
}



////////////

async function getSearchResults(){
    const keyword = DOMelements.searchInput.value;
    let resp = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apikey}&query=${keyword}`)
    let datas = await resp.json()
    console.log("inside search result")
    return datas
}

const renderSearchCleaning = () => {
    //do the animation and cleaning stuffs
    DOMelements.searchInput.style.transform = "translateY(-500px)"
    DOMelements.searchresults.style.visibility = "visible";
    //put the json value inside cards

    // render the results
}

async function getMovie(id){
    let res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apikey}`)
    // let res = await fetch(`https://api.themoviedb.org/3/movie/550/videos?api_key=${apikey}&language=en-US`)
    let data = await res.json()
    return data
    // console.log(data)
}

// let resp = await fetch(`https://api.themoviedb.org/3/search/${keyword}?api_key=${apikey}&page=1`)
    // http://api.themoviedb.org/3/search/movie?query=relic&api_key=d945889bb9934bf3d4195cc152d6f401
    // https://api.themoviedb.org/3/search/movie?api_key={api_key}&query=Jack+Reacher

// take in the search term and show results
// render moviw details
//   search for a movie
//   render its background images
//   render rating  
//   render watchtime
//   render votes
//   render imdb, netflix links
//   render time details

const renderAll = () => {
    renderTimeDetails()
}

const controller = () => {
    renderAll()
}
controller()