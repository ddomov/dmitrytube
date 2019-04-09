const switcher = document.querySelector('#cbx'),
  btnLoad = document.querySelector('.more'),
  modal = document.querySelector('.modal'),
  videos = document.querySelectorAll('.videos__item'),
	videosWrapper = document.querySelector('.videos__wrapper');
let player;

function bindSlideToggle(trigger, boxBody, content, openClass) {
	let button = {
		'element': document.querySelector(trigger),
		'active': false
	};
	const box = document.querySelector(boxBody),
	  boxContent = document.querySelector(content);

	button.element.addEventListener('click', () => {
		if(button.active === false) {
			button.active = true;
			box.style.height = boxContent.clientHeight + 'px';
			box.classList.add(openClass); // активный класс для меню
		} else {
			button.active = false;
			box.style.height = 0 + 'px';
			box.classList.remove(openClass); // активный класс для меню
		}
	});
}

bindSlideToggle('.hamburger', '[data-slide="nav"]', '.header__menu', 'slide-active');
let night = false;


function switchMode() {
  if (night) {

  	night = false;
  	document.body.classList.remove('night');

		setColorItems('#000');

  	document.querySelector('.header__item-descr').style.color = '#000';
  	document.querySelector('.logo > img').src = 'logo/youtube.svg';
  	
  } else {

  	night = true;
  	document.body.classList.add('night');

  	setColorItems('#fff');

  	document.querySelector('.header__item-descr').style.color = '#fff';
  	document.querySelector('.logo > img').src = 'logo/youtube_night.svg';
  	
  }
}

function setColorItem(elem, clr) {
  if (elem.tagName.toUpperCase() === 'LINE')
	  elem.style.stroke = clr;
	else 
	  elem.style.color = clr;
}

function setColorCard(card, clr) {
  card.querySelectorAll('.hamburger > line').forEach(item => {
		setColorItem(item, clr);
	});

	card.querySelectorAll('.videos__item-descr').forEach(item => {
		setColorItem(item, clr);
	});

	card.querySelectorAll('.videos__item-views').forEach(item => {
		setColorItem(item, clr);
	});
}

function setColorItems(clr) {
	setColorCard(document, clr);
}

switcher.addEventListener('change', switchMode);

const data = [
  ['img/thumb_3.webp', 'img/thumb_4.webp', 'img/thumb_5.webp'],
  ['#3 Верстка на flexbox CSS | Блок преимущества и галерея | Марафон верстки | Артем Исламов',
     '#2 Установка spikmi и работа с ветками на Github | Марафон вёрстки Урок 2',
     '#1 Верстка реального заказа landing page | Марафон верстки | Артем Исламов'],
  ['3,6 тыс. просмотров', '4,2 тыс. просмотров', '28 тыс. просмотров'],
  ['X9SmcY3lM-U', '7BvHoh0BrMw', 'mC8JW_aG2EM']
];

btnLoad.addEventListener('click', () => {
	const videosWrapper = document.querySelector('.videos__wrapper');
	btnLoad.remove();

	for (let i = 0; i < data[0].length; i++) {
		let card = document.createElement('a');
		card.classList.add('videos__item', 'videos__item-active');
		card.setAttribute('data-url', data[3][i]);
		card.innerHTML = `
			<img src="${data[0][i]}" alt="thumb">
                <div class="videos__item-descr">
                    ${data[1][i]}
                </div>
                <div class="videos__item-views">
                    ${data[2][i]}
                </div>
		`;
		videosWrapper.appendChild(card);
		setTimeout(() => {
			card.classList.remove('videos__item-active');
		}, 10);
		//bindNewModal(card);
		night ? setColorCard(card, '#fff') : setColorCard(card, '#000');
	}

	sliceTitle('.videos__item-descr', 100);
});

function sliceTitle(selector, count) {
	 document.querySelectorAll(selector).forEach(item => {
		 item.textContent.trim();

		 if (item.textContent.length > count) {
			 const str = item.textContent.slice(0, count + 1) + "...";
			 item.textContent = str;
		 }
	 });
}

sliceTitle('.videos__item-descr', 100);

function openModal() {
	modal.style.display = 'block';
}

function closeModal() {
	modal.style.display = 'none';
	player.stopVideo();
}

document.addEventListener('keydown', function (evt) { if (evt.keyCode === 27) { closeModal(); } });


modal.addEventListener('click', (e) => {
  if (!e.target.classList.contains('modal__body'))
	  closeModal();
});

videosWrapper.addEventListener('click', (e) => { // прослушивание нажатие на ссылки для открытия модального окна
  console.log(e);

	if ( (e.target.parentNode != null && e.target.parentNode.tagName === "A") || e.target.tagName === "A") {
		const elemA = e.target.parentNode.tagName === "A" ? e.target.parentNode : e.target;
		e.preventDefault();
		const id = elemA.getAttribute('data-url');
		loadVideo(id);
		openModal();
	}
});

function createVideoPlayer() {
      var tag = document.createElement('script');

      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

			setTimeout(() => {
				player = new YT.Player('frame', {
					height: '100%',
					width: '100%',
					videoId: 'M7lc1UVf-VE'
				});
			}, 1000);
}

createVideoPlayer();

function loadVideo(id) {
	player.loadVideoById({'videoId': `${id}`});
}