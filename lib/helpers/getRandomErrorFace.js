const rnd = (min, max) => Math.floor(Math.random() * (max - min)) + min
const faces = [
  '¯\\_(ツ)_/¯',
  '(/¯◡ ‿ ◡)/¯ ~ ┻━┻',
  '(ノಠ ∩ಠ)ノ彡 ┻━┻',
  '(ノಠ益ಠ)ノ彡 ┻━┻',
  '୧༼ಠ益ಠ༽୨',
  'ε(´סּ︵סּ`)з',
  'ᕙ(⇀‸↼‶)ᕗ',
]

const getRandomErrorFace = () => faces[rnd(0, faces.length)]

module.exports = getRandomErrorFace
