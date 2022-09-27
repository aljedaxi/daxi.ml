const next = f => e => {
  const path = window.location.pathname.split('/')
  const idx = f (parseInt(path.filter(Boolean).at(-1), 10))
  const newPath = `collections/slides/${path[3]}/${idx}`
  window.location.href = new URL(newPath, window.location.origin)
}
const actions = {
  32: next(n => n + 1),
  39: next(n => n + 1),
  37: next(n => n - 1),
}
document.body.onkeyup = e => actions[e.keyCode]?.(e)
