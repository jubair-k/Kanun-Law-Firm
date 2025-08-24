/**
 * Simple Terms Popup Script
 * Session-based with 1 hour duration
 */

// Configuration
const TERMS_KEY = "kanun_terms_accepted";
const EXPIRY_HOURS = 1;

// Check if terms are still valid (within 1 hour)
function isTermsValid() {
  const data = sessionStorage.getItem(TERMS_KEY);
  if (!data) return false;

  try {
    const saved = JSON.parse(data);
    const now = Date.now();
    const oneHour = EXPIRY_HOURS * 60 * 60 * 1000;

    return now - saved.timestamp < oneHour;
  } catch (e) {
    sessionStorage.removeItem(TERMS_KEY);
    return false;
  }
}

// Show popup
function showTermsPopup() {
  const overlay = document.getElementById("termsOverlay");
  if (overlay) {
    overlay.classList.remove("hidden");
  }
}

// Hide popup
function hideTermsPopup() {
  const overlay = document.getElementById("termsOverlay");
  if (overlay) {
    overlay.classList.add("hidden");
  }
}

// Accept terms
function acceptTerms() {
  const data = {
    accepted: true,
    timestamp: Date.now(),
  };
  sessionStorage.setItem(TERMS_KEY, JSON.stringify(data));
  hideTermsPopup();
}

// Check and show popup if needed
function checkTerms() {
  if (!isTermsValid()) {
    showTermsPopup();
  }
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", function () {
  setTimeout(checkTerms, 100);
});
