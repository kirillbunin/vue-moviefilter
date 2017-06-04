<template>
  <form class="form" @submit.prevent="formSubmit">
    <div class="form__inputWrap">
      <label class="form__label" for="searchBox">Search query</label>
      <input class="form__input" id="searchBox" type="text" :value="queryValue" @input="updateValue($event.target.value)">
      <input class="button form__submit" type="submit" value="Search" />
    </div>
    <div style="form__inputWrap">
      <input id="searchCheckbox" type="checkbox" :checked="checkboxValue" @change="updateCheckbox($event.target.checked)">
      <label for="searchCheckbox" class="form__label is--inline">Search in description</label>
    </div>
  </form>
</template>

<script>
export default {
  props: {
    queryValue: {
      required: true
    },
    checkboxValue: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    formSubmit () {
      this.$emit('formSubmit')
    },
    updateValue (value) {
      this.$emit('queryChange', value)
    },
    updateCheckbox (value) {
      console.log(value)
      this.$emit('checkboxChange', value)
    }
  }
}
</script>

<style>
  .form__inputWrap {
    margin: 8px 0;
    &::before,
    &::after {
      content: "";
      display: table;
      clear: both;
    }
  }
    .form__label {
      display: block;
      margin: 0 0 4px;
      font-size: 14px;
      opacity: .6;
      font-weight: 500;
      &.is--inline {
        display: inline-block;
      }
    }
    .form__input {
      width: calc(100% - 120px);
      height: 40px;
      padding: 0 10px;
      box-sizing: border-box;
      float: left;
    }
    .form__submit {
      float: right;
    }
</style>
