import React,{useEffect,useState} from 'react'
// import banner from '../images/b1.webp'
import axios from 'axios'
export default function Banner() {
  const [movie, setMovie] = useState({})
    useEffect(function () {

        axios.get("https://api.themoviedb.org/3/trending/movie/week?api_key=5540e483a20e0b20354dabc2d66a31c9&page=1").then((res) => {
            console.table(res.data.results)
            setMovie(res.data.results[0]);
        }
        )
    },[])
  return (
    <>
        <div className=
        {`bg-[url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})] h-[40vh] md:h-[85vh] 
        bg-center bg-cover
        flex items-end  
    `}>
        <div className=" text-xl md:text-3xl text-white
            p-6 
            bg-gray-900 bg-opacity-50
            w-full
            flex justify-center
        ">
                {movie.title}
                </div>
        </div>
    </>
  )
}

// here md:h-[60vh] defines the media query for responsiveness  md means the screen size varies from medium to large
// media queries works firstly for mobile screen then goes to big screen(laptop,desktop)
