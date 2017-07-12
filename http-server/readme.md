
## boo: idletcg discord bot
Join the game, maintain a connection, receive trading cards for your time, collect them all~

## features
- Create your own cards
- Categorize booster boxes
- Reward players for idling with random boxes
- One card per box rewarded at random
- Includes setup script to generate a pokemon dataset
- Allow players to flaunt their progress

## install
```
npm install
# <set discord bot token in boo.env>
# <configure config.js>
node boo.js
```

## pokemon dataset
The pokemon dataset will generate a card for every pokemon, including image data sourced from bulbapedia, and will categorize booster boxes per generation.
```
npm run setup:pokemon
```

## example
![Opening a booster box](http://i.imgur.com/klZlP6m.png)
