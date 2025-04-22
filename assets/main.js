
const supportedFonts = [
	"work-sans", "libre-franklin", "rubik", "dm-sans", "mulish",
	"barlow", "karla", "manrope", "chivo", "kensington",
	"pressio", "jali-latin", "itc-avant-garde-gothic", "brisbane", "effra-cc",
	"venn", "asterisk-sans", "config", "vina-sans", "hatch-sans",
	"climate-crisis", "cerulya-cf", "kit", "neulis-sans", "playfair-display",
	"eb-garamond", "crimson-text", "gilda-display", "momochidori", "adobe-jenson",
	"benton-modern-display", "cormorant", "mestiza", "mastro", "anth",
	"maregraphe", "meursault", "the-seasons", "presti-text", "begum",
	"moret", "lust-didone", "fields-display", "tuppence", "marlide-display",
	"winsel", "yink", "ivyora", "sigurd", "sayer-interview-mn",
	"new-science", "hepta-slab", "lone-pine", "enra-slab", "clarendon-wide-sketch",
	"alfa-slab-one", "shrikhand", "outfit", "totalblack", "omnes",
	"ojuju", "citrine", "scale", "hanken", "fredoka",
	"amplitude", "filicudi", "area", "reross"
  ];

let renderItems = (data) => {
	let containerEl = document.querySelector('#font-list');
	containerEl.innerHTML = '';

	data.forEach(item => {
		const fontFamily = supportedFonts.includes(item.cssName)
		? `${item.cssName}, sans-serif`
		:"sans-serif";

		let itemHtml = `
		<li class="font-card">
			<h3 class="font-name" style="font-family: ${fontFamily};">${item['name']}</h3>
			<p class="font-link"><a href="${item['url']}" target="_blank">Link</a></p>
		</li>
		`;

		containerEl.insertAdjacentHTML('beforeend', itemHtml);
	});
};

// let filterFonts = (data) => {
// 	let selectedCategory = document.querySelector('#category-filter').value;
// 	let selectedUsage = document.querySelector('#usage-filter').value;
// 	let selectedLanguage = document.querySelector('#language-filter').value;
// 	let selectedSource = document.querySelector('#source-filter').value;

// 	let filteredData = data.filter(item => {
// 		return (selectedCategory === 'all' || item.category === selectedCategory) &&
// 		(selectedUsage === 'all' || item.usage === selectedUsage) && 
// 		(selectedLanguage === 'all' || item.language === selectedLanguage) && 
// 		(selectedSource === 'all' || item.source === selectedSource);
// 	});

// 	renderItems(filteredData);
// };



// popup
	/* I wanted to create Popup Modal */
	/* I found this tutorial: https://wisepops.com/blog/html-popup */
	/* This script helps me understand how to create a popup modal */
		
	document.addEventListener('DOMContentLoaded', function() {
		const popupOverlay =
		document.getElementById('popupOverlay');
		const popup = document.getElementById('popup');

		// open
	function openPopup() {
		popupOverlay.style.display = 'block';
	}
	// close
	function closePopupFunc() {
		popupOverlay.style.display = 'none';
	}
	
	openPopup();
	
	closePopup.addEventListener('click', closePopupFunc);
	popupOverlay.addEventListener('click', function(event){
		if(event.target === popupOverlay){
			closePopupFunc();
		}
	});
	});
	


// multistep form

	/* I wanted to create Multistep Form Functional */
	/* I found this tutorial: https://levelup.gitconnected.com/create-a-multi-step-form-using-html-css-and-javascript-30aca5c062fc */
	/* This script defines a function to navigate between form steps. */
	
	let formSubmitted = false;
	// form
	const navigateToFormStep = (stepNumber) => {
		// hide all steps
		document.querySelectorAll(".form-step").forEach((formStepElement) => {
			formStepElement.classList.add("d-none");
		});

		// mark-steps-as-unfinished
		document.querySelectorAll(".form-stepper-list").forEach((formStepHeader) => {
			formStepHeader.classList.add("form-stepper-unfinished");
			formStepHeader.classList.remove("form-stepper-active", "form-stepper-completed")
		});

		// show-current-step
		document.querySelector("#step-" + stepNumber).classList.remove("d-none");
		
		// select-form-step
		const formStepCircle = document.querySelector('li[step="' + stepNumber + '"]');

		// mark-as-active
		formStepCircle.classList.remove("form-stepper-unfinished", "form-stepper-completed");
		formStepCircle.classList.add("form-stepper-active");

		document.querySelectorAll(".form-stepper-list").forEach((stepEl, index) => {
			const label = stepEl.querySelector(".label");
			if (index + 1 === stepNumber) {
				label.classList.remove("muted");
			} else {
				label.classList.add("muted");
			}
		});

		// loop-through-each-step
		for (let index = 0; index < stepNumber; index++) {

			// select-form-step
			const formStepCircle = document.querySelector('li[step="' + index + '"]');

			// check
			if (formStepCircle) {

				// mark-as-completed
				formStepCircle.classList.remove("form-stepper-unfinished", "form-stepper-active");
				formStepCircle.classList.add("form-stepper-completed");
			}
		}

			// hide list at other step
			if (formSubmitted && stepNumber < 3) {
				document.getElementById('results-container').style.display = 'none';
			} else if (formSubmitted && stepNumber === 3) {
				document.getElementById('results-container').style.display = 'block';
			}
			
			};



	fetch('assets/data2.json')
		.then(response => response.json())
		.then(data => {	
		setupStepOptions('step1-options', 'step1-next', 'selected-topic');
		setupStepOptions('step2-options', 'step2-next', 'selected-brand');
		setupStepOptions('step3-options', 'step3-btn', 'selected-usage');

		document.querySelectorAll(".btn-navigate-form-step").forEach((formNavigationBtn) => {
			formNavigationBtn.addEventListener("click", () => {
				const stepNumber = parseInt(formNavigationBtn.getAttribute("step_number"));
				navigateToFormStep(stepNumber);
			});
		});

		document.getElementById('userAccountSetupForm').addEventListener('submit', function(e) {
			e.preventDefault();
			formSubmitted = true;

			const topic = document.getElementById('selected-topic').value;
			const brand = document.getElementById('selected-brand').value;
			const usage = document.getElementById('selected-usage').value;

			document.getElementById('results-container').style.display = 'block';

			const filteredData = data.filter(item => {
				return  item.topics?.includes(topic) &&
						item.brands?.includes(brand) &&
						item.usages?.includes(usage) ;
			});

			renderItems(filteredData);

			document.getElementById('results-container').scrollIntoView ({
				behavior: 'smooth',
				block: 'start'
			});

		});

		// restart button
		document.getElementById('restart-btn').addEventListener('click', function() {
		
		// restart form
		document.getElementById('userAccountSetupForm').reset();
		formSubmitted = false;

		// delete all
		document.querySelectorAll('.option-btn').forEach(btn => {
			btn.classList.remove('selected');
		});
		document.getElementById('step1-next').disabled = true;
		document.getElementById('step2-next').disabled = true;
		document.getElementById('step3-btn').disabled = true;

		document.getElementById('results-container').style.display = 'none';

		navigateToFormStep(1);
		});
	});


	// steps
	function setupStepOptions(optionsId, nextBtnId, hiddenInputId) {
		const optionButtons = document.querySelectorAll(`#${optionsId} .option-btn`);
		const nextButton = document.getElementById(nextBtnId);

		let selectedValues = [];

		optionButtons.forEach(button => {
			button.addEventListener("click", () => {

				optionButtons.forEach(btn => btn.classList.remove("selected"));

				// select one
				button.classList.add("selected");
				const value = button.getAttribute("data-value");
				document.getElementById(hiddenInputId).value = value;

				nextButton.disabled = false;

				// if(selectedValues.includes(value)) {
				// 	selectedValues = selectedValues.filter(v => v !== value);
				// } else {
				// 	selectedValues.push(value);
				// }
				// document.getElementById(hiddenInputId).value = selectedValues.join(", ")
				// nextButton.disabled = selectedValues.length === 0;
			});
		});
	}