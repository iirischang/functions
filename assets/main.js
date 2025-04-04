let renderItems = (data) => {
	let containerEl = document.querySelector('#font-list');
	containerEl.innerHTML = '';

	data.forEach(item => {
		let fontFamily;
		if (item['name'] === 'Work Sans') {
			fontFamily = 'Work Sans, san-serif';
		} else if (item['name'] === 'Libre Franklin') {
			fontFamily = 'Libre Franklin, san-serif';
		} else if (item['name'] === 'Rubik') {
			fontFamily = 'Rubik, san-serif';
		} else if (item['name'] === 'DM Sans') {
			fontFamily = 'DM Sans, san-serif';
		} else if (item['name'] === 'Mulish') {
			fontFamily = 'Mulish, san-serif';
		} else if (item['name'] === 'Barlow') {
			fontFamily = 'Barlow, san-serif';
		} else if (item['name'] === 'Karla') {
			fontFamily = 'Karla, san-serif';
		} else if (item['name'] === 'Manrope') {
			fontFamily = 'Manrope, san-serif';
		} else if (item['name'] === 'Chivo') {
			fontFamily = 'Chivo, san-serif';
		} else if (item['name'] === 'Playfair Display') {
			fontFamily = 'Playfair Display, san-serif';
		} else if (item['name'] === 'EB Garamond') {
			fontFamily = 'EB Garamond, san-serif';
		} else if (item['name'] === 'Crimson Text') {
			fontFamily = 'Crimson Text, san-serif';
		} else if (item['name'] === 'Gilda Display') {
			fontFamily = 'Gilda Display, san-serif';
		} else if (item['name'] === 'Kosugi Maru') {
			fontFamily = 'Kosugi Maru, san-serif';
		} else if (item['name'] === '思源黑體') {
			fontFamily = 'Noto Sans TC, san-serif';
		} else if (item['name'] === 'ももちどり') {
			fontFamily = 'Momochidori, san-serif';
		} else if (item['name'] === 'こすぎ まる') {
			fontFamily = 'Kosugi Maru, san-serif';
		} else {
			fontFamily = 'sans-serif'
		}

		let itemHtml = `
		<li>
			<h2 style="font-family: ${fontFamily};">${item['name']}</h2>
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
	let selectedSource = document.querySelector('#source-filter').value;

	let filteredData = data.filter(item => {
		return (selectedCategory === 'all' || item.category === selectedCategory) &&
		(selectedUsage === 'all' || item.usage === selectedUsage) && 
		(selectedLanguage === 'all' || item.language === selectedLanguage) && 
		(selectedSource === 'all' || item.source === selectedSource);
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
		document.querySelector('#source-filter').addEventListener('change', () => {
			filterFonts(data);
		});
	});