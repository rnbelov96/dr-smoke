/* eslint-disable no-param-reassign */
export {};

const rangeElList = document.querySelectorAll('.js-range');

const foodcupRange = document.querySelector(
  '.js-foodcup-range',
) as HTMLInputElement;
const coffeeRange = document.querySelector(
  '.js-coffee-range',
) as HTMLInputElement;
const snackRange = document.querySelector(
  '.js-snack-range',
) as HTMLInputElement;
const deliveryRange = document.querySelector(
  '.js-delivery-range',
) as HTMLInputElement;
const freezeRange = document.querySelector(
  '.js-freeze-range',
) as HTMLInputElement;

const incomeLabelEl = document.querySelector('.js-income-result') as HTMLSpanElement;
const profitLabelElList = document.querySelectorAll('.js-profit-result');

const FOODCUP_CHECK_VALUE = 149;
const COFFEE_CHECK_VALUE = 149;
const SNACK_CHECK_VALUE = 159;
const DELIVERY_CHECK_VALUE = 195;
const FREEZE_CHECK_VALUE = 1000;

let income: number;
let profit: number;

const calcIncome = () => {
  income = (Number(foodcupRange.value) * FOODCUP_CHECK_VALUE
      + Number(coffeeRange.value) * COFFEE_CHECK_VALUE
      + Number(snackRange.value) * SNACK_CHECK_VALUE
      + Number(deliveryRange.value) * DELIVERY_CHECK_VALUE
      + Number(freezeRange.value) * FREEZE_CHECK_VALUE)
    * 30;
  incomeLabelEl.textContent = income.toLocaleString();
};

const calcProfit = () => {
  profit = Math.round(income * 0.496);
  profitLabelElList.forEach(el => {
    el.textContent = profit.toLocaleString();
  });
};

calcIncome();
calcProfit();

rangeElList.forEach(el => {
  const rangeEl = el as HTMLInputElement;

  const steps = (Number(rangeEl.max) - Number(rangeEl.min)) / Number(rangeEl.step);

  const currentStep = Number(rangeEl.value) / Number(rangeEl.step) - 1;

  rangeEl.style.background = `linear-gradient(to right, #6DB900 0%, #6DB900 ${String(
    (currentStep / steps) * 100,
  )}%, #353b41 ${String((currentStep / steps) * 100)}%, #353b41 100%)`;
});

rangeElList.forEach(el => {
  el.addEventListener('input', e => {
    const rangeEl = e.currentTarget as HTMLInputElement;

    const steps = (Number(rangeEl.max) - Number(rangeEl.min)) / Number(rangeEl.step);

    const currentStep = Number(rangeEl.value) / Number(rangeEl.step) - 1;

    rangeEl.style.background = `linear-gradient(to right, #6DB900 0%, #6DB900 ${String(
      (currentStep / steps) * 100,
    )}%, #353b41 ${String((currentStep / steps) * 100)}%, #353b41 100%)`;

    calcIncome();
    calcProfit();
  });
});
