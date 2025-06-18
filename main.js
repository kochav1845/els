

// Mobile menu functionality
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const navLinks = document.getElementById('nav-links');
const header = document.querySelector('.header');

let lastScroll = 0;



mobileMenuBtn.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
  });
});

// Scroll animations
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

document.querySelectorAll('.service-card, .gallery-grid img').forEach(element => {
  observer.observe(element);
});



//play video
document.addEventListener('DOMContentLoaded', ()=>{
const videoCover=document.getElementById('videoCover')
  const video = document.getElementById('video');
function playVideo() {
  
  videoCover.style.display='none';
  
  video.play();
 
}
video.addEventListener('play', playVideo);
videoCover.addEventListener('click', playVideo);
});

// Audio player functionality
let currentlyPlaying = true;
let currentAudio = null;
const playButtons = document.querySelectorAll('.play-button');

const updatePlayButton = (button, isPlaying) => {
  const svg = button.querySelector('svg');
  if (isPlaying) {
    svg.innerHTML = '<rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect>';
  } else {
    svg.innerHTML = '<polygon points="5 3 19 12 5 21 5 3"></polygon>';
  }
};

const stopAllAudio = () => {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio = null;
  }
  
  playButtons.forEach(button => {
    updatePlayButton(button, false);
  });
  
  currentlyPlaying = null;
};

playButtons.forEach(button => {
  button.addEventListener('click', () => {
    const trackId = button.dataset.trackId;
    const audio = document.getElementById(`audio-${trackId}`);
    
    if (!audio) return;

    // If this track is currently playing, stop it
    if (currentlyPlaying === trackId) {
      stopAllAudio();
      return;
    }

    // Stop any currently playing audio
    stopAllAudio();

    // Set up the new audio
    audio.addEventListener('ended', () => {
      updatePlayButton(button, false);
      currentlyPlaying = null;
      currentAudio = null;
    });

    // Play the new track
    audio.play().then(() => {
      currentlyPlaying = trackId;
      currentAudio = audio;
      updatePlayButton(button, true);
    }).catch(error => {
      console.error('Error playing audio:', error);
      stopAllAudio();
    });
  });
});


// slider functionelity
// Update time slider and display
function updateTimeDisplay(audio, currentTimeDisplay, durationDisplay, timeSlider) {
  if (!audio.duration) return;

  const currentTime = audio.currentTime || 0;
  const duration = audio.duration || 0;

  currentTimeDisplay.textContent = formatTime(currentTime);
  

  // Only update slider if it's not being dragged
  if (!timeSlider.classList.contains('dragging')) {
      timeSlider.value = duration ? (currentTime / duration) * 100 : 0;
  }
}

// Format time in MM:SS format
function formatTime(seconds) {
  if (!seconds || isNaN(seconds)) return '0:00';
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

// Initialize audio tracks with slider functionality
document.querySelectorAll('.audio-track').forEach(track => {
  const audio = track.querySelector('audio');
  const timeSlider = track.querySelector('.time-slider');
  const currentTimeDisplay = track.querySelector('.current-time');
  const durationDisplay = track.querySelector('.duration');

  // Initialize displays
  
  timeSlider.value = 0;

  // Update duration when metadata is loaded
 

  // Update slider and time during playback
  audio.addEventListener('timeupdate', () => {
      updateTimeDisplay(audio, currentTimeDisplay, durationDisplay, timeSlider);
  });

  // Add dragging class on mousedown
  timeSlider.addEventListener('mousedown', () => {
      timeSlider.classList.add('dragging');
  });

  // Remove dragging class on mouseup
  timeSlider.addEventListener('mouseup', () => {
      timeSlider.classList.remove('dragging');
  });

  // Handle manual slider changes
  timeSlider.addEventListener('input', (e) => {
      if (!audio.duration) return;
      const percentage = parseFloat(e.target.value);
      if (isNaN(percentage)) return;
      
      const time = (audio.duration * percentage) / 100;
      if (isFinite(time)) {
          currentTimeDisplay.textContent = formatTime(time);
      }
  });

  // Seek to the chosen time when slider is released
  timeSlider.addEventListener('change', (e) => {
      if (!audio.duration) return;
      const percentage = parseFloat(e.target.value);
      if (isNaN(percentage)) return;
      
      const time = (audio.duration * percentage) / 100;
      if (isFinite(time)) {
          audio.currentTime = time;
      }
  });
});






// Form submission with modern validation and feedback
const bookingForm = document.getElementById('booking-form');
let userName = document.getElementById('name');
let email = document.getElementById('email');
let date = document.getElementById('date');
let message = document.getElementById('message');
let contact = document.getElementById('contact');
let phone = document.getElementById('phone');
const submitButton = document.getElementById('submit');

bookingForm.addEventListener('submit', (e) => {
  
  e.preventDefault();
  console.log('Form submitted');
  const submitButton = document.getElementById('submit');
  const submitButtonBackground = document.querySelector('.booking-form button');

  submit.innerHTML = 'Sending...';
  submitButtonBackground.style.background= 'gray';
  let formData = {
    name: userName.value,
    email: email.value,
    date: date.value,
    message: message.value,
    contact: contact.value,
    phone: phone.value
  };
  console.log(formData);

  messagePleaswait();
  submitButton.disabled = true;
  

  let xhr = new XMLHttpRequest();
  xhr.open('POST', 'https://oerduidguofjdyvdplfl.supabase.co/functions/v1/rapid-processor', true);
  xhr.setRequestHeader('content-type', 'application/json');
  xhr.setRequestHeader('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9lcmR1aWRndW9mamR5dmRwbGZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM2MzIwNTksImV4cCI6MjA1OTIwODA1OX0.PSAcI-k5OxVXdnTfRM1-h95zm2t6dsb5Qi9aQlSa0lE');

  xhr.onload = function() {
    console.log('response', xhr.responseText);

submit
 const response = JSON.parse(xhr.responseText);
    if (response == 'success') {
      
     messageSuccess();
      submitButton.disabled = false;
      userName.value = '';
      email.value = '';
      date.value = '';
      message.value = '';
      contact.value = '';
      phone.value = '';
      
      
    } else {
      alert('Something went wrong');
    }
    submitButton.innerHTML = 'submit request';
    submitButtonBackground.style.background  ="#6366f1" ;
    
  };  xhr.send(JSON.stringify(formData));
});

function messagePleaswait() {


toastr.options = {
  "closeButton": false,
  "debug": false,
  "newestOnTop": true,
  "progressBar": true,
  "positionClass": "toast-top-right",
  "preventDuplicates": true,
  "onclick": null,
  "showDuration": "5000",
  "hideDuration": "5000",
  "timeOut": "3000",
  "extendedTimeOut": "1000",
  "showEasing": "swing",
  "hideEasing": "swing",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
};
 toastr.info("your message is being sent", "please wait");
}
 
function messageSuccess() {
  Command: toastr["success"]("we will get back to you as soon as we can. thanks for contacting OnStageStudio", "email sent")
    
    toastr.options = {
      "closeButton": false,
      "debug": true,
      "newestOnTop": true,
      "progressBar": false,
      "positionClass": "toast-top-right",
      "preventDuplicates": true,
      "onclick": null,
      "showDuration": "5000",
      "hideDuration": "1000",
      "timeOut": "5000",
      "extendedTimeOut": "1000",
      "showEasing": "linear",
      "hideEasing": "linear",
      "showMethod": "fadeIn",
      "hideMethod": "fadeOut"
    }
}
// Update copyright year
document.getElementById('year').textContent = new Date().getFullYear();





