// @ts-nocheck
import './style.css';

// Keyboard ESC key handler for closing modals
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    closeAuthModal();
    closeDetailModal();
  }
});

// Mobile menu toggle
function toggleMobileMenu() {
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIcon = document.getElementById('menu-icon');
  if (mobileMenu.classList.contains('hidden')) {
    mobileMenu.classList.remove('hidden');
    menuIcon.classList.remove('fa-bars');
    menuIcon.classList.add('fa-xmark');
  } else {
    mobileMenu.classList.add('hidden');
    menuIcon.classList.remove('fa-xmark');
    menuIcon.classList.add('fa-bars');
  }
}

// Modal Control Logic
function openAuthModal(tab) {
  const modal = document.getElementById('auth-modal');
  const card = document.getElementById('modal-card');
  
  switchAuthTab(tab);

  modal.classList.remove('pointer-events-none', 'opacity-0');
  modal.classList.add('opacity-100');
  card.classList.remove('scale-95');
  card.classList.add('scale-100');
  document.body.style.overflow = 'hidden';
}

function closeAuthModal() {
  const modal = document.getElementById('auth-modal');
  const card = document.getElementById('modal-card');

  modal.classList.remove('opacity-100');
  modal.classList.add('opacity-0', 'pointer-events-none');
  card.classList.remove('scale-100');
  card.classList.add('scale-95');
  document.body.style.overflow = '';
}

function handleModalBackdropClick(event) {
  if (event.target.id === 'auth-modal') {
    closeAuthModal();
  }
}

function switchAuthTab(tab) {
  const loginForm = document.getElementById('login-form');
  const signupForm = document.getElementById('signup-form');
  const tabLoginBtn = document.getElementById('tab-login-btn');
  const tabSignupBtn = document.getElementById('tab-signup-btn');
  const title = document.getElementById('modal-title');
  const subtitle = document.getElementById('modal-subtitle');

  if (tab === 'login') {
    loginForm.classList.remove('hidden');
    signupForm.classList.add('hidden');

    tabLoginBtn.className = "w-1/2 py-2 rounded-lg text-xs font-bold transition-all bg-sage-dark text-cream shadow";
    tabSignupBtn.className = "w-1/2 py-2 rounded-lg text-xs font-bold transition-all text-sage-dark hover:text-terracotta";

    title.textContent = "Welcome Back";
    subtitle.textContent = "Log in to manage your stays and saved sanctuaries.";
  } else {
    loginForm.classList.add('hidden');
    signupForm.classList.remove('hidden');

    tabSignupBtn.className = "w-1/2 py-2 rounded-lg text-xs font-bold transition-all bg-terracotta text-cream shadow";
    tabLoginBtn.className = "w-1/2 py-2 rounded-lg text-xs font-bold transition-all text-sage-dark hover:text-terracotta";

    title.textContent = "Create an Account";
    subtitle.textContent = "Join our community of quiet sanctuary seekers.";
  }
}


function filterStays(category, btnElement) {
  const tabs = document.querySelectorAll('.tab-btn');
  tabs.forEach(tab => {
    tab.classList.remove('active-tab');
    tab.classList.remove('bg-sage-dark', 'text-white');
    tab.classList.add('bg-white/80', 'text-sage-dark');
  });

  btnElement.classList.add('active-tab');

  const cards = document.querySelectorAll('.stay-card');
  cards.forEach(card => {
    if (category === 'all' || card.getAttribute('data-category') === category) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}

function toggleBookmark(btn) {
  const icon = btn.querySelector('i');
  if (icon.classList.contains('fa-regular')) {
    icon.classList.remove('fa-regular');
    icon.classList.add('fa-solid', 'text-terracotta');
    showToast('Added sanctuary to your saved list.');
  } else {
    icon.classList.remove('fa-solid', 'text-terracotta');
    icon.classList.add('fa-regular');
    showToast('Removed sanctuary from saved list.');
  }
}

function scrollToShowcase() {
  document.getElementById('showcase').scrollIntoView({ behavior: 'smooth' });
}


function generateRecommendation() {
  const vibe = document.getElementById('quiz-vibe').value;
  const guests = document.getElementById('quiz-guests').value;
  const resultBox = document.getElementById('quiz-result');
  const title = document.getElementById('result-title');
  const desc = document.getElementById('result-desc');

  let recTitle = "Whispering Pines Cabin";
  let recDesc = "Ideal for deep forest quiet and firewood fireplace relaxation.";

  if (vibe === 'water') {
    recTitle = "Mirror Waters Cottage";
    recDesc = "Perfect lakeside setting with private dock & morning kayak access.";
  } else if (vibe === 'spa') {
    recTitle = "Solitude Crest Loft";
    recDesc = "Features private high-altitude hot tub and cedar thermal bath.";
  } else if (guests === 'group') {
    recTitle = "Solitude Crest Loft";
    recDesc = "Spacious alpine lounge suited for 4 to 6 sanctuary guests.";
  }

  title.textContent = recTitle;
  desc.textContent = recDesc;
  resultBox.classList.remove('hidden');
  showToast('Retreat match generated!');
}


function openDetailModal(title, desc, price, imgUrl) {
  document.getElementById('detail-title').textContent = title;
  document.getElementById('detail-desc').textContent = desc;
  document.getElementById('detail-price').textContent = price + " / night";
  document.getElementById('detail-img').src = imgUrl;

  const modal = document.getElementById('detail-modal');
  const card = document.getElementById('detail-card');

  modal.classList.remove('pointer-events-none', 'opacity-0');
  modal.classList.add('opacity-100');
  card.classList.remove('scale-95');
  card.classList.add('scale-100');
}

function closeDetailModal() {
  const modal = document.getElementById('detail-modal');
  const card = document.getElementById('detail-card');

  modal.classList.remove('opacity-100');
  modal.classList.add('opacity-0', 'pointer-events-none');
  card.classList.remove('scale-100');
  card.classList.add('scale-95');
}

function handleAuthSubmit(event, type) {
  event.preventDefault();
  closeAuthModal();
  if (type === 'login') {
    showToast('Welcome back! Successfully logged in.');
  } else {
    showToast('Account created! Welcome to Cozy Retreat.');
  }
}

function handleNewsletter(event) {
  event.preventDefault();
  event.target.reset();
  showToast('Subscribed! Check your inbox for cozy notes.');
}

function showToast(message) {
  const toast = document.getElementById('toast');
  const msg = document.getElementById('toast-message');
  msg.textContent = message;

  toast.classList.remove('translate-y-20', 'opacity-0', 'pointer-events-none');
  toast.classList.add('translate-y-0', 'opacity-100');

  setTimeout(() => {
    toast.classList.remove('translate-y-0', 'opacity-100');
    toast.classList.add('translate-y-20', 'opacity-0', 'pointer-events-none');
  }, 3500);
}

Object.assign(window, {
  closeAuthModal,
  closeDetailModal,
  filterStays,
  generateRecommendation,
  handleAuthSubmit,
  handleModalBackdropClick,
  handleNewsletter,
  openAuthModal,
  openDetailModal,
  scrollToShowcase,
  showToast,
  switchAuthTab,
  toggleBookmark,
  toggleMobileMenu,
});