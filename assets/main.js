let renderItems = (data) => {
	let containerEl = document.querySelector('#font-list');
	containerEl.innerHTML = '';

	data.forEach(item => {
		let itemHtml = `
		<li>
			<h2>${item['name']}</h2>
			<p>${item['category']}</p>
			<p>${item['usage']}</p>
			<p>${item['language']}</p>
			<p>${item['source']}</p>
			<p>${item['weight_option']}</p>
			<p><a href="${item['url']}" target="_blank">Font Link</a></p>
		</li>
		`;
		containerEl.insertAdjacentHTML('beforeend', itemHtml);
	});
};

let filterFonts = (data) => {
	let selectedCategory = document.querySelector('#category-filter').value;
	let selectedUsage = document.querySelector('#usage-filter').value;
	let selectedLanguage = document.querySelector('#language-filter').value;

	let filteredData = data.filter(item => {
		return (selectedCategory === 'all' || item.category === selectedCategory) &&
		(selectedUsage === 'all' || item.usage === selectedUsage) && 
		(selectedLanguage === 'all' || item.language === selectedLanguage);
	});

	renderItems(filteredData);
};



fetch('assets/data.json')
.then(response => response.json())
	.then(data => {
		renderItems(data);
		// And passes the data to the function, above!

		document.querySelector('#category-filter').addEventListener('change', () => {
			filterFonts(data);
		});
		document.querySelector('#usage-filter').addEventListener('change', () => {
			filterFonts(data);
		});
		document.querySelector('#language-filter').addEventListener('change', () => {
			filterFonts(data);
		});
	});