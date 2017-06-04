<template>
  <div class="pagination">
    <button class="button pagination__previous" @click="() => { this.$emit('clickPrev') }" :disabled="this.page === 1">Previous</button>
    <span class="pagination__pages" v-html="this.page + ' / ' + this.totalPages"></span>
    <button class="button pagination__next" @click="() => { this.$emit('clickNext') }" :disabled="this.page >= this.totalPages">Next</button>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  props: {
    page: {
      type: Number,
      required: true,
      default: 1
    },
    totalPages: {
      type: Number,
      required: true,
      default: 1
    }
  }
}
</script>

<style>

.pagination {
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
}
  .pagination__previous,
  .pagination__next {
    border: 0;
    outline: 0;
    cursor: pointer;
    &[disabled] {
      cursor: default;
    }
  }
  .pagination__previous {}
  .pagination__pages {
    font-size: 18px;
    line-height: 40px;
  }
  .pagination__next {}
</style>
