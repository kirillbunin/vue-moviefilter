<template>
  <div id="app">
    <div class="pageContent">
      <div class="inside">

        <h1 class="logo">vue-moviefilter</h1>

        <div class="introWrap">
          <p class="introText">
            This app allows your to simply filter through results from <a href="//www.themoviedb.org/" title="www.themoviedb.org" rel="nofollow">TMDB</a> API.<br>
            Unfortunately, their API offers three ways to search. Search by various parameters, but NOT by title and/or description, search only by a title (or a multi-search, which involves description as well), or direct search by ID.<br>
            Therefore, for the sake of this demo, the query will search only through titles, and optionally through description as well.
          </p>
          <SearchForm
            @formSubmit="submitSearch"
            :queryValue="searchQuery"
            @queryChange="value => { searchQuery = value }"
            :checkboxValue="searchMulti"
            @checkboxChange="value => { searchMulti = value }"
          ></SearchForm>
        </div>

        <div v-if="response && response.results.length > 0">
          <span class="results__header">{{ response.total_results }} results found</span>

          <Pagination
            :page="this.response.page"
            :totalPages="this.response.total_pages"
            @clickPrev="submitSearch('prev')"
            @clickNext="submitSearch('next')"
          ></Pagination>

          <div class="flex">
            <div v-for="item in response.results" :key="item.id" class="half">
              <MovieItem :movie="item" :genres="genres"></MovieItem>
            </div>
          </div>

          <Pagination
            :page="this.response.page"
            :totalPages="this.response.total_pages"
            @clickPrev="submitSearch('prev')"
            @clickNext="submitSearch('next')"
          ></Pagination>
        </div>
        <div v-if="response && response.results.length === 0">
          <span class="results__noResults">Sorry, no results for your search query. <br>Try something else!</span>
        </div>

      </div>
    </div>
    <PageFooter></PageFooter>
  </div>
</template>

<script>
import MovieItem from 'Components/MovieItem'
import SearchForm from 'Components/SearchForm'
import Pagination from 'Components/Pagination'
import PageFooter from 'Components/PageFooter'

export default {
  name: 'app',
  components: {
    MovieItem,
    SearchForm,
    Pagination,
    PageFooter
  },
  data () {
    return {
      searchQuery: '',
      searchMulti: '',
      response: null,
      genres: {}
    }
  },
  methods: {
    submitSearch (page) {
      let newPage
      if (page === 'prev') {
        newPage = this.response.page - 1
      } else if (page === 'next') {
        newPage = this.response.page + 1
      }
      let apiurl
      if (this.searchMulti === true) {
        apiurl = '//api.themoviedb.org/3/search/multi'
      } else {
        apiurl = '//api.themoviedb.org/3/search/movie'
      }
      this.axios({
        method: 'get',
        url: apiurl,
        params: {
          api_key: 'e1ec2150347d3951cdc3ac53519ae254',
          query: this.searchQuery,
          include_adult: false,
          page: newPage,
          language: 'en-US'
        }
      }).then(res => {
        this.response = res.data
      }).catch(err => {
        window.alert(err)
      })
    },
    setGenres () {
      this.axios({
        method: 'get',
        url: '//api.themoviedb.org/3/genre/movie/list',
        params: {
          api_key: 'e1ec2150347d3951cdc3ac53519ae254'
        }
      }).then(res => {
        this.genres = res.data.genres
      }).catch(err => {
        window.alert(err)
      })
    }
  },
  mounted () {
    this.setGenres()
  }
}
</script>

<style>
  /*
   * General styles
   */
  html, body {
      color: #222;
      font-size: 1em;
      line-height: 1.4;
      font-family: 'Roboto', Helvetica, Arial, sans-serif;
      background: #f5f5f5;
      padding: 0;
      margin: 0;
    }
  .pageContent {
    overflow: hidden;
    min-height: calc(100vh - 100px);
    padding-bottom: 60px;
    box-sizing: border-box;
  }
  .inside {
    width: 100%;
    max-width: 1140px;
    margin: 0 auto;
    position: relative;

    max-width: 1366px;
    box-sizing: border-box;
    padding: 0 40px;
    @media (max-width: 768px) {
      padding: 0 20px;
    }
  }

  .flex {
    display: flex;
    flex-wrap: wrap;
    margin: 0 -20px;
    @media (max-width: 768px) {
      margin: 0 -10px;
    }
  }
    .half {
      width: 50%;
      padding: 20px;
      box-sizing: border-box;
      @media (max-width: 1200px) {
        width: 100%;
      }
      @media (max-width: 768px) {
        padding: 10px;
      }
    }

  /*
   * Header and intro
   */
  .logo {
    font-size: 9vmin;
    color: #131a22;
    text-transform: uppercase;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-align: center;
    margin: 10vh 0;
    @media (max-width: 768px) {
      font-size: 44px;
    }
  }
  .introWrap {
    width: 600px;
    margin: 0 auto 40px;
    @media (max-width: 768px) {
      width: auto;
    }
  }
    .introText {
      font-size: 18px;
      line-height: 1.6;
      font-weight: 300;
      & > strong {
        font-weight: 400;
      }
      & > a {
        font-weight: 400;
        color: inherit;
        &:hover {
          text-decoration: none;
        }
      }
    }

  /*
   * Stray results elements
   */
  .results__header {
    display: block;
    text-align: right;
    margin: 40px 0 20px;
  }
    .results__noResults {
      font-size: 28px;
      font-weight: 500;
      text-align: center;
      margin: 80px 0 40px;
      display: block;
    }

  /*
   * Stray global elements
   */
  .button {
    font-size: 14px;
    height: 40px;
    width: 120px;
    border: 0;
    letter-spacing: 0.02em;
    outline: 0;
    cursor: pointer;
    background: #131a22;
    color: #fff;
  }
</style>
