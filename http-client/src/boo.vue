
<template>

  <div id="app">

    <article class="box" v-for="(cards, booster, _) in cardCollection">
      <h1>{{ booster }}</h1>
      <div v-for="card in cards">
        <div :class="{'not-found' : playerData.cards[card.id] !== 1}"> 
          <img :alt="card.text" :src="card.img">
          <div>#{{ card.id }} - {{ card.text }}</div>
        </div>
      </div>
    </article>
  
  </div>

</template>

<script>

export default {
  
  name: 'app',

  /*created() {
    this.cardCollection = cards;
  },*/
  
  data () {
    return {
      cardCollection: cards,
      playerData: playerData,
    }
  }

}

</script>

<style>

.not-found {
  opacity: 0.2;
}

</style>
