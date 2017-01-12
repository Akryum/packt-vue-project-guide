let cards = [
  {
    id: 'catapult',
    type: 'attack',
    title: 'Catapult',
    description: 'Spend 2 <b>Food</b><br>Deal 2 <b>Damage</b>',
    play (player, opponent) {
      player.food -= 2
      opponent.health -= 2
    },
  },
  {
    id: 'trebuchet',
    type: 'attack',
    title: 'Trebuchet',
    description: 'Spend 1 <b>Food</b><br>Take 1 <b>Damage</b><br>Deal 4 <b>Damage</b>',
    play (player, opponent) {
      player.food -= 1
      player.health -= 1
      opponent.health -= 4
    },
  },
  {
    id: 'repair',
    type: 'support',
    title: 'Repair',
    description: 'Skip your next turn<br>Repair 4 <b>Damage</b>',
    play (player, opponent) {
      player.skipTurn = true
      player.health += 4
    }
  },
  {
    id: 'quick-repair',
    type: 'support',
    title: 'Quick Repair',
    description: 'Spend 3 <b>Food</b><br>Repair 3 <b>Damage</b>',
    play (player, opponent) {
      player.food -= 3
      player.health += 3
    }
  },
  {
    id: 'farm',
    type: 'support',
    title: 'Farm',
    description: 'Skip your next turn<br>Gather 4 <b>Food</b>',
    play (player, opponent) {
      player.skipTurn = true
      player.food += 4
    },
  },
  {
    id: 'poison',
    type: 'special',
    title: 'Poison the Granary',
    description: 'Spend 1 <b>Food</b><br>Your opponent loose 3 <b>Food</b>',
    play (player, opponent) {
      player.food -= 1
      opponent.food -= 3
    },
  },
  {
    id: 'fireball',
    type: 'special',
    title: 'Fireball',
    description: 'Take 1 <b>Damage</b><br>Skip your turn<br>Deal 4 <b>Damage</b>',
    play (player, opponent) {
      player.health -= 1
      player.skipTurn = true
      opponent.health -= 4
    },
  },
]

cards = cards.reduce((map, card) => {
  map[card.id] = card
  return map
}, {})

let pile = {
  catapult: 6,
  trebuchet: 4,
  repair: 3,
  'quick-repair': 2,
  farm: 3,
  poison: 2,
  fireball: 2,
}
