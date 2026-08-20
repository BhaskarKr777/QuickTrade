// Authentication & Onboarding Script

document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.auth-tab-btn');
  const formHeadingTitle = document.getElementById('authFormTitle');
  const formHeadingDesc = document.getElementById('authFormDesc');
  const submitBtn = document.getElementById('authSubmitBtn');
  const nameGroup = document.getElementById('nameGroup');
  const confirmPassGroup = document.getElementById('confirmPassGroup');
  const formOptionsRow = document.getElementById('formOptionsRow');
  const authForm = document.getElementById('authForm');
  const feedbackEl = document.getElementById('authFeedback');
  const togglePassBtn = document.getElementById('togglePassword');
  const passInput = document.getElementById('authPassword');

  let currentMode = 'signin'; // 'signin' | 'signup' | 'forgot'

  function updateMode(mode) {
    currentMode = mode;
    feedbackEl.className = 'auth-feedback';
    feedbackEl.style.display = 'none';

    if (mode === 'signin') {
      formHeadingTitle.textContent = 'Welcome back';
      formHeadingDesc.textContent = 'Sign in to access your portfolios and live watchlists.';
      submitBtn.textContent = 'Sign In to Account';
      if (nameGroup) nameGroup.style.display = 'none';
      if (confirmPassGroup) confirmPassGroup.style.display = 'none';
      if (formOptionsRow) formOptionsRow.style.display = 'flex';
    } else if (mode === 'signup') {
      formHeadingTitle.textContent = 'Open Free Demat Account';
      formHeadingDesc.textContent = 'Join 10M+ traders with zero account opening fees.';
      submitBtn.textContent = 'Complete Free Registration';
      if (nameGroup) nameGroup.style.display = 'block';
      if (confirmPassGroup) confirmPassGroup.style.display = 'block';
      if (formOptionsRow) formOptionsRow.style.display = 'none';
    } else if (mode === 'forgot') {
      formHeadingTitle.textContent = 'Reset your password';
      formHeadingDesc.textContent = 'Enter your email or phone to receive an OTP reset link.';
      submitBtn.textContent = 'Send OTP Recovery Link';
      if (nameGroup) nameGroup.style.display = 'none';
      if (confirmPassGroup) confirmPassGroup.style.display = 'none';
      if (formOptionsRow) formOptionsRow.style.display = 'none';
    }
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      updateMode(tab.getAttribute('data-mode'));
    });
  });

  // Password visibility toggle
  if (togglePassBtn && passInput) {
    togglePassBtn.addEventListener('click', () => {
      const isPass = passInput.type === 'password';
      passInput.type = isPass ? 'text' : 'password';
      togglePassBtn.textContent = isPass ? 'Hide' : 'Show';
    });
  }

  // Form Submission
  if (authForm) {
    authForm.addEventListener('submit', e => {
      e.preventDefault();
      const email = document.getElementById('authEmail').value;
      const pass = passInput.value;

      feedbackEl.style.display = 'block';

      if (!email) {
        feedbackEl.className = 'auth-feedback error';
        feedbackEl.textContent = 'Please enter your registered email address.';
        return;
      }

      if (currentMode === 'signin') {
        feedbackEl.className = 'auth-feedback success';
        feedbackEl.textContent = '✓ Login successful! Redirecting to your live dashboard…';
        setTimeout(() => {
          window.location.href = 'stock.html';
        }, 800);
      } else if (currentMode === 'signup') {
        feedbackEl.className = 'auth-feedback success';
        feedbackEl.textContent = '🎉 Demat Account Created! Redirecting to KYC onboarding…';
        setTimeout(() => {
          window.location.href = 'stock.html';
        }, 1000);
      } else {
        feedbackEl.className = 'auth-feedback success';
        feedbackEl.textContent = '✓ OTP verification code sent to ' + email;
      }
    });
  }
});
