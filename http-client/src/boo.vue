
<template>

  <div id="app">
    <article class="box" v-for="post in posts">
      <h1>{{ post.title }}</h1>
      <p>{{ post.body }}</p>
    </article>
  </div>

</template>

<script>

export default {
  
  name: 'app',
  
  data () {
    return {
      posts: [
        {title: 'First post', body: 'Lorem ipsum dolor sit amet'},
        {title: 'Second post', body: 'Lorem ipsum dolor sit amet'}
      ]
    }
  }

}

</script>

<style>

</style>
