
<template>

  <div id="app">

    <article>
      <img :src="playerData.avatarURL !== undefined ? playerData.avatarURL : 'res/avatar.png'">
      <div>Name: {{ playerData.username}}</div>
      <div>Idle time: {{ secondsToHumanTime(playerData.idle) }}</div>
      <div>Money: ¥{{ playerData.money }}</div>
      <div>Cards: Todo</div>
      <div>Title: {{ playerData.title }}</div>
    </article>

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

const time = require('./lib/time.js');

export default {
  
  name: 'app',

  methods: {
    secondsToHumanTime: time.secondsToHumanTime,
  },
  
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
