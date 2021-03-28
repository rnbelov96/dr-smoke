/* eslint-disable no-param-reassign */
export {};

const rangeElList = document.querySelectorAll('.js-range');

const cellsRange = document.querySelector(
  '.js-cells-range',
) as HTMLInputElement;
const pointsRange = document.querySelector(
  '.js-points-range',
) as HTMLInputElement;
const checkInput = document.querySelector(
  '.js-check-input',
) as HTMLInputElement;

const resultLabelElList = document.querySelectorAll('.js-calc-result');

let result: number;

let cellsCurrentStep = 2;
let pointsCurrentStep = 2;

const cellsEndpoints = [...document.querySelectorAll('.js-cells-endpoints .calc__endpoint')];
const pointsEndpoints = [...document.querySelectorAll('.js-points-endpoints .calc__endpoint')];

const calcResult = () => {
  result = (Number(cellsRange.value) * Number(pointsRange.value) * Number(checkInput.value)) * 0.147;
  resultLabelElList.forEach(el => {
    el.textContent = result.toLocaleString();
  });
};

calcResult();

rangeElList.forEach(el => {
  const rangeEl = el as HTMLInputElement;

  const steps = (Number(rangeEl.max) - Number(rangeEl.min)) / Number(rangeEl.step);

  const currentStep = (Number(rangeEl.value) - Number(rangeEl.min)) / Number(rangeEl.step);

  rangeEl.style.background = `linear-gradient(to right, #EF7D30 0%, #EF7D30 ${String(
    (currentStep / steps) * 100,
  )}%, #f2f4f8 ${String((currentStep / steps) * 100)}%, #f2f4f8 100%)`;
});

cellsRange.addEventListener('input', e => {
  const rangeEl = e.currentTarget as HTMLInputElement;

  const steps = (Number(rangeEl.max) - Number(rangeEl.min)) / Number(rangeEl.step);

  cellsEndpoints[cellsCurrentStep].classList.remove('calc__endpoint_active');

  cellsCurrentStep = (Number(rangeEl.value) - Number(rangeEl.min)) / Number(rangeEl.step);

  cellsEndpoints[cellsCurrentStep].classList.add('calc__endpoint_active');

  rangeEl.style.background = `linear-gradient(to right, #EF7D30 0%, #EF7D30 ${String(
    (cellsCurrentStep / steps) * 100,
  )}%, #f2f4f8 ${String((cellsCurrentStep / steps) * 100)}%, #f2f4f8 100%)`;

  calcResult();
});

pointsRange.addEventListener('input', e => {
  const rangeEl = e.currentTarget as HTMLInputElement;

  const steps = (Number(rangeEl.max) - Number(rangeEl.min)) / Number(rangeEl.step);

  pointsEndpoints[pointsCurrentStep].classList.remove('calc__endpoint_active');

  pointsCurrentStep = (Number(rangeEl.value) - Number(rangeEl.min)) / Number(rangeEl.step);

  pointsEndpoints[pointsCurrentStep].classList.add('calc__endpoint_active');

  rangeEl.style.background = `linear-gradient(to right, #EF7D30 0%, #EF7D30 ${String(
    (pointsCurrentStep / steps) * 100,
  )}%, #f2f4f8 ${String((pointsCurrentStep / steps) * 100)}%, #f2f4f8 100%)`;

  calcResult();
});

checkInput.addEventListener('input', calcResult);
