import React, { useState, useEffect } from 'react';
// import Image from '../banner.jpg'
import axios from 'axios'
import { Oval } from 'react-loader-spinner';
import Pagination from './Pagination';

function Movies() {

    const [movies, setMovies] = useState([])
    const [page, setPage] = useState(1)
    const [hover, setHover] = useState('')
    const [favourites, setFavourites] = useState([])


    // to increase and decrease the page count
    function goAhead() {
        setPage(page + 1)
    }
    function goBack() {
        if (page > 1) {
            setPage(page - 1)
        }
    }
    useEffect(function () {

        // everytime when page reloads
        // you will get the favourites movies from local
        let oldFav = localStorage.getItem("imdb");
        oldFav = JSON.parse(oldFav) || [];
        console.log(oldFav);
        // setFavourites(oldFav);
        // data manga 

        axios.get(`https://api.themoviedb.org/3/trending/movie/week?api_key=e16659a7864a924764d8ba0971391b19&page=${page}`)
        .then((res) => {
            console.table(res.data.results)
            setMovies(res.data.results);
        }
        )


    }, [page])

    let add = (movie) => {
        let newArray = [...favourites, movie]
        setFavourites([...newArray])
        // console.log(newArray)
        // after for reload 

        // this is used to storage the favourites movies in the local storage so that if the page renders
        //  again and again the favourites movies will be saved in the local storage 
        // in local storage only strings are stored to we converted the array into string 

        localStorage.setItem("imdb", JSON.stringify(newArray))  //here imdb is the name of collection which is stored 
                                                                //in the localStorage of the website
    }

// this del function is used to remove the movies from the localStorage 

    let del = (movie) => {
        let newArray = favourites.filter((m) => m.id !== movie.id)
        setFavourites([...newArray])
        localStorage.setItem("imdb", JSON.stringify(newArray))
    }

    return <>
        <div className="mb-8 text-center bg-red-50	">
            <div className="mt-8 mb-8 font-bold text-2xl text-center">Trending Movies</div>
            {

                // agar movie nhi hai toh loader ko show karo nhi toh movies ko card ke through show karo
                movies.length === 0 ?
                    <div className='flex justify-center'>
                        <Oval
                            heigth="100"
                            width="100"
                            color='grey'
                            secondaryColor='grey'
                            ariaLabel='loading'
                        />
                    </div> :
                    <div className="flex flex-wrap justify-center">
                        {
                            movies.map((movie) => (
                                <div className={`
                                    bg-[url(https://image.tmdb.org/t/p/w500/${movie.backdrop_path})] 
                                    md:h-[30vh] md:w-[250px] 
                                    h-[25vh] w-[150px]
                                    bg-center bg-cover
                                    rounded-xl
                                    flex items-end
                                    m-4
                                    hover:scale-110
                                    ease-out duration-300
                                    relative
                                `}
                                    onMouseEnter={() => {
                                        setHover(movie.id)
                                    }}

                                    onMouseLeave={() =>
                                        setHover("")}
                                >
                                    {
                                        hover === movie.id && <>{
                                            !favourites.find((m) => m.id === movie.id) ?
                                                <div className='absolute top-2 right-2
                                    p-2
                                    bg-gray-800
                                    rounded-xl
                                    text-xl
                                    cursor-pointer
                                    '
                                                    onClick={() => add(movie)}
                                                >😍</div> :
                                                <div className='absolute top-2 right-2
                                    p-2
                                    bg-gray-800
                                    rounded-xl
                                    text-xl
                                    cursor-pointer
                                    '
                                                    onClick={() => del(movie)}
                                                >❌</div>

                                        }


                                        </>
                                    }

                                    <div className="w-full bg-gray-900 text-white py-2 font-bold text-center rounded-b-xl">{movie.title} </div>
                                </div>
                            ))
                        }

                    </div>
            }

        </div>
        <Pagination pageProp={page} goBack={goBack} goAhead={goAhead} />
    </>
}

export default Movies;
// here md:property defines the media query for responsiveness  md means the screen size varies from medium to large
// media queries works firstly for mobile screen then goes to big screen(laptop,desktop)

// e16659a7864a924764d8ba0971391b19
// https://api.themoviedb.org/3/trending/movie/week?api_key=e16659a7864a924764d8ba0971391b19
// https://image.tmdb.org/t/p/original/wwemzKWzjKYJFfCeiB57q3r4Bcm.svg
