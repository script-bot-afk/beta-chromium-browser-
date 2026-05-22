let tabs = [];
let active = 0;

const blocked = [
  "doubleclick.net",
  "googlesyndication.com",
  "adservice",
  "popads"
];

function newTab(url = "https://www.google.com") {
  tabs.push(url);
  active = tabs.length - 1;
  render();
  load();
}

function go() {
  let url = document.getElementById("url").value;
  if (!url.startsWith("http")) url = "https://" + url;

  tabs[active] = url;
  load();
  render();
}

function load() {
  const iframe = document.getElementById("view");
  const url = tabs[active];

  if (isBlocked(url)) {
    iframe.srcdoc = `
      <body style="background:#111;color:white;
      display:flex;align-items:center;justify-content:center;
      font-family:Arial;">
        Blocked by filter system
      </body>`;
    return;
  }

  iframe.src = url;
}

function isBlocked(url) {
  return blocked.some(b => url.includes(b));
}

function render() {
  const bar = document.getElementById("tabs");
  bar.innerHTML = "";

  tabs.forEach((t, i) => {
    const el = document.createElement("div");
    el.className = "tab" + (i === active ? " active" : "");
    el.innerText = "Tab " + (i + 1);

    el.onclick = () => {
      active = i;
      render();
      load();
    };

    bar.appendChild(el);
  });
}

// popup block simulation
window.open = function(url) {
  if (isBlocked(url)) return;
  alert("Popup blocked: " + url);
};

// init
newTab();
