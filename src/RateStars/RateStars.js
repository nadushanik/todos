import React, { Component } from 'react'
import { Rate } from 'antd'

import './RateStars.css'

export default class RateStars extends Component {
  state = {
    ratingValue: this.props.initialRating || 0,
  }

  componentDidMount() {
    const { id } = this.props
    if (id) {
      const rating = localStorage.getItem(`movie_rating_${id}`)
      if (rating) {
        this.setState({ ratingValue: parseFloat(rating) })
      }
    }
  }

  componentDidUpdate(prevProps) {
    const { id } = this.props
    if (id && id !== prevProps.id) {
      const rating = localStorage.getItem(`movie_rating_${id}`)
      if (rating) {
        this.setState({ ratingValue: parseFloat(rating) })
      } else {
        this.setState({ ratingValue: 0 })
      }
    }
  }

  handleRatingChange = (value) => {
    this.setState({ ratingValue: value })
    if (this.props.onRatingChange) {
      this.props.onRatingChange(value)
    }
    const { id } = this.props
    if (id) {
      localStorage.setItem(`movie_rating_${id}`, value)
    }
  }

  render() {
    const { ratingValue } = this.state
    return (
      <div className="rate-stars-container">
        <Rate
          count={10}
          value={ratingValue}
          onChange={this.handleRatingChange}
          className="rate-stars"
        />
      </div>
    )
  }
}
