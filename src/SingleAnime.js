import './SingleAnime.scss'

import MyModal from './MyModal'
import 'bootstrap/dist/js/bootstrap.bundle'

import React from 'react'

import { useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'

const SingleAnime = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const animeInformation = location.state.props.list

    const handleRedirectBack = () => {
        navigate(-1);
    }

    const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)
    const openVideoModal = () => {
        setIsVideoModalOpen(true)
    }

    const closeVideoModal = () => {
        setIsVideoModalOpen(false)
    }

    return (
        <div className="container">
            <div className="arrow_container">
                <span className="arrow_container-wrapper" onClick={handleRedirectBack}><div className="arrow"><span className="arrow-icon"></span></div>Back</span>
            </div>
            <h1>{animeInformation.title}</h1>
            <div className="row gx-0">
                <div className="col-md-3">
                    <div className="pb-3 text-md-start text-center">
                        <img className="w-auto img-fluid" src={animeInformation.images.jpg.image_url} />
                    </div>
                    <div className="sidebar py-3 px-2">
                        <div className="sidebar_column">
                            <p className="sub_header">Alternative Titles</p>
                            {animeInformation.title_english !== animeInformation.title ? (
                                <p>{animeInformation.title_english}</p>
                            ) : (
                                <></>
                            )}
                            {animeInformation.title_japanese && (
                                <p>Japanese: {animeInformation.title_japanese}</p>
                            )}
                        </div>
                        <div className="sidebar_column">
                            <p className="sub_header">Information</p>
                            <p>Year Released: {animeInformation.year}</p>
                            <p>Type: {animeInformation.type}</p>
                            <p>Episodes: {animeInformation.episodes}</p>
                            <p>Status: {animeInformation.status}</p>
                            <p>Aired: {animeInformation.aired.string}</p>
                            <p>Broadcast: {animeInformation.broadcast.string}</p>
                            <p>Producers: {animeInformation.producers.length > 0 ? (animeInformation.producers.map((producer, index) => (
                                <span key={producer.name}>
                                    <a href={producer.url} target="blank_">{producer.name}</a>
                                    {index !== animeInformation.producers.length - 1 && ', '}
                                </span>
                            ))) : ("No Producers Found.")}</p>
                            <p>Licensors: {animeInformation.licensors.length > 0 ? (animeInformation.licensors.map((licensor, index) => (
                                <span key={licensor.name}>
                                    <a href={licensor.url} target="blank_">{licensor.name}</a>
                                    {index !== animeInformation.licensors.length - 1 && ', '}
                                </span>
                            ))) : ("No Licensors Found.")}</p>
                            <p>Studios: {animeInformation.studios.length > 0 ? (animeInformation.studios.map((studio, index) => (
                                <span key={studio.name}>
                                    <a href={studio.url} target="blank_">{studio.name}</a>
                                    {index !== animeInformation.studios.length - 1 && ', '}
                                </span>
                            ))) : ("No Studio Found.")}</p>
                            <p>Source: {animeInformation.source}</p>
                            <p>Genres: {animeInformation.genres.length > 0 ? (animeInformation.genres.map((genre, index) => (
                                <span key={genre.name}>
                                    <a href={genre.url} target="blank_">{genre.name}</a> 
                                    {index !== animeInformation.genres.length - 1 && ', '}
                                </span>
                            ))) : ("No Genre Found.")}</p>
                            <p>Explicit Genres: {animeInformation.explicit_genres.length > 0 ? (animeInformation.explicit_genres.map((expGenre, index) => (
                                <span key={expGenre.name}>
                                    <a href={expGenre.url} target="blank_">{expGenre.name}</a> 
                                    {index !== animeInformation.explicit_genres.length - 1 && ', '}
                                </span>
                            ))) : ("No Explicit Genre Found.")}</p>
                            <p>Theme: {animeInformation.themes.length > 0 ? (animeInformation.themes.map((theme, index) => (
                                <span key={theme.name}>
                                    <a href={theme.url} target="blank_">{theme.name}</a> 
                                    {index !== animeInformation.themes.length - 1 && ', '}
                                </span>
                            ))) : ("No Theme Found.")}</p>
                            <p>Demographics: {animeInformation.demographics.length > 0 ? (animeInformation.demographics.map((demographic, index) => (
                                <span key={demographic.name}>
                                    <a href={demographic.url} target="blank_">{demographic.name}</a> 
                                    {index !== animeInformation.demographics.length - 1 && ', '}
                                </span>
                            ))) : ("No Demographic Found.")}</p>
                            <p>Duration: {animeInformation.duration}.</p>
                            <p>Rating: {animeInformation.rating}.</p>
                        </div>
                        <div className="sidebar_column">
                            <p className="sub_header">Statistics</p>
                            <p>Score: {animeInformation.score} (scored by {animeInformation.scored_by.toLocaleString()} users)</p>
                            <p>Ranked: #{animeInformation.rank}</p>
                            <p>Popularity: #{animeInformation.popularity}</p>
                            <p>Members: {animeInformation.members.toLocaleString()}</p>
                            <p>Favorites: {animeInformation.favorites.toLocaleString()}</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-9 px-5">
                    <div className="sidebar_column trailer_column">
                        <p className="sub_header">Trailers</p>
                        <ul>
                            <li>
                                {/* TODO: Popup to play videos */}
                                <div type="button" data-bs-toggle="modal" data-bs-target="#myModal" onClick={openVideoModal}>
                                    <img src={animeInformation.trailer.images.image_url} />
                                </div>

                            </li>
                        </ul>

                        {isVideoModalOpen && (
                            <MyModal videoUrl={animeInformation.trailer.embed_url} onClose={closeVideoModal} />
                        )}
                    </div>
                    <div className="sidebar_column">
                        <p className="sub_header">Synopsis</p>
                        <p>{animeInformation.synopsis}</p>
                    </div>
                    {animeInformation.background && (
                    <div className="sidebar_column">
                        <p className="sub_header">Background</p>
                        <p>{animeInformation.background}</p>
                    </div>    
                    )}
                </div>
            </div>
        </div>
    )
}

export default SingleAnime