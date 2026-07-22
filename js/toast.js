// TOAST HELPER
function showToast(message, type = "info") {
  const styles = {
    error: "linear-gradient(to right, #f43f5e, #9f1239)",
    success: "linear-gradient(to right, #10b981, #047857)",
    info: "linear-gradient(to right, #3b82f6, #1d4ed8)",
    warning: "linear-gradient(to right, #f59e0b, #b45309)",
  };

  Toastify({
    text: message,
    duration: 3000,
    gravity: "top",
    position: "right",
    stopOnFocus: true,
    style: {
      background: styles[type] || styles.info,
      borderRadius: "10px",
      fontFamily: "Inter, sans-serif",
      fontWeight: 600,
      fontSize: "13px",
    },
  }).showToast();
}

// usage: showToast("Wrong sequence!", "error");

// SIMON BUTTONS — click-only white glow
const simonButtons = document.querySelectorAll(".simon-btn");

simonButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.classList.add("glow-white");
    setTimeout(() => {
      btn.classList.remove("glow-white");
    }, 250);
  });

  btn.addEventListener("contextmenu", (e) => {
    e.preventDefault(); // right-click ab kuch nahi karega
  });
});
