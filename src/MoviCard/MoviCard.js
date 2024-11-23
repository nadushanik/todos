import React from 'react'
import { Tag } from 'antd'

import '../MoviCard/MoviCard.css'
import RateStars from '../RateStars/RateStars'

function MoviCard({
  id,
  title,
  poster,
  data,
  overview,
  genres,
  ruiting,
  onRatingChange,
  initialRating,
}) {
  const posterUrl = poster
    ? `https://image.tmdb.org/t/p/w500${poster}`
    : 'https://2r.ru/css/img/noimg.jpg'
  const getRatingColor = (rating) => {
    if (rating >= 0 && rating < 3) {
      return '#E90000'
    } else if (rating >= 3 && rating < 5) {
      return '#E97E00'
    } else if (rating >= 5 && rating < 7) {
      return '#E9D100'
    } else if (rating >= 7) {
      return '#66E900'
    }
    return '#000000'
  }
  return (
    <div key={id} className="movie-card">
      <div
        className="card-rating"
        style={{ borderColor: getRatingColor(ruiting) }}
      >
        {ruiting}
      </div>
      <img src={posterUrl} alt={title} className="card-img" />
      <div className="card-content">
        <div className="card-title">{title || 'Movie title not specified'}</div>
        <div className="card-data">{data || 'no release date'}</div>
        {genres.map((genre) => (
          <Tag className="card-genre" key={genre}>
            {genre}
          </Tag>
        ))}
        <div className="card-overview">
          {overview || 'Movie overview not specified'}
        </div>
        <RateStars
          id={id}
          onRatingChange={onRatingChange}
          initialRating={initialRating}
        />
      </div>
    </div>
  )
}
export default MoviCard
