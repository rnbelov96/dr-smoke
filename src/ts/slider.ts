export {};

const imagesLength = 6;
let currentImage = 1;
const mode = 1;

const translateXPosList = [
  {
    mode: 3,
    pos: -100,
  },
  {
    mode: 2,
    pos: -200,
  },
  {
    mode: 1,
    pos: -400,
  },
];
const initTranslateXPos = translateXPosList.find(el => el.mode === mode)
  ?.pos as number;
let translateXPos = initTranslateXPos;
const translateStep = 100 / mode;
let offset: number;
let posInit: number;
let isDragging = false;

const imagesBoxEl = document.querySelector(
  '.slider__img-box',
) as HTMLDivElement;
const wrapperEl = document.querySelector('.slider__wrapper') as HTMLDivElement;

let wrapperCoords = wrapperEl.getBoundingClientRect();
let wrapperLeftCoords = wrapperCoords.left;
let wrapperWidth = wrapperCoords.width;

const navBoxEl = document.querySelector('.slider__nav-box') as HTMLDivElement;

const prevBtnEl = document.querySelector(
  '.slider__btn-prev',
) as HTMLButtonElement;
const nextBtnEl = document.querySelector(
  '.slider__btn-next',
) as HTMLButtonElement;

let navItemList: HTMLButtonElement[];

const blockBtns = () => {
  nextBtnEl.disabled = true;
  prevBtnEl.disabled = true;
  navItemList.forEach(el => {
    // eslint-disable-next-line no-param-reassign
    el.disabled = true;
  });
};

const activateBtns = () => {
  nextBtnEl.disabled = false;
  prevBtnEl.disabled = false;
  navItemList.forEach(el => {
    // eslint-disable-next-line no-param-reassign
    el.disabled = false;
  });
};

navItemList = Array(imagesLength)
  .fill({}, 0, imagesLength)
  .map((_el, index) => {
    const navItemEl = document.createElement('button');
    navItemEl.classList.add('slider__nav-item');
    if (index === 0) {
      navItemEl.classList.add('slider__nav-item_active');
    }
    navItemEl.dataset.image = String(index + 1);
    navItemEl.addEventListener('click', e => {
      blockBtns();
      const navEl = e.currentTarget as HTMLDivElement;
      imagesBoxEl.style.transition = 'transform .5s';
      const prevCurrentImage = currentImage;
      currentImage = Number(navEl.dataset.image);
      const newTranslateXPos = initTranslateXPos - translateStep * (currentImage - 1);
      translateXPos = newTranslateXPos;
      imagesBoxEl.style.transform = `translate3d(${translateXPos}%, 0px, 0px)`;
      navItemList[currentImage - 1].classList.add('slider__nav-item_active');
      navItemList[prevCurrentImage - 1].classList.remove(
        'slider__nav-item_active',
      );
      setTimeout(() => {
        imagesBoxEl.style.transition = '';
        activateBtns();
      }, 500);
    });
    return navItemEl;
  });

navBoxEl.append(...navItemList);

window.addEventListener('resize', () => {
  wrapperCoords = wrapperEl.getBoundingClientRect();
  wrapperLeftCoords = wrapperCoords.left;
  wrapperWidth = wrapperCoords.width;
});

const dragAction = (e: MouseEvent) => {
  const posX = e.pageX - wrapperLeftCoords;
  offset = ((posInit - posX) / wrapperWidth) * 100;
  const newTranslateXPos = translateXPos - offset;
  imagesBoxEl.style.transform = `translate3d(${newTranslateXPos}%, 0px, 0px)`;
};

const swipeAction = (e: TouchEvent) => {
  const posX = e.touches[0].clientX - wrapperLeftCoords;
  offset = ((posInit - posX) / wrapperWidth) * 100;
  const newTranslateXPos = translateXPos - offset;
  imagesBoxEl.style.transform = `translate3d(${newTranslateXPos}%, 0px, 0px)`;
};

const dragStart = (e: MouseEvent) => {
  isDragging = true;
  posInit = e.pageX - wrapperLeftCoords;
  wrapperEl.addEventListener('mousemove', dragAction);
  wrapperEl.addEventListener('touchmove', swipeAction);
};

const swipeStart = (e: TouchEvent) => {
  isDragging = true;
  posInit = e.touches[0].clientX - wrapperLeftCoords;
  wrapperEl.addEventListener('mousemove', dragAction);
  wrapperEl.addEventListener('touchmove', swipeAction);
};

const swipeEnd = () => {
  blockBtns();
  const prevCurrentImage = currentImage;
  isDragging = false;
  imagesBoxEl.style.transition = 'transform .5s';
  wrapperEl.removeEventListener('mousemove', dragAction);
  wrapperEl.removeEventListener('touchmove', swipeAction);

  if (offset < -translateStep / 2) {
    translateXPos += translateStep;
    currentImage -= 1;
    if (currentImage === 0) {
      currentImage = imagesLength;
    }
    navItemList[currentImage - 1].classList.add('slider__nav-item_active');
    navItemList[prevCurrentImage - 1].classList.remove('slider__nav-item_active');
  }

  if (offset > translateStep / 2) {
    translateXPos -= translateStep;
    currentImage += 1;
    if (currentImage === imagesLength + 1) {
      currentImage = 1;
    }
    navItemList[currentImage - 1].classList.add('slider__nav-item_active');
    navItemList[prevCurrentImage - 1].classList.remove('slider__nav-item_active');
  }

  offset = 0;

  imagesBoxEl.style.transform = `translate3d(${translateXPos}%, 0px, 0px)`;

  setTimeout(() => {
    imagesBoxEl.style.transition = '';
    if (currentImage === imagesLength && prevCurrentImage === 1) {
      translateXPos = initTranslateXPos - translateStep * (imagesLength - 1);
      imagesBoxEl.style.transform = `translate3d(${translateXPos}%, 0px, 0px)`;
    }

    if (currentImage === 1 && prevCurrentImage === imagesLength) {
      translateXPos = initTranslateXPos;
      imagesBoxEl.style.transform = `translate3d(${translateXPos}%, 0px, 0px)`;
    }
    activateBtns();
  }, 500);
};

const swipeLeave = () => {
  if (isDragging) {
    swipeEnd();
  }
};

wrapperEl.addEventListener('mousedown', dragStart);
wrapperEl.addEventListener('touchstart', swipeStart);

wrapperEl.addEventListener('mouseup', swipeEnd);
wrapperEl.addEventListener('touchend', swipeEnd);

wrapperEl.addEventListener('mouseleave', swipeLeave);

prevBtnEl.addEventListener('click', () => {
  blockBtns();
  const prevCurrentImage = currentImage;
  imagesBoxEl.style.transition = 'transform .5s';
  translateXPos += translateStep;
  currentImage -= 1;
  if (currentImage === 0) {
    currentImage = imagesLength;
  }

  navItemList[currentImage - 1].classList.add('slider__nav-item_active');
  navItemList[prevCurrentImage - 1].classList.remove('slider__nav-item_active');

  imagesBoxEl.style.transform = `translate3d(${translateXPos}%, 0px, 0px)`;

  setTimeout(() => {
    imagesBoxEl.style.transition = '';
    if (currentImage === imagesLength && prevCurrentImage === 1) {
      translateXPos = initTranslateXPos - translateStep * (imagesLength - 1);
      imagesBoxEl.style.transform = `translate3d(${translateXPos}%, 0px, 0px)`;
    }
    activateBtns();
  }, 500);
});

nextBtnEl.addEventListener('click', () => {
  blockBtns();
  const prevCurrentImage = currentImage;
  imagesBoxEl.style.transition = 'transform .5s';
  translateXPos -= translateStep;
  currentImage += 1;
  if (currentImage === imagesLength + 1) {
    currentImage = 1;
  }

  navItemList[currentImage - 1].classList.add('slider__nav-item_active');
  navItemList[prevCurrentImage - 1].classList.remove('slider__nav-item_active');

  imagesBoxEl.style.transform = `translate3d(${translateXPos}%, 0px, 0px)`;

  setTimeout(() => {
    imagesBoxEl.style.transition = '';
    if (currentImage === 1 && prevCurrentImage === imagesLength) {
      translateXPos = initTranslateXPos;
      imagesBoxEl.style.transform = `translate3d(${translateXPos}%, 0px, 0px)`;
    }
    activateBtns();
  }, 500);
});
