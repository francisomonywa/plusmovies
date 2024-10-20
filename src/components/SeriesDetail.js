import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import ReactPlayer from 'react-player';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import './movieDetail.css'

export default function SeriesDetail() {
    const { series_id } = useParams();
    const [movie, setMovie] = useState({})
    const [similarMovies, setSimilar] = useState([])
    const [videos, setVideos] = useState([])
    const [starsCount, setStars] = useState(0)
    const [isExpanded, setIsExpanded] = useState(false);
    const [decimalPresent, setPresent] = useState(false)
    const [loadedVideoIndices, setLoadedVideoIndices] = useState([]);
    const [isLoading, setLoading] = useState(true)
    const imageSource = 'https://image.tmdb.org/t/p/w500'
    const imageSourceRecommend = 'https://image.tmdb.org/t/p/w200'
    let starsList = []

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0OGRjODQ1MDcwMDMyMDczOWJmY2M1MzdhMGNjMjgyOCIsInN1YiI6IjY0MjNkYjk5NjkwNWZiMDBiZDA4YWM2YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9FswfKJaJeW374o-VhH9k7qEQrrQnD7JZgolpoOrSeg'
        }
    };

    useEffect(() => {
        Promise.all([
                fetch(`https://api.themoviedb.org/3/tv/${series_id}/similar?language=en-US&page=1`, options),
                fetch(`https://api.themoviedb.org/3/tv/${series_id}?language=en-US`, options),
                fetch(`https://api.themoviedb.org/3/tv/${series_id}/videos?language=en-US`, options)
            ])
            .then(responses => Promise.all(responses.map(response => response.json())))
            .then(([similarResponse, movieResponse, videosResponse]) => {
                setSimilar(similarResponse.results);
                setMovie(movieResponse);
                setStars(Math.floor((movieResponse.vote_average / 10) * 5) - 1);
                if ((movieResponse.vote_average / 10) * 5 - (Math.floor((movieResponse.vote_average / 10) * 5) - 1) > 0) {
                    setPresent(true);
                }
                setVideos(videosResponse.results);
            })
            .catch(err => console.error(err));
    }, []);

    useEffect(() => {
        movie.id && (setLoading(false))
    }, [movie])

    function handleVideoLoad(index) {
        setLoadedVideoIndices((prevIndices) => [...prevIndices, index]);
    };

    const trailer = videos ? .find(video => video ? .type === "Trailer")

    for (let i = 0; i <= starsCount; i++) {
        starsList.unshift("star")
    }

    console.log(movie)

    return (!isLoading ? ( <
            div className = "movie-details-page container-fluid p-lg-5" > {
                trailer && ( <
                    div className = "trailer d-flex justify-content-center" >
                    <
                    ReactPlayer url = { `https://www.youtube.com/watch?v=${trailer?.key}` }
                    height = "100%"
                    width = "100%"
                    controls = { true }
                    /> <
                    /div>
                )
            } <
            div className = "row mt-5 p-lg-5" >
            <
            div className = "col-12 col-lg-3 img-section" >
            <
            LazyLoadImage className = ""
            src = { imageSource + movie ? .poster_path }
            alt = "movie-poster"
            loading = "lazy" / >
            <
            /div> <
            div className = "col-12 col-lg-9 text-secondary mt-4 mt-lg-0 movie-words" >
            <
            div className = "col-header d-flex align-items-center justify-content-between" >
            <
            h2 className = "text-white" > { movie ? .name } < /h2> <
            div className = "stars" > {
                starsList.map(star =>
                    <
                    i className = "bi bi-star-fill" > < /i>
                )
            } {
                decimalPresent && ( <
                    i className = "bi bi-star-half" > < /i>
                )
            } <
            /div> <
            /div>

            <
            p className = "fw-light" > { movie ? .tagline } < /p> <
            div className = "fine-details d-flex align-items-center" >
            <
            div className = "rating d-flex" >
            <
            i class = "bi bi-star-fill" > < /i> <
            p className = "ms-1 " > { Math.floor(movie.vote_average) } < /p> <
            /div> <
            p > { movie ? .release_date ? .slice(0, 4) } < /p> { movie ? .seasons ? .length > 1 ? < p > { movie ? .seasons ? .length }
                Seasons < /p>:<p>{movie?.seasons?.length} Season</p > } <
            p className = "status text-white d-none d-md-flex" > { movie ? .status } < /p> <
            /div> {
                movie ? .homepage.includes("netflix") && < a href = { movie ? .homepage }
                target = "_blank"
                className = "watch btn btn-danger mt-3 pt-2 ps-4 pe-4" > Watch < /a>} <
                    p className = "pt-4" > { movie ? .overview } < /p> <
                    div className = "buttons d-flex" >
                    <
                    i class = "bi bi-plus-lg" > < /i> <
                    i class = "bi bi-heart-fill" > < /i> <
                    i class = "bi bi-bookmark-plus-fill" > < /i> <
                    i class = "bi bi-star-fill" > < /i> <
                    /div> <
                    div className = "genres d-flex mt-4" > {
                        movie ? .genres ? .map(genre =>
                            <
                            p className = "me-2 mb-3" > { genre.name } < /p>
                        )
                    } <
                    /div> <
                    div className = "row mt-3" >
                    <
                    div className = "col-md-3" >
                    <
                    p className = "lead" > Production Companies: < /p> <
                    /div> <
                    div className = "col-md-7 d-flex flex-wrap" > {
                        movie ? .production_companies ? .map(company =>
                            <
                            p className = "me-3" > { company ? .name } < /p>
                        )
                    } <
                    /div> <
                    hr / >
                    <
                    /div> <
                    /div> <
                    /div>

                {
                    videos ? .filter(video => video ? .type !== "Behind the Scenes").length > 0 &&
                        <
                        div className = "videos-section mt-5" >
                        <
                        h4 > Videos < /h4> <
                        div className = "videos" > {
                            videos.filter(video => video ? .type !== "Behind the Scenes").map((video, index) =>
                                <
                                div key = { video.key }
                                className = "video-container" > {
                                    loadedVideoIndices.includes(index) ? ( <
                                        div className = "video-container" >
                                        <
                                        ReactPlayer url = { `https://www.youtube.com/watch?v=${video.key}` }
                                        className = "video"
                                        width = "100%"
                                        style = {
                                            { minHeight: "200px", maxHeight: "220px" } }
                                        controls = { true }
                                        /> <
                                        /div>
                                    ) : ( <
                                        div className = "thumbnail"
                                        onMouseEnter = {
                                            e => {
                                                e.preventDefault()
                                                let button = e.target.parentNode.querySelector(".play")
                                                button ? .classList.remove("d-none")
                                            }
                                        }
                                        onMouseLeave = {
                                            e => {
                                                e.preventDefault()
                                                let button = e.target.parentNode.querySelector(".play")
                                                button ? .classList.add("d-none")
                                            }
                                        } >
                                        <
                                        LazyLoadImage src = { `https://img.youtube.com/vi/${video?.key}/maxresdefault.jpg` }
                                        alt = "video-preview"
                                        effect = "blur"
                                        onClick = {
                                            () => handleVideoLoad(index) }
                                        /> <
                                        button className = "play d-none"
                                        onClick = {
                                            () => handleVideoLoad(index) } > < i class = "bi bi-play-circle-fill" > < /i></button >
                                        <
                                        /div>
                                    )
                                } <
                                /div>
                            )
                        } <
                        /div> <
                        /div>
                }

                <
                div className = "related-movies mt-5 ps-lg-5" >
                    <
                    h4 > Recommended Shows < /h4> <
                    div className = "recommended" > {
                        similarMovies ? .map(popular_movie =>
                            popular_movie ? .id !== movie ? .id && (
                                popular_movie ? .poster_path !== null && ( <
                                    div className = "movie-card" >
                                    <
                                    a href = { '/series/' + popular_movie.id + '/' + popular_movie ? .name } > < LazyLoadImage src = { imageSourceRecommend + popular_movie ? .poster_path }
                                    alt = "${result?.title}"
                                    loading = "lazy" / > < /a> <
                                    /div>
                                )
                            )
                        )
                    } <
                    /div> <
                    /div>

                <
                /div>
            ): ( <
                div className = 'svg-load container d-flex flex-wrap align-items-center justify-content-center'
                style = {
                    { height: "90vh" } } >
                <
                svg viewBox = "0 0 100 100"
                width = "200" >
                <
                g fill = "none"
                stroke = "#fff"
                stroke - linecap = "round"
                stroke - linejoin = "round"
                stroke - width = "3" >
                <
                path d = "M 21 40 V 59" >
                <
                animateTransform attributeName = "transform"
                attributeType = "XML"
                type = "rotate"
                values = "0 21 59; 180 21 59"
                dur = "2s"
                repeatCount = "indefinite" / >
                <
                /path> <
                path d = "M 79 40 V 59" >
                <
                animateTransform attributeName = "transform"
                attributeType = "XML"
                type = "rotate"
                values = "0 79 59; -180 79 59"
                dur = "2s"
                repeatCount = "indefinite" / >
                <
                /path>

                <
                path d = "M 50 21 V 40" >
                <
                animate attributeName = "d"
                values = "M 50 21 V 40; M 50 59 V 40"
                dur = "2s"
                repeatCount = "indefinite" / >
                <
                /path> <
                path d = "M 50 60 V 79" >
                <
                animate attributeName = "d"
                values = "M 50 60 V 79; M 50 98 V 79"
                dur = "2s"
                repeatCount = "indefinite" / >
                <
                /path> <
                path d = "M 50 21 L 79 40 L 50 60 L 21 40 Z" >
                <
                animate attributeName = "stroke"
                values = "rgba(255,255,255,1); rgba(100,100,100,0)"
                dur = "2s"
                repeatCount = "indefinite" / >
                <
                /path> <
                path d = "M 50 40 L 79 59 L 50 79 L 21 59 Z" / >

                <
                path d = "M 50 59 L 79 78 L 50 98 L 21 78 Z" >
                <
                animate attributeName = "stroke"
                values = "rgba(100,100,100,0); rgba(255,255,255,1)"
                dur = "2s"
                repeatCount = "indefinite" / >
                <
                /path> <
                animateTransform attributeName = "transform"
                attributeType = "XML"
                type = "translate"
                values = "0 0; 0 -19"
                dur = "2s"
                repeatCount = "indefinite" / >
                <
                /g> <
                /svg> <
                p > Loading.... < /p> <
                /div>
            )
        )
    }