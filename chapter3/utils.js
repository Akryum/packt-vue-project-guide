function getWorldRatio () {
  return 1 / 1920 * window.innerWidth
}

function forEachPlayer (cb) {
  for (let p = 1; p <= 2; p++) {
    cb(state.players[p])
  }
}
