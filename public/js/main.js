const nucleon = {
  toast: (message, type, time = 5000) => {
    const toastTemp = `
            <div class="top">
                <p>${
                  type == "s"
                    ? "✅ Success"
                    : type == "e"
                    ? "❌ Error"
                    : "📚 Info"
                }</p>
                <button onclick="this.parentNode.parentNode.remove()">x</button>
            </div>
            <div class="loader"></div>
            <p>${message}</p>
        `;
    const toas = document.createElement("div");
    toas.classList.add("nucleon_toast");
    toas.innerHTML = toastTemp;
    if (document.querySelector(".nucleon_toast_wrapper")) {
      document.querySelector(".nucleon_toast_wrapper").append(toas);
      setTimeout(() => {
        toas.style.transform = "translateX(0)";
      }, 10);
      setTimeout(() => {
        toas.style.transform = "translateX(200%)";
      }, time);
      setTimeout(() => {
        toas.remove();
      }, time + 500);
    } else {
      const e = document.createElement("div");
      e.classList.add("nucleon_toast_wrapper");
      e.append(toas);
      document.body.append(e);
      setTimeout(() => {
        toas.style.transform = "translateX(0)";
      }, 10);
      setTimeout(() => {
        toas.style.transform = "translateX(200%)";
      }, time);
      setTimeout(() => {
        toas.remove();
      }, time + 500);
    }
  },
};
