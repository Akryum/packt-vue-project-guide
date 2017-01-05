var cards = {
  catapult: {
    id: 'catapult',
    type: 'attack',
    title: 'Catapult',
    description: 'Spend 2 <b>Food</b><br>Deal 2 <b>Damage</b>',
    play (player, opponent) {
      player.food -= 2
      opponent.health -= 2
    }
  },
  repair: {
    id: 'repair',
    type: 'support',
    title: 'Repair',
    description: 'Skip your next turn<br>Repair 4 <b>Damage</b>',
    play (player) {
      player.skipTurn = true
      player.health += 4
    }
  }
}

var pool = {
  catapult: 8,
  repair: 4,
}
