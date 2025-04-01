let renderItems = (data) => {
	let containerEl = document.querySelector('#font-list')

	data.forEach(item => {
		let itemHtml = `
		<li>
			<h2>${item['name']}</h2>
			<p>${item['category']}</p>
			<p>${item['usage']}</p>
			<p>${item['language']}</p>
			<p>${item['source']}</p>
			<p>${item['weight_option']}</p>
			<p>${item['url']}</p>
		</li>
		`
		containerEl.insertAdjacentHTML('beforeend', itemHtml)
	})
}




fetch('assets/data.json')
.then(response => response.json())
	.then(data => {
		// And passes the data to the function, above!
		renderItems(data)
	})