export default class MovieService {
  apiKey = '97830363280f6706655dd05511f1a580'
  baseUrl = 'https://api.themoviedb.org/3/'

  getDataFromServer = async (url, options = {}) => {
    try {
      const res = await fetch(url, options)
      if (!res.ok) {
        throw new Error(`${res.status}`)
      }
      return await res.json()
    } catch (err) {
      console.error('Возникла проблема с fetch запросом: ', err.message)
      return err.message
    }
  }

  getPopularMovies = async (pageNumber) => {
    const url = `${this.baseUrl}movie/popular?api_key=${this.apiKey}&language=en-US&page=${pageNumber}`
    const body = await this.getDataFromServer(url)
    return body
  }

  getGenersList = async () => {
    const url = `${this.baseUrl}genre/movie/list?api_key=${this.apiKey}`
    const body = await this.getDataFromServer(url)
    return body
  }

  searchMovies = async (query, pageNumber) => {
    const url = `${this.baseUrl}search/movie?api_key=${this.apiKey}&query=${encodeURIComponent(query)}&page=${pageNumber}`
    return this.getDataFromServer(url)
  }

  saveRatedMoviesToLocalStorage = (movies) => {
    localStorage.setItem('ratedMovies', JSON.stringify(movies))
  }

  getRatedMoviesFromLocalStorage = () => {
    const ratedMovies = localStorage.getItem('ratedMovies')
    return ratedMovies ? JSON.parse(ratedMovies) : []
  }
}
