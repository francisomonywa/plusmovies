import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { LazyLoadImage } from 'react-lazy-load-image-component';
import './search.css'

export default function MovieSearch({ imageSource }) {

    const { search } = useParams()
    const [searchResults, setResults] = useState([])
    const [seriesSearchResults, setSeriesResults] = useState([])
    const [page, setPage] = useState(1)
    const [pages, setPages] = useState([])
    const [seriesPage, setSeriesPage] = useState(1)
    const [seriesPages, setSeriesPages] = useState([])
    const [adult, setAdult] = useState(false)
    const [showSeries, setShowSeries] = useState(false)
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0OGRjODQ1MDcwMDMyMDczOWJmY2M1MzdhMGNjMjgyOCIsInN1YiI6IjY0MjNkYjk5NjkwNWZiMDBiZDA4YWM2YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9FswfKJaJeW374o-VhH9k7qEQrrQnD7JZgolpoOrSeg'
        }
    };

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/search/movie?query=${search}&include_adult=${adult}&language=en-US&page=${page}`, options)
            .then(response => response.json())
            .then(response => {
                setResults(response.results)
                let newPages = []
                for (let i = 1; i <= response.total_pages; i++) {
                    newPages.push(i)
                }
                setPages(newPages)
            })
            .catch(err => console.error(err));
    }, [page, adult])

    useEffect(() => {
        async function fetchResults() {
            fetch(`https://api.themoviedb.org/3/search/tv?query=${search}&include_adult=${adult}&language=en-US&page=${seriesPage}`, options)
                .then(response => response.json())
                .then(response => {
                    setSeriesResults(response.results)
                    let newSeriesPages = []
                    for (let i = 1; i <= response.total_pages; i++) {
                        newSeriesPages.push(i)
                    }
                    setSeriesPages(newSeriesPages)
                })
                .catch(err => console.error(err));
        }
        fetchResults()
    }, [seriesPage, adult])

    return ( <
        div className = "search-page ps-lg-5 pt-5" >
        <
        h2 className = "ps-5 ps-lg-0" > Search Results of < span > { search } < /span></h
        2 > {
            /* <div className="form-check ps-5 ps-lg-0">
                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" onChange={e=>setAdult(!adult)}/>
                            <label className="form-check-label" for="flexCheckDefault">
                                Show adult content
                            </label>
                        </div> */
        } <
        div className = 'toggle' >
        <
        button style = {
            { borderBottom: !showSeries ? "1px solid grey" : "none" } }
        className = 'btn text-secondary'
        onClick = { e => setShowSeries(false) } > Movies < /button> <
        button style = {
            { borderBottom: showSeries ? "1px solid grey" : "none" } }
        className = 'btn text-secondary'
        onClick = { e => setShowSeries(true) } > Series < /button> <
        /div>

        {
            !showSeries ?
                <
                >
                <
                div className = "results d-flex justify-content-center flex-wrap" > {
                    searchResults.map(result =>
                        result ? .poster_path !== null && ( <
                            div className = "movie-card movie-result" >
                            <
                            a href = { '/movie/' + result ? .id + '/' + result ? .title } > < LazyLoadImage src = { imageSource + result ? .poster_path }
                            alt = { `${result?.title}` }
                            loading = "lazy" / > < /a> <
                            /div>
                        )
                    )
                } <
                /div> <
                div className = "toggle-pages" >
                <
                p > Page : < /p> <
                div className = "pages" > {
                    pages.map(this_page =>
                        page === this_page ?
                        <
                        button style = {
                            { border: "1px solid grey" } } > { this_page } < /button> :
                        <
                        button onClick = {
                            e => {
                                setPage(this_page)
                                document.body.scrollTop = 0;
                                document.documentElement.scrollTop = 0;
                            }
                        } > { this_page } < /button>
                    )
                } <
                /div> <
                /div> <
                />:
                <
                >
                <
                div className = "results d-flex justify-content-center flex-wrap" > {
                    seriesSearchResults.map(result =>
                        result ? .poster_path !== null && ( <
                            div className = "movie-card movie-result" >
                            <
                            a href = { '/series/' + result ? .id + '/' + result ? .name } > < LazyLoadImage src = { imageSource + result ? .poster_path }
                            alt = { `${result?.name}` }
                            loading = "lazy" / > < /a> <
                            /div>
                        )
                    )
                } <
                /div> <
                div className = "toggle-pages" >
                <
                p > Page: < /p> <
                div className = "pages" > {
                    seriesPages.map(this_page =>
                        seriesPage === this_page ?
                        <
                        button style = {
                            { border: "1px solid grey" } } > { this_page } < /button> :
                        <
                        button onClick = {
                            e => {
                                setSeriesPage(this_page)
                                document.body.scrollTop = 0;
                                document.documentElement.scrollTop = 0;
                            }
                        } > { this_page } < /button>
                    )
                } <
                /div> <
                /div> <
                />
        } <
        /div>
    )
}