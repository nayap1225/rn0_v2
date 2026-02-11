let scrollY;
function menuControlHandler(evt) {
  if (!evt) return;
  const dom = document.documentElement;
  const sideMenu = document.querySelector(".side-menu");
  const dimmed = document.querySelector(".dimmed");
  if (evt === "open") {
    scrollY = window.scrollY;
    sideMenu.classList.add("is-open");
    dimmed.classList.add("is-open");
    dom.style.overflow = "hidden";
    dom.style.position = "fixed";
    dom.style.left = "0";
    dom.style.top = -scrollY + "px";
    console.log(scrollY);
  } else {
    sideMenu.classList.remove("is-open");
    dimmed.classList.remove("is-open");
    dom.style = "";
    window.scrollTo(0, scrollY);
  }
}
