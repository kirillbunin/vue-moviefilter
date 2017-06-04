<template>
  <div class="movieItem__wrap" :href="'movie/' + movie.id">
    <div class="movieItem__posterWrap">
      <img v-if="movie.poster_path" :src="'//image.tmdb.org/t/p/w185' + movie.poster_path" :alt="movie.title" class="movieItem__poster">
    </div>
    <div class="movieItem__contentWrap">
      <div class="movieItem__headerRow">
        <strong class="movieItem__title">{{ movie.title || movie.name || movie.original_name }}</strong>
        <span class="movieItem__rating">{{ movie.vote_average }} <span class="movieItem__ratingIcon">&#9733;</span></span>
      </div>
      <div class="movieItem__headerRow">
        <span class="movieItem__year"><span v-if="movie.release_date || movie.first_air_date">&#128198;	{{ new Date(movie.release_date || movie.first_air_date).getFullYear() }}</span></span>
        <span class="movieItem__categories">{{ this.categories.join(', ') }}</span>
      </div>
      <p class="movieItem__overview">{{ overview }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  props: {
    movie: {
      type: Object,
      required: true
    },
    genres: {
      type: Array,
      required: true
    }
  },
  computed: {
    categories () {
      const ids = this.movie.genre_ids
      let list = []
      ids.forEach((id) => {
        this.genres.forEach((genre) => {
          if (genre.id === id) {
            list.push(genre.name)
          }
        })
      })
      return list
    },
    overview () {
      const string = this.movie.overview
      if (string.length > 260) {
        return string.substring(0, 257) + '...'
      } else {
        return string
      }
    }
  },
  methods: {
  }
}
</script>

<style>
.movieItem__wrap {
  width: 100%;
  background: #fff;
  &::before,
  &::after {
    content: "";
    display: table;
    clear: both;
  }
}
  .movieItem__posterWrap {
    background: #333;
    width: 185px;
    height: 260px;
    overflow: hidden;
    position: relative;
    float: left;
  }
    .movieItem__poster {
      position: absolute;
      width: 100%;
      margin: auto;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
    }
  .movieItem__contentWrap {
    padding: 20px;
    overflow: hidden;
  }
    .movieItem__headerRow {
      display: flex;
      align-items: center;
      justify-content: space-between;
      line-height: 1.8;
    }
      .movieItem__title {
        display: block;
        font-size: 20px;
        font-weight: 400;
        padding-right: 20px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
      .movieItem__rating {
        font-size: 20px;
        line-height: 20px;
        font-weight: 500;
        display: flex;
        align-items: center;
      }
      .movieItem__ratingIcon {
        font-size: 26px;
        margin-left: 4px;
      }
      .movieItem__year {
        display: block;
        font-size: 14px;
        white-space: nowrap;
        padding-right: 20px;
      }
      .movieItem__categories {
        font-size: 14px;
        color: #666;
        font-style: italic;
        letter-spacing: 0.02em;
        text-align: right;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
    .movieItem__overview {
      line-height: 1.4;
      font-size: 14px;
      margin: 20px 0;
    }
</style>
