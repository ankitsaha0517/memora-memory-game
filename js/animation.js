// 1. Select your elements
const hamburgerBtn = document.querySelector('.hamburger-btn');
const closeBtn = document.querySelector('.close-btn');
const rightPanel = document.querySelector('.right-panel');

// 2. Set initial state using GSAP
// We shift it 100% to the right (off-screen) and ensure display is active
gsap.set(rightPanel, { 
  x: "100%", 
  display: "flex" // or "block" depending on your layout 
});

// 3. Create a paused timeline
const slideTimeline = gsap.timeline({ paused: true });

// 4. Define the animation
slideTimeline.to(rightPanel, {
  x: "0%",             // Slide back to its natural position
  duration: 0.6,       // Adjust speed as needed
  ease: "power3.inOut" // Smooth acceleration/deceleration
});

// 5. Add Event Listeners
hamburgerBtn.addEventListener('click', () => {
  // Play the animation forward (Slide In)
  slideTimeline.play();
});

closeBtn.addEventListener('click', () => {
  // Play the animation backward (Slide Out)
  slideTimeline.reverse();
});