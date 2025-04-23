
const supportedFonts = [
	"Work Sans", "Libre Franklin", "Rubik", "DM Sans", "Mulish",
	"Barlow", "Karla", "Manrope", "Chivo", "kensington",
	"pressio", "jali-latin-variable", "itc-avant-garde-gothic", "brisbane", "effra-cc",
	"venn", "asterisk-sans-variable", "config-variable", "vina-sans", "hatch-sans",
	"climate-crisis-variable", "cerulya-cf", "kit-rounded", "neulis-sans", "Playfair Display",
	"EB Garamond", "Crimson Text", "Gilda Display", "momochidori",
	"benton-modern-display", "cormorant", "mestiza", "mastro-display", "anth",
	"maregraphe-variable", "meursault-variable", "the-seasons", "presti-text", "begum",
	"moret-variable", "lust-didone", "fields-display", "tuppence-variable", "marlide-display-variable",
	"winsel-variable", "yink", "ivyora-display", "sigurd", "sayer-interview-mn",
	"new-science", "hepta-slab", "lone-pine", "enra-slab-variable", "clarendon-wide-sketch",
	"Alfa Slab One", "Shrikhand", "Outfit", "totalblack-variable", "omnes-variable",
	"Ojuju", "citrine-variable", "scale-variable", "Hanken Grotesk", "fredoka-variable",
	"amplitude", "filicudi-solid", "area-variable", "reross-rectangular"
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
		document.getElementById('diveBtn').addEventListener('click', () => {
			closePopupFunc();
			navigateToFormStep(1);
			setTimeout(() => {
				const firstQuestion = document.querySelector('#step-1 h2');
				if (firstQuestion) {
				  firstQuestion.scrollIntoView({ behavior: 'smooth' });
				}
			  }, 200);
			});
	
	openPopup();
	
	closePopup.addEventListener('click', closePopupFunc);
	popupOverlay.addEventListener('click', function(event){
		if(event.target === popupOverlay){
			closePopupFunc();
		}
	});
	});

	// progress click
	document.querySelectorAll('.form-step-label').forEach(label => {
		label.addEventListener('click', () => {
			const step = parseInt(label.getAttribute('data-step'));
			navigateToFormStep(step);
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
				document.querySelector('#font-list').innerHTML = '';
				document.querySelector('.fixed-bottom').style.display = 'none';
			} else if (formSubmitted && stepNumber === 3) {
				document.getElementById('results-container').style.display = 'block';
			
			// reload filter
				const topic = document.getElementById('selected-topic').value;
				const brand = document.getElementById('selected-brand').value;
				const usage = document.getElementById('selected-usage').value;

				const filteredData = window.fullFontData.filter(item =>
					item.topics?.includes(topic) &&
					item.brands?.includes(brand) &&
					item.usages?.includes(usage)
				);
				renderItems(filteredData);
			}
		}



	fetch('assets/data2.json')
		.then(response => response.json())
		.then(data => {	
		window.fullFontData = data;
		setupStepOptions('step1-options', 'step1-next', 'selected-topic');
		setupStepOptions('step2-options', 'step2-next', 'selected-brand');
		setupStepOptions('step3-options', 'step3-btn', 'selected-usage');

		document.querySelectorAll(".btn-navigate-form-step").forEach((formNavigationBtn) => {
			formNavigationBtn.addEventListener("click", () => {
				const stepNumber = parseInt(formNavigationBtn.getAttribute("step_number"));

// alert
	/* I wanted to have an alert if no answer is select */
	/* I found this question post: https://stackoverflow.com/questions/28394198/how-to-make-function-validation-alert-if-not-selected*/
	/* This script helps me created the alert. */

			let valid = true;

			if (stepNumber === 2 && !document.getElementById("selected-topic").value) {
				alert("Pick One Topic First!");
				valid = false;
			} else if (stepNumber === 3 && !document.getElementById("selected-brand").value) {
				alert("Pick a Party Parter First!");
				valid = false;
			}
			if (!valid) return;

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

			const filteredData = window.fullFontData.filter(item => {
				return  item.topics?.includes(topic) &&
						item.brands?.includes(brand) &&
						item.usages?.includes(usage) ;
			});

			renderItems(filteredData);

			// fixed-button
			setTimeout(() => {
				const targetCard = document.querySelectorAll('.font-card')[2];
				const bottomBtn = document.querySelector('.fixed-bottom');

				if (targetCard && bottomBtn) {
					let showObserver = new IntersectionObserver((entries) => {
						let [entry] = entries;

						if(entry.isIntersecting) {
							bottomBtn.style.display = 'block';
							showObserver.disconnect();
						}
					}, {
						rootMargin: '0px 0px -90% 0px'
					});	
					showObserver.observe(targetCard);
				}
			}, 100);
	

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

		document.querySelector('#font-list').innerHTML = '';

		document.querySelector('.fixed-bottom').style.display = 'none';

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

			});
		});
	}


// color picker

	/* I wanted to create color pickers when browsing the font list */
	/* I found this tutorial: https://www.youtube.com/watch?v=DP9-CVgkgDA */
	/* This script helps me know how to create a color picker. */

	/* Moreover, I wanted the color can change when previewing */
	/* I found this tutorial: https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/color */
	/* This script helps me make the preview color work. */


	function applyBackgroundColor(color) {
		// let color = document.getElementById('bgColorPicker').value;
		// document.getElementById('bgColorText').value = color;

		const cards = document.querySelectorAll('.font-card');
		cards.forEach(card => {
			card.style.backgroundColor = color;
		});

	}

	function applyTextColor(color) {
		// let color = document.getElementById('textColorPicker').value;
		// document.getElementById('textColorText').value = color;

		const names = document.querySelectorAll('.font-name');
		names.forEach(name => {
			name.style.color = color;
		});

	}

	// bg color change

	document.getElementById('bgColorPicker').addEventListener('input', function(e) {
		const color = e.target.value;
		document.getElementById('bgColorText').value = color;
		applyBackgroundColor(color);
	});

	document.getElementById('bgColorText').addEventListener('input', function(e) {
		const color = e.target.value;
		document.getElementById('bgColorPicker').value = color;
		applyBackgroundColor(color);
	});

	// text color change

	document.getElementById('textColorPicker').addEventListener('input', function(e) {
		const color = e.target.value;
		document.getElementById('textColorText').value = color;
		applyTextColor(color);
	});

	document.getElementById('textColorText').addEventListener('input', function(e) {
		const color = e.target.value;
		document.getElementById('textColorPicker').value = color;
		applyTextColor(color);
	})

	// reset button

	document.getElementById('resetBtn').addEventListener('click', function() {
		const defaultBgColor = '#1c1c1c';
		const defaultTextColor = '#ffffff';
		const defaultFontSize = 60;

		document.getElementById('bgColorText').value = defaultBgColor;
		document.getElementById('bgColorPicker').value = defaultBgColor;
		document.getElementById('textColorText').value = defaultTextColor;
		document.getElementById('textColorPicker').value = defaultTextColor;

		applyBackgroundColor(defaultBgColor);
		applyTextColor(defaultTextColor);

		document.getElementById('slider').value = defaultFontSize;
		document.getElementById('fontSizeValue').textContent = defaultFontSize + 'pt';

		document.querySelectorAll('.font-name').forEach(el => {
			el.style.fontSize = defaultFontSize + "px";
			el.style.lineHeight = defaultFontSize * 1 + "px";
		});
	});


	// font slider

	document.getElementById("slider").addEventListener("input", function () {
		const size = this.value;
		document.getElementById("fontSizeValue").textContent = size + 'pt';
	
		const fontNames = document.querySelectorAll(".font-name");
		fontNames.forEach(el => {
			el.style.fontSize = size + "px";
			el.style.lineHeight = size * 1 + "px";
		});
	});
	
