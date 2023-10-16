import './App.scss';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import React, { useState, useEffect } from 'react'

import { useNavigate } from 'react-router-dom'

function App() {
  const [animeList, setAnimeList] = useState([])

  useEffect(() => {
    let isMounted = true

    const fetchData = async (page = 1) => {
      try {
        const response = await fetch(`https://api.jikan.moe/v4/anime?page=${page}`)
        const data = await response.json()

        if (isMounted && data.data && data.data.length > 0) {
          setAnimeList(prevList => [...prevList, ...data.data])
          fetchData(page + 1)
        }
      } catch (error) {
        console.warn('Error fetching data:', error)
      }
    }

    fetchData()

    return () => {
      isMounted = false
    }
  }, [])
  

  return (
    <div className="App">
      <div className="container">
        <ul className="anime__grid">
          {
            animeList.map(anime => (
              <AnimeList key={anime.mal_id} list={anime} />
            ))
          }
        </ul>
      </div>
    </div>
  );
}

function AnimeList(props) {
  const navigate = useNavigate()

  const { title } = props.list

  const generatePath = (title) => {
    return title.toLowerCase().replace(/\s/g, '-')
  }

  const redirectToAnime = () => {
    const path = generatePath(title)
    navigate(
      `/anime/${path}`,
      { state: { props } }
    )
  }

  return (
      <div className="anime__grid-list" onClick={redirectToAnime}>
        <img src={props.list.images.jpg.image_url} />
        <div>
          {props.list.title}
        </div>
      </div>
  )
}

export default App;
