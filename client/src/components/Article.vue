<template>
<div>
  <div v-for="(value,index) in article" :value="value" :key="index" class="list-group">
  <a href="#" class="list-group-item list-group-item-action">
    <h4 class="list-group-item-heading">{{value.title}}</h4>
    <p class="list-group-item-text">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
  </a>
</div>

</div>
</template>

<script>
import {mapActions,mapState} from 'vuex'
export default {
computed: {
  ...mapState([
    'article'
  ])
},
methods:{
  ...mapActions([
    'getArticle'
  ])
},
created(){
  this.getArticle()
}
}
</script>

<style>

</style>
