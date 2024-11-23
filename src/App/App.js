import React from 'react'
import { Spin, Pagination, Input, Flex, Tabs, Empty } from 'antd'
import { parseISO, format } from 'date-fns'
import { debounce } from 'lodash'

import MovieService from '../servis/MoviServis'
import MoviCard from '../MoviCard/MoviCard'
import '../App/App.css'

class App extends React.Component {
  state = {
    isLoading: false,
    movies: [],
    ratedMovies: [],
    genresList: [],
    currentPage: 1,
    totalMovies: 0,
    NumberMovi: 20,
    searchQuery: '',
    ratedCurrentPage: 1,
    ratedPageSize: 20,
    activeTab: 'tab1',
  }
  movieService = new MovieService()

  async componentDidMount() {
    this.getGenres()
    this.getMovie()
    this.getRatedMovies()
  }

  getMovie = async (pageNumber = 1, query = '') => {
    try {
      const response = query
        ? await this.movieService.searchMovies(query, pageNumber)
        : await this.movieService.getPopularMovies(pageNumber)
      this.setState(
        {
          movies: response.results,
          isLoading: false,
          totalMovies: response.total_results,
        },
        () => {
          window.scrollTo(0, 0)
        },
      )
    } catch (error) {
      console.error('Error fetching movies:', error)
      this.setState({ isLoading: false })
    }
  }

  getRatedMovies = () => {
    const ratedMovies = this.movieService.getRatedMoviesFromLocalStorage()
    this.setState({ ratedMovies })
  }

  getGenres = async () => {
    try {
      const response = await this.movieService.getGenersList()
      this.setState({ genresList: response.genres })
    } catch (error) {
      console.error('Error fetching genres:', error)
    }
  }

  formatDate = (dateString) => {
    if (!dateString) {
      return 'Unknown Date'
    }
    const date = parseISO(dateString)
    return format(date, 'MMMM d, yyyy')
  }

  getGenresFilm = (genresIds) => {
    if (!genresIds || !Array.isArray(genresIds)) {
      return []
    }
    const filmGenres = []
    const { genresList } = this.state
    for (let genreId of genresIds) {
      const genre = genresList.find((el) => el.id === genreId)
      if (genre) {
        filmGenres.push(genre.name)
      }
    }
    return filmGenres
  }

  truncateText = (text, maxLength) => {
    if (text === undefined || text === null) {
      return ''
    }
    if (text.length <= maxLength) {
      return text
    }
    let trimmedText = text.slice(0, maxLength)
    let lastSpaceIndex = trimmedText.lastIndexOf(' ')

    return lastSpaceIndex !== -1
      ? trimmedText.slice(0, lastSpaceIndex) + '...'
      : trimmedText + '...'
  }

  handlePageChange = (page) => {
    this.setState({ currentPage: page, isLoading: true }, () => {
      this.getMovie(page, this.state.searchQuery)
    })
  }

  handleRatedPageChange = (page) => {
    this.setState({ ratedCurrentPage: page }, () => {
      this.getRatedMovies()
    })
  }

  debounceGetResponse = debounce((value) => {
    this.setState(
      { searchQuery: value, currentPage: 1, isLoading: true },
      () => {
        this.getMovie(1, value)
      },
    )
  }, 300)

  handleRatingChange = (movieId, rating, movie) => {
    const ratedMovies = this.movieService.getRatedMoviesFromLocalStorage()
    const updatedRatedMovies = ratedMovies.map((ratedMovie) =>
      ratedMovie.id === movieId ? { ...ratedMovie, rating } : ratedMovie,
    )

    if (!updatedRatedMovies.some((ratedMovie) => ratedMovie.id === movieId)) {
      updatedRatedMovies.push({ ...movie, rating })
    }

    this.setState({ ratedMovies: updatedRatedMovies }, () => {
      this.movieService.saveRatedMoviesToLocalStorage(updatedRatedMovies)
    })
  }

  handleTabChange = (activeKey) => {
    this.setState({ activeTab: activeKey })
  }

  render() {
    const {
      isLoading,
      movies,
      ratedMovies,
      currentPage,
      totalMovies,
      NumberMovi,
      ratedCurrentPage,
      ratedPageSize,
      activeTab,
    } = this.state
    const maxLength = 150
    const tabItems = [
      {
        key: 'tab1',
        label: 'Search',
        children: (
          <>
            <Input
              placeholder="Type to search..."
              className="search"
              onChange={(event) => {
                const value = event.target.value
                this.debounceGetResponse(value)
              }}
            />
            <div className="ant-space">
              {isLoading ? (
                <Flex gap="middle" vertical align="center" justify="center">
                  <Spin tip="Loading" size="large" className="spin"></Spin>
                </Flex>
              ) : movies.length === 0 ? (
                <Empty
                  description="No movies found"
                  className="centered-empty"
                />
              ) : (
                movies.map((movie) => {
                  return (
                    <MoviCard
                      key={movie.id}
                      id={movie.id}
                      title={movie.original_title}
                      poster={movie.poster_path}
                      data={this.formatDate(movie.release_date)}
                      overview={this.truncateText(movie.overview, maxLength)}
                      genres={this.getGenresFilm(movie.genre_ids)}
                      ruiting={movie.vote_average}
                      onRatingChange={(rating) =>
                        this.handleRatingChange(movie.id, rating, movie)
                      }
                    />
                  )
                })
              )}
            </div>
          </>
        ),
      },
      {
        key: 'tab2',
        label: 'Rated',
        children: (
          <div className="ant-space">
            {ratedMovies.length === 0 ? (
              <Empty description="No rated movies yet" className="Empty" />
            ) : (
              ratedMovies
                .slice(
                  (ratedCurrentPage - 1) * ratedPageSize,
                  ratedCurrentPage * ratedPageSize,
                )
                .map((movie) => {
                  return (
                    <MoviCard
                      key={movie.id}
                      id={movie.id}
                      title={movie.original_title}
                      poster={movie.poster_path}
                      data={this.formatDate(movie.release_date)}
                      overview={this.truncateText(movie.overview, maxLength)}
                      genres={this.getGenresFilm(movie.genre_ids)}
                      ruiting={movie.vote_average}
                      onRatingChange={(rating) =>
                        this.handleRatingChange(movie.id, rating, movie)
                      }
                    />
                  )
                })
            )}
          </div>
        ),
      },
    ]

    return (
      <div className="container">
        <section className="ant-layout">
          <div className="ant-layout-content">
            <Flex justify="center">
              <Tabs items={tabItems} onChange={this.handleTabChange} />
            </Flex>
          </div>
          {activeTab === 'tab1' && (
            <Pagination
              className="ant-pagination"
              current={currentPage}
              total={totalMovies}
              pageSize={NumberMovi}
              onChange={this.handlePageChange}
              showSizeChanger={false}
            />
          )}
          {activeTab === 'tab2' && (
            <Pagination
              className="ant-pagination"
              current={ratedCurrentPage}
              total={ratedMovies.length}
              pageSize={ratedPageSize}
              onChange={this.handleRatedPageChange}
              showSizeChanger={false}
            />
          )}
        </section>
      </div>
    )
  }
}

export default App
