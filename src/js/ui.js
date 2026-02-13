/* =========================
 * Menu
 * ========================= */
let scrollY;
const body = document.body;
function menuControlHandler(evt) {
  if (!evt) return;
  const sideMenu = document.querySelector(".side-menu");
  const dimmed = document.querySelector(".dimmed");
  if (evt === "open") {
    sideMenu.classList.add("is-open");
    dimmed.classList.add("is-open");
    scrollLock();
  } else {
    sideMenu.classList.remove("is-open");
    dimmed.classList.remove("is-open");
    scrollUnlock();
  }
}

function scrollLock() {
  scrollY = window.scrollY;
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
  body.style.overflow = "hidden";
  body.style.position = "fixed";
  body.style.left = "0";
  body.style.top = -scrollY + "px";
  if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth}px`;
}
function scrollUnlock() {
  body.style = "";
  window.scrollTo(0, scrollY);
}

(function () {
  /* =========================
   * Tab
   * ========================= */
  const ACTIVE_CLASS = "is-active";
  const OPEN_CLASS = "is-open";
  function tabHandler() {
    const wrap = document.querySelectorAll(".tab-wrap");
    if (!wrap.length) return;
    const sibllings = (w, el) => {
      return Array.from(w).filter((x) => x !== el);
    };
    wrap.forEach((w) => {
      const items = w.querySelector(":scope > .tab-link");
      const tab = items.querySelectorAll(".tab");
      const container = w.querySelector(":scope > .tab-container");
      const tabCont = container.querySelectorAll(":scope > .tab-content");
      tab.forEach((t, i) => {
        if (t.classList.contains(ACTIVE_CLASS)) {
          tabCont[i].style.display = "block";
          sibllings(tabCont, tabCont[i]).forEach((s) => (s.style.display = "none"));
        }
        t.addEventListener("click", (e) => {
          t.classList.add(ACTIVE_CLASS);
          const sibs = sibllings(tab, t);
          sibs.forEach((s) => s.classList.remove(ACTIVE_CLASS));
          if (!tabCont[i]) return;
          tabCont[i].style.display = "block";
          const contSibs = sibllings(tabCont, tabCont[i]);
          contSibs.forEach((s) => (s.style.display = "none"));
        });
      });
    });
  }
  /* =========================
   * Accordion
   * ========================= */
  function accordionHandler() {
    const controller = document.querySelectorAll(".accordion-controller");
    if (!controller.length) return;
    controller.forEach((c) => {
      c.addEventListener("click", (e) => {
        const target = e.currentTarget;
        const parent = target.closest(".accordion");
        parent.classList.toggle(OPEN_CLASS);
      });
    });
  }

  /* =========================
   * modal
   * ========================= */
  function modalHandler() {
    // const modal = document.querySelector(".modal");
    const openModal = (id) => {
      // modal.classList.add(OPEN_CLASS);
      const target = document.querySelector(`[data-modal="${CSS.escape(id)}"]`);
      target.classList.add(OPEN_CLASS);
      scrollLock();
    };
    const closeModal = (id) => {
      const target = document.querySelector(`[data-modal="${CSS.escape(id)}"]`);
      target.classList.remove(OPEN_CLASS);
      scrollUnlock();
    };
    document.addEventListener("click", (e) => {
      const openBtn = e.target.dataset.modalOpen || e.target.closest("[data-modal-open]");
      if (openBtn) {
        e.preventDefault();
        const id = typeof openBtn === "string" ? openBtn : openBtn.dataset.modalOpen;
        openModal(id);
        return;
      }
      const closeBtn = e.target.dataset.modalClose || e.target.closest("[data-modal-close]");
      if (closeBtn) {
        e.preventDefault();
        const id = closeBtn.closest("[data-modal]").dataset.modal;
        closeModal(id);
        return;
      }
    });
  }

  function initUI() {
    tabHandler();
    accordionHandler();
    modalHandler();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initUI);
  } else {
    initUI();
  }
})();
