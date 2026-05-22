const state = {
  tabs: ["https://www.google.com"],
  active: 0
};

// ---------- NAVIGATION ----------
function go() {
  const input = document.getElementById("url").value;
  navigate(input);
}

function navigate(url) {
  if (!url) return;

  if (!url.startsWith("http")) {
    url = "https://" + url;
  }

  state.tabs[state.active] = url;

  load();
  renderTabs();
}

// ---------- LOAD PAGE ----------
function load() {
  const iframe = document.getElementById("view");
  iframe.src = state.tabs[state.active];
}

// ---------- TABS ----------
function newTab() {
  state.tabs.push("https://www.google.com");
  state.active = state.tabs.length - 1;

  load();
  renderTabs();
}

function switchTab(index) {
  state.active = index;
  load();
  renderTabs();
}

function renderTabs() {
  const bar = document.getElementById("tabs");
  bar.innerHTML = "";

  state.tabs.forEach((url, i) => {
    const tab = document.createElement("div");
    tab.className = "tab" + (i === state.active ? " active" : "");
    tab.textContent = "Tab " + (i + 1);

    tab.onclick = () => switchTab(i);

    bar.appendChild(tab);
  });
}

// ---------- INIT ----------
window.onload = () => {
  renderTabs();
  load();
};
