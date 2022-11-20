const trace = s => (console.log(s), s)
const propify = props => !props.length ? '' : ' ' + props.map(([k, v]) => (
	`${k}="${v}"`
))
export const jsx = (type, {children: c, ...props}, key) => {
	const children = Array.isArray(c) ? c : [c]
	return typeof type === 'string'
		? `<${type}${propify(Object.entries(props))}>${children.join('')}</${type}>`
		: type({children: children.join(''), ...props})
}
export const jsxs = jsx
