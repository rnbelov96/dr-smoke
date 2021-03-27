export {};

const getCurrentMode = (pageWidth: number) => {
  if (pageWidth <= 575) {
    return 1;
  }
  return 2;
};

const imagesLength = 4;
let currentImage = 1;
let pageWidth = document.documentElement.scrollWidth;
let mode = getCurrentMode(pageWidth);

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
let initTranslateXPos = translateXPosList.find(el => el.mode === mode)
  ?.pos as number;
let translateXPos = initTranslateXPos;
let translateStep = 100 / mode;
let offset: number;
let posInit: number;
let isDragging = false;

const imagesBoxEl = document.querySelector(
  '.shops__items-box',
) as HTMLDivElement;
const wrapperEl = document.querySelector(
  '.shops__slider-wrapper',
) as HTMLDivElement;

let wrapperCoords = wrapperEl.getBoundingClientRect();
let wrapperLeftCoords = wrapperCoords.left;
let wrapperWidth = wrapperCoords.width;

const prevBtnEl = document.querySelector(
  '.shops__btn-prev',
) as HTMLButtonElement;
const nextBtnEl = document.querySelector(
  '.shops__btn-next',
) as HTMLButtonElement;

const blockBtns = () => {
  nextBtnEl.disabled = true;
  prevBtnEl.disabled = true;
};

const activateBtns = () => {
  nextBtnEl.disabled = false;
  prevBtnEl.disabled = false;
};

window.addEventListener('resize', () => {
  wrapperCoords = wrapperEl.getBoundingClientRect();
  wrapperLeftCoords = wrapperCoords.left;
  wrapperWidth = wrapperCoords.width;

  pageWidth = document.documentElement.scrollWidth;
  const newMode = getCurrentMode(pageWidth);
  if (mode === newMode) {
    return;
  }
  mode = newMode;
  translateStep = 100 / mode;
  initTranslateXPos = translateXPosList.find(el => el.mode === mode)?.pos as number;
  const newTranslateXPos = initTranslateXPos - (translateStep * (currentImage - 1));
  translateXPos = newTranslateXPos;
  imagesBoxEl.style.transform = `translate3d(${translateXPos}%, 0px, 0px)`;
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
  }

  if (offset > translateStep / 2) {
    translateXPos -= translateStep;
    currentImage += 1;
    if (currentImage === imagesLength + 1) {
      currentImage = 1;
    }
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
