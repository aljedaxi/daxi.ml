const TextArea = () => (
	<div style={{gridColumn: 'span 2'}}>
		<textarea style={{width: '100%'}}/>
	</div>
)
const Box = ({children, label, hint}) => {
	return (
		<>
			{label}
			{hint}
			{children}
		</>
	)
}
const TitleLabel = ({children, htmlFor}) => (
	<h2 style={{display: 'inline', paddingInlineEnd: 5, margin: 0}}>
		<label htmlFor={htmlFor}>
			{children}
		</label>
	</h2>
)
const SmallerLabel = ({children, htmlFor}) => (
	<h3 style={{display: 'inline', paddingInlineEnd: 5, margin: 0}}>
		<label htmlFor={htmlFor}>
			{children}
		</label>
	</h3>
)
const ElBigInput = ({children, hint}) => {
	const id = children.replace(/\s/g, '-')
	return (
		<Box label={<TitleLabel>{children}</TitleLabel>} hint={hint}>
		</Box>
	)
}
const ElSmallInput = ({children, hint}) => {
	const id = children.replace(/\s/g, '-')
	return (
		<Box label={<SmallerLabel htmlFor={id}>{children}</SmallerLabel>} hint={hint}>
		<textarea id={id} name={children}></textarea>
		</Box>
	)
}
const Input = ({children, type = 'text'}) => (
	<>
		<TitleLabel htmlFor={children}>
			{children}
		</TitleLabel>
		<input id={children} type={type} name={children} />
	</>
)
export default props => {
	return (
		<body style={{display: 'grid', gap: 4, gridTemplateColumns: 'repeat(2, 1fr 2fr)', alignItems: 'baseline'}}>
			<h1 style={{margin: 0, gridColumn: 'span 4'}}>Backbriefing form</h1>
			<p style={{gridColumn: 'span 4'}}>
				This is from the nifty talk <a href="https://www.youtube.com/watch?v=w6VtTlHf4wo&t=1693s">Let's (not) get rid of all the managers!</a>, a deeply quick implementation of her back-brefing form, and therein, a mode of project planning.
			</p>
			<Input>Title</Input>
			<Input>Owner</Input>
			<ElBigInput hint='The critical challenge or opportunity is...'>Context</ElBigInput>
			<ElBigInput hint='The people and skills we need are...'>Team</ElBigInput>
			<TextArea/>
			<TextArea/>
			<ElBigInput hint='Our goals are to...'>Intent</ElBigInput>
			<TitleLabel htmlFor='id'>Boundaries</TitleLabel> <div/>
			<TextArea/>
			<div style={{gridColumn: 'span 2', gap: 4, display: 'grid', gridTemplateColumns: '1fr 1fr'}}>
				<div>
					<SmallerLabel>Freedoms</SmallerLabel>
					<TextArea></TextArea>
				</div>
				<div>
					<SmallerLabel>Constraints</SmallerLabel>
					<TextArea></TextArea>
				</div>
			</div>
			<ElBigInput hint='This helps the business to...'>Higher Intent</ElBigInput>
			<ElBigInput hint='The hypothesis we will test are...'>Plan</ElBigInput>
			<TextArea/>
			<TextArea/>
		</body>
	)
}
