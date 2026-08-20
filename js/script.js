// QuickTrade Script

// Format Currency
function formatCurrency(amount, currency = 'USD') {
  if (currency === 'INR' || currency === '₹') {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 2 }).format(amount);
  }
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 }).format(amount);
}

// SIP Calculator
function initSipCalculator() {
  const amountSlider = document.getElementById('sipAmount');
  const returnSlider = document.getElementById('sipReturn');
  const periodSlider = document.getElementById('sipPeriod');

  const amountDisplay = document.getElementById('sipAmountValue');
  const returnDisplay = document.getElementById('sipReturnValue');
  const periodDisplay = document.getElementById('sipPeriodValue');

  const totalWealth = document.getElementById('sipTotalWealth');
  const investedAmount = document.getElementById('sipInvestedAmount');
  const estimatedReturns = document.getElementById('sipEstimatedReturns');

  if (!amountSlider || !returnSlider || !periodSlider) return;

  function calculateSIP() {
    const P = parseFloat(amountSlider.value);
    const annualRate = parseFloat(returnSlider.value);
    const years = parseFloat(periodSlider.value);

    if (amountDisplay) amountDisplay.textContent = '₹' + Number(P).toLocaleString('en-IN');
    if (returnDisplay) returnDisplay.textContent = annualRate + '%';
    if (periodDisplay) periodDisplay.textContent = years + ' Yr' + (years > 1 ? 's' : '');

    const months = years * 12;
    const monthlyRate = annualRate / 12 / 100;

    // SIP Future Value formula: FV = P * [ ((1 + r)^n - 1) / r ] * (1 + r)
    const futureValue = P * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
    const totalInvested = P * months;
    const wealthGain = futureValue - totalInvested;

    if (totalWealth) totalWealth.textContent = '₹' + Math.round(futureValue).toLocaleString('en-IN');
    if (investedAmount) investedAmount.textContent = '₹' + Math.round(totalInvested).toLocaleString('en-IN');
    if (estimatedReturns) estimatedReturns.textContent = '₹' + Math.round(wealthGain).toLocaleString('en-IN');
  }

  amountSlider.addEventListener('input', calculateSIP);
  returnSlider.addEventListener('input', calculateSIP);
  periodSlider.addEventListener('input', calculateSIP);

  calculateSIP();
}

// Document Ready
document.addEventListener('DOMContentLoaded', () => {
  initSipCalculator();

  // Smooth anchor scrolling
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', event => {
      const targetId = link.getAttribute('href');
      if (!targetId || targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        event.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
});
