export const layout = 'mainLayout.tmpl.js'

export const aromae = {"Flowers":["Iris","Peony","Elderflower","Acacia","Lilac","Jasmine","Honeysuckle","Violet","Lavender","Rose","Potpourri","Hibiscus","Citrus","Lime","Lemon","Grapefruit","Orange","Marmalade"],"Tree Fruit":["Quince","Apple","Pear","Nectarine","Peach","Apricot","Persimmon"],"Tropical Fruit":["Pineapple","Mango","Guava","Passion Fruit","Lychee","Bubblegum"],"Red Fruit":["Cranberry","Red Plum","Pomegranate","Sour Cherry","Strawberry","Cherry","Raspberry"],"Black Fruit":["Boysenberry","Black Currant","Black Cherry","Plum","Blackberry","Blueberry","Olive"],"Dried Fruit":["Raisin","Fig","Date","Fruitcake"],"Noble Rot":["Beeswax","Ginger","Honey"],"Spice":["White Pepper","Red Pepper","Black Pepper","Cinnamon","Anise","5-Spice","Fennel","Eucalyptus","Mint","Thyme"],"Vegetable":["Grass","Tomato Leaf","Gooseberry","Bell Pepper","Jalapeño","Bitter Almond","Tomato","Sun-Dried Tomato","Black Tea"],"Earth":["Clay Pot","Slate","Wet Gravel","Potting Soil","Red Beet","Volcanic Rocks","Petroleum"],"Microbial":["Butter","Cream","Sourdough","Lager","Truffle","Mushroom"],"Oak Aging":["Vanilla","Coconut","Baking Spices","Cigar Box","Smoke","Dill"],"General Aging":["Dried Fruit","Nutty Flavors","Tobacco","Coffee","Cocoa","Leather"],"Cork Taint (TCA)":["Musty Cardboard","Wet Dog"],"Madeirized (or Cooked)":["Toffee","Stewed Fruit"],"Volatile Acidity (Acetic Acid)":["Vinegar","Nail Polish Remover"],"Sulfides & Mercaptans":["Cured Meat","Boiled Eggs","Burnt Rubber","Lit Match","Garlic","Onion","Cat Pee"],"Brettanomyces":["Black Cardamon","Band-Aid","Sweaty Leather Saddle","Horse Manure"]}

export const sheets = ['wine-taster/index.css']
export const scripts = ['wine-taster/index.js']

export default props => {
	return (
		<body>
			<main>
				<h1>epic wine tasting companion</h1>
				<h2>wine regions TODO</h2>
				<h2>wine taste wheel TODO</h2>
				<form id='wheel'>
					<ul>
						{Object.entries(aromae).map(([primary, secondaries]) => (
							<li>
								<label>
									<input type="checkbox" name='primary' id={primary}/> {primary}
								</label>
								<ul>
									{secondaries.map(secondary => (
										<li>
											<label>
												<input type="checkbox" name={primary} id={secondary}/> {secondary}
											</label>
										</li>
									))}
								</ul>
							</li>
						))}
					</ul>
				</form>
				<h2>wine color thing TODO</h2>
			</main>
		</body>
	)
}
