const LAUNCH_MODE_KEY = "launchMode";

function getLaunchMode() {
  return localStorage.getItem(LAUNCH_MODE_KEY) || "default";
}

window.launchGame = function (game) {
  const mode = getLaunchMode();

  if (mode === "default") {
    location.href = `?lesson=${encodeURIComponent(game)}`;
    return;
  }

if (mode === "same") {
  document.body.innerHTML = `

<!--widgets-->
  
<div id="batteryWidget">
  <svg viewBox="0 0 24 24" class="battery-icon">
    <rect x="2" y="7" width="18" height="10" rx="2" ry="2"
      fill="none" stroke="currentColor" stroke-width="2"/>
    <rect id="batteryLevel" x="2.5" y="7" width="0" height="10"
      fill="currentColor"/>
    <rect x="20" y="10" width="2" height="4"
      fill="currentColor"/>
  </svg>

  <span id="batteryText">--%</span>
</div>

<style>


#batteryWidget {
  position: fixed;
  top: 10px;
  right: 10px;
  display: flex;
  align-items: center;
  gap: 6px;
  color: white;
  font-family: sans-serif;
  font-size: 14px;
  z-index: 9999;
}

.battery-icon {
  width: 24px;
  height: 24px;
}
</style>

<script>

</script>
  
<div id="fps-counter">FPS: N/A</div>

<style>
#fps-counter{
    position: fixed;
  top: 35px;
  right: 15px;
  display: flex;
  align-items: center;
  gap: 6px;
  color: white;
  font-family: sans-serif;
  font-size: 14px;
  z-index: 9999;
}
</style>



<div style="text-align: left; margin: 0; padding: 20px; background: black; color: whitesmoke; font-family: Arial;">
      <a onclick="location.reload();" style="color: white; text-decoration: underline;">← Back to Homepage</a>
      <a href="games/${game}.html" download style="margin-left: 12px;">Download game</a>
     <button
      id="fullscreenBtn"
      style="position: relative; z-index: 999999; border: medium; cursor: pointer; background-color: rgb(68, 68, 68); color: whitesmoke; border-radius: 5px;">
      Fullscreen
    </button>

    <button
      id="aboutBlankBtn"
      style="position: relative; z-index: 999999; background: rgb(68, 68, 68); color: whitesmoke; border-radius: 5px; border: medium; cursor: pointer;">
      Open in about:blank
    </button>

    <button
      id="cloakBtn"
      style="position: relative; z-index: 99999; border: medium; cursor: pointer; background-color: rgb(68, 68, 68); color: whitesmoke; border-radius: 5px;">
      Cloak tab
    </button>

      <h3 style="text-align: center;">PGIS</h3>
    </div>
  
    <iframe
      id="frame"
      src="games/${game}.html"
      style="height: 638px; width: 100%; max-width: 1500px; border: none; display: block; margin: 20px auto;"
      title="game">
    </iframe>

     

    






<style>
  
  #toolbox-btn {
    height: 100px;
    width: auto;
    border: none;
    border-radius: 0px;
    color: white;
    background-color: black;
    

  }
  #toolbox-content {
    padding: 10px;
    text-align: center;
  }
  #toolbox {
    background: black;
    display: flex;
  align-items: center;
    border-radius: 2px;
    box-shadow: 0 0 15px white;
    z-index: 999999999999999999999999999999999999999999999999999999;
  }
  .tool-item {
    height: 30px;
    width: 30px;
    color: black;
    background: white;
    border-radius: 4px;
    border: none;
  }
button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background: #555;
  color: #aaa;
}
</style>
<div id="toolbox">
  <div id="toolbox-content" hidden>
<b>toolbox</b> <br>
  <button title="about:blank" onclick="toolboxAboutBlank()" class="tool-item"><i class="fa-solid fa-school-circle-xmark"></i></button> <button title="tab cloak" onclick="tempTabCloak()" class="tool-item"><i class="fa-solid fa-computer"></i></button> <button title="panic button" onclick="toolboxRedirect()" class="tool-item"><i class="fa-solid fa-circle-exclamation"></i></button>
    <hr>
    <button disabled title="phantom refresh" onclick='
      
      (async()=>{try{const res=await fetch(location.href);const text=await res.text();const doc=new DOMParser().parseFromString(text,"text/html");document.head.innerHTML=doc.head.innerHTML;document.body.innerHTML=doc.body.innerHTML;console.log("page reset");}catch(e){console.error(e);}})(); setTimeout(() => {
  toolboxStart();
  loadSplash();
  initBattery();
  fps();
  particlesStart();
  
}, 400);
' class="tool-item"><i class="fa-solid fa-arrow-rotate-left"></i></button>
    <button title="remove element" onclick="startElementRemover();" class="tool-item"><i class="fa-solid fa-trash"></i></button> 
    <button title="remove from blacklist" onclick="removeBlocklist()" class="tool-item"><i class="fa-solid fa-list-check"></i></button>
  </div>
  <button id="toolbox-btn"><i id="toolbox-icon" class="fa-solid fa-caret-left"></i></button>


</div>




<script>
  
</script>
  `;


document.querySelector("#frame").contentDocument.head.appendChild(
  document.querySelector("#frame").contentDocument.createElement("script")
).src = "/blocksi_remover.js";


  
function toolboxStart() {
  const toolbox = document.getElementById("toolbox");
  const toolboxIcon = document.getElementById("toolbox-icon");
  const toolboxContent = document.getElementById("toolbox-content");
  const toolboxButton = document.getElementById("toolbox-btn");

  let dragging = false;
  let moved = false;
  let startX = 0;
  let startY = 0;
  let offsetY = 0;
  let toolboxIsOpen = !toolboxContent.hidden;
  let toolboxOnLeft = false;

  toolbox.style.position = "fixed";
  toolbox.style.right = "0";
  toolbox.style.top = "50%";
  toolbox.style.transform = "translateY(-50%)";
  toolbox.style.cursor = "grab";
  toolbox.style.touchAction = "none";
  toolbox.style.display = "flex";
  toolbox.style.alignItems = "center";
  toolbox.style.flexDirection = "row-reverse";

  function updateToolboxIcon() {
    if (toolboxOnLeft) {
      toolboxIcon.className = toolboxIsOpen
        ? "fa-solid fa-caret-left"
        : "fa-solid fa-caret-right";
    } else {
      toolboxIcon.className = toolboxIsOpen
        ? "fa-solid fa-caret-right"
        : "fa-solid fa-caret-left";
    }
  }

  toolbox.addEventListener("pointerdown", e => {
    dragging = true;
    moved = false;

    startX = e.clientX;
    startY = e.clientY;

    const rect = toolbox.getBoundingClientRect();
    offsetY = e.clientY - rect.top;

    toolbox.style.cursor = "grabbing";
    toolbox.style.transform = "none";

    e.preventDefault();
  });

  document.addEventListener("pointermove", e => {
    if (!dragging) return;

    if (
      Math.abs(e.clientX - startX) > 5 ||
      Math.abs(e.clientY - startY) > 5
    ) {
      moved = true;
    }

    const maxY = window.innerHeight - toolbox.offsetHeight;
    const y = Math.max(
      0,
      Math.min(e.clientY - offsetY, maxY)
    );

    toolbox.style.top = `${y}px`;

    if (e.clientX < window.innerWidth / 2) {
      toolbox.style.left = "0";
      toolbox.style.right = "auto";
      toolbox.style.flexDirection = "row";
      toolboxOnLeft = true;
    } else {
      toolbox.style.left = "auto";
      toolbox.style.right = "0";
      toolbox.style.flexDirection = "row-reverse";
      toolboxOnLeft = false;
    }

    updateToolboxIcon();
  });

  document.addEventListener("pointerup", () => {
    if (!dragging) return;

    dragging = false;
    toolbox.style.cursor = "grab";
  });

  document.addEventListener("pointercancel", () => {
    dragging = false;
    toolbox.style.cursor = "grab";
  });

  toolboxButton.addEventListener("click", e => {
    if (moved) {
      moved = false;
      return;
    }

    toolboxIsOpen = !toolboxIsOpen;
    toolboxContent.hidden = !toolboxIsOpen;

    updateToolboxIcon();
  });

  updateToolboxIcon();
}

toolboxStart();
  

  function startElementRemover() {
  let active = true;
  let highlighted = null;

  function highlight(element) {
    if (!active) return;
    if (element === document.body || element === document.documentElement) return;

    if (highlighted && highlighted !== element) {
      highlighted.style.outline = highlighted.dataset.originalOutline || "";
    }

    if (highlighted !== element) {
      highlighted = element;
      highlighted.dataset.originalOutline = element.style.outline || "";
      element.style.outline = "2px solid red";
    }
  }

  function mouseMove(event) {
    if (!active) return;

    const element = document.elementFromPoint(
      event.clientX,
      event.clientY
    );

    highlight(element);
  }

  function click(event) {
    if (!active) return;

    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();

    const element = document.elementFromPoint(
      event.clientX,
      event.clientY
    );

    if (
      !element ||
      element === document.body ||
      element === document.documentElement
    ) {
      return;
    }

    element.remove();

    active = false;

    document.removeEventListener("mousemove", mouseMove, true);
    document.removeEventListener("click", click, true);

    if (highlighted) {
      highlighted.style.outline = highlighted.dataset.originalOutline || "";
      delete highlighted.dataset.originalOutline;
    }

    highlighted = null;
  }

  document.addEventListener("mousemove", mouseMove, true);
  document.addEventListener("click", click, true);
}


function removeBlocklist() {
    //remove elements by id
 const blocklist = [
  "tpScreenLockCover"
];

blocklist.forEach(id => {
  const element = document.getElementById(id);

  if (element) {
    element.remove();
  }
}); 
    //remove images

  const imageSrcBlocklist = [
  "images/icons/blocked_content/youtube-denied.png",
  "images/icons/blocked_content/iframe-denied.png",
  "https://storage.googleapis.com/custom_extension_pages_files/",
  "https://storage.googleapis.com/blocksi_files/gamingdisabled.png",
  "iframe-denied.png"
];

document.querySelectorAll("img").forEach(img => {
  if (imageSrcBlocklist.some(src => img.src.includes(src))) {
    img.remove();
  }
});
    
}

  
window.openFullscreen = function () {
      const iframe = document.getElementById("frame");

      if (iframe.requestFullscreen) {
        iframe.requestFullscreen();
      } else if (iframe.webkitRequestFullscreen) {
        iframe.webkitRequestFullscreen();
      } else if (iframe.msRequestFullscreen) {
        iframe.msRequestFullscreen();
      }
    };

    document
      .getElementById("fullscreenBtn")
      .addEventListener("click", openFullscreen);

    window.loadUrl = function () {
      const win = window.open("about:blank");

      if (!win) return;

      win.document.open();
      win.document.write(document.documentElement.outerHTML);
      win.document.close();
    };

    document
      .getElementById("aboutBlankBtn")
      .addEventListener("click", loadUrl);

    function cloakTab() {
      const btn = document.getElementById("cloakBtn");

      let toggled = false;

      const originalTitle = document.title;

      function setFavicon(url) {
        let link =
          document.querySelector("link[rel~='icon']") ||
          document.createElement("link");

        link.type = "image/x-icon";
        link.rel = "icon";
        link.href = url;

        document.head.appendChild(link);
      }

      const originalFavicon =
        document.querySelector("link[rel~='icon']")?.href || "";

      btn.onclick = function () {
        toggled = !toggled;

        if (toggled) {
          document.title = "Google Classroom";

          setFavicon(
            "https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://staticin.pages.dev/settings&size=16"
          );
        } else {
          document.title = originalTitle;
          setFavicon(originalFavicon);
        }
      };
    }

    cloakTab();





    

//widgets start//

//fps//
const iframe = document.getElementById("frame");
const counter = document.getElementById("fps-counter");

let last = performance.now();
let frames = 0;

function loop(now) {
    const win = iframe.contentWindow;

    // Only count when iframe is active and accessible
    if (win && document.hasFocus()) {
        frames++;

        const delta = now - last;

        if (delta >= 500) {
            const fps = Math.round((frames * 1000) / delta);
            counter.textContent = "FPS: " + fps;

            frames = 0;
            last = now;
        }
    }

    requestAnimationFrame(loop);
}

iframe.addEventListener("load", () => {
    last = performance.now();
    frames = 0;
});

requestAnimationFrame(loop);
  
//battery//


async function initBattery() {
  if (!navigator.getBattery) {
    document.getElementById("batteryText").textContent = "N/A";
    return;
  }

  const battery = await navigator.getBattery();

  function update() {
    const level = Math.round(battery.level * 100);

    document.getElementById("batteryText").textContent = level + "%";

    const fill = document.getElementById("batteryLevel");
    fill.setAttribute("width", (level / 100) * 16.5);
  }

  update();

  battery.addEventListener("levelchange", update);
  battery.addEventListener("chargingchange", update);
}

initBattery();


//widgets end//

  
  return;
}

  if (mode === "aboutblank") {
    const win = window.open("about:blank");

    if (!win) return;

    const iframe = win.document.createElement("iframe");

    iframe.src =
      `${location.origin}${location.pathname}?lesson=${encodeURIComponent(game)}`;

    iframe.style.width = "100%";
    iframe.style.height = "100vh";
    iframe.style.border = "none";

    win.document.body.style.margin = "0";
    win.document.body.appendChild(iframe);
  }
};






const gamesEl = document.getElementById("games");

let games = [];

const params = new URLSearchParams(location.search);
const currentGame = params.get("lesson");

async function getGames(type = "games") {
  return await fetch(`${type}.json`).then(r => r.json());
}


async function getApps() {
  return await fetch("apps.json").then(r => r.json());
}



if (currentGame) {
  (async () => {
    const [games, apps] = await Promise.all([
      getGames(),
      getApps()
    ]);

    const allItems = [...games, ...apps];

    if (!allItems.includes(currentGame)) {
      document.body.innerHTML = "Not found";
      throw new Error("Not found");
    }



//if (currentGame) {
//  (async () => {
//    const games = await getGames();
//
//    if (!games.includes(currentGame)) {
//      document.body.innerHTML = "Game not found";
//      throw new Error("Lesson not found");
//    }

    document.body.innerHTML = `
<!--widgets-->
  
<div id="batteryWidget">
  <svg viewBox="0 0 24 24" class="battery-icon">
    <rect x="2" y="7" width="18" height="10" rx="2" ry="2"
      fill="none" stroke="currentColor" stroke-width="2"/>
    <rect id="batteryLevel" x="2.5" y="7" width="0" height="10"
      fill="currentColor"/>
    <rect x="20" y="10" width="2" height="4"
      fill="currentColor"/>
  </svg>

  <span id="batteryText">--%</span>
</div>

<style>


#batteryWidget {
  position: fixed;
  top: 10px;
  right: 10px;
  display: flex;
  align-items: center;
  gap: 6px;
  color: white;
  font-family: sans-serif;
  font-size: 14px;
  z-index: 9999;
}

.battery-icon {
  width: 24px;
  height: 24px;
}
</style>

<script>

</script>
  
<div id="fps-counter">FPS: N/A</div>

<style>
#fps-counter{
    position: fixed;
  top: 35px;
  right: 15px;
  display: flex;
  align-items: center;
  gap: 6px;
  color: white;
  font-family: sans-serif;
  font-size: 14px;
  z-index: 9999;
}
</style>




  
<!--main content-->
  

    
    <div style="text-align: left; margin: 0; padding: 20px; background: black; color: whitesmoke; font-family: Arial;">
      <a href="/" style="color: white;">← Back to Homepage</a>
      <a href="games/${currentGame}.html" download style="margin-left: 12px;">Download game</a>
     <button
      id="fullscreenBtn"
      style="position: relative; z-index: 999999; border: medium; cursor: pointer; background-color: rgb(68, 68, 68); color: whitesmoke; border-radius: 5px;">
      Fullscreen
    </button>

    <button
      id="aboutBlankBtn"
      style="position: relative; z-index: 999999; background: rgb(68, 68, 68); color: whitesmoke; border-radius: 5px; border: medium; cursor: pointer;">
      Open in about:blank
    </button>

    <button
      id="cloakBtn"
      style="position: relative; z-index: 99999; border: medium; cursor: pointer; background-color: rgb(68, 68, 68); color: whitesmoke; border-radius: 5px;">
      Cloak tab
    </button>
      <h3 style="text-align: center;">PGIS</h3>
    </div>

    <iframe
      id="frame"
      src="games/${currentGame}.html"
      style="height: 638px; width: 100%; max-width: 1500px; border: none; display: block; margin: 20px auto;"
      title="game">
    </iframe>




    






<style>
  
  #toolbox-btn {
    height: 100px;
    width: auto;
    border: none;
    border-radius: 0px;
    color: white;
    background-color: black;
    

  }
  #toolbox-content {
    padding: 10px;
    text-align: center;
  }
  #toolbox {
    background: black;
    display: flex;
  align-items: center;
    border-radius: 2px;
    box-shadow: 0 0 15px white;
    z-index: 999999999999999999999999999999999999999999999999999999;
  }
  .tool-item {
    height: 30px;
    width: 30px;
    color: black;
    background: white;
    border-radius: 4px;
    border: none;
  }
  button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background: #555;
  color: #aaa;
}
</style>
<div id="toolbox">
  <div id="toolbox-content" hidden>
<b>toolbox</b> <br>
  <button title="about:blank" onclick="toolboxAboutBlank()" class="tool-item"><i class="fa-solid fa-school-circle-xmark"></i></button> <button title="tab cloak" onclick="tempTabCloak()" class="tool-item"><i class="fa-solid fa-computer"></i></button> <button title="panic button" onclick="toolboxRedirect()" class="tool-item"><i class="fa-solid fa-circle-exclamation"></i></button>
    <hr>
    <button disabled title="phantom refresh" onclick='
      
      (async()=>{try{const res=await fetch(location.href);const text=await res.text();const doc=new DOMParser().parseFromString(text,"text/html");document.head.innerHTML=doc.head.innerHTML;document.body.innerHTML=doc.body.innerHTML;console.log("page reset");}catch(e){console.error(e);}})(); setTimeout(() => {
  toolboxStart();
  loadSplash();
  initBattery();
  fps();
  particlesStart();
  
}, 400);
' class="tool-item"><i class="fa-solid fa-arrow-rotate-left"></i></button>
    <button title="remove element" onclick="startElementRemover();" class="tool-item"><i class="fa-solid fa-trash"></i></button> 
    <button title="remove from blacklist" onclick="removeBlocklist()" class="tool-item"><i class="fa-solid fa-list-check"></i></button>
  </div>
  <button id="toolbox-btn"><i id="toolbox-icon" class="fa-solid fa-caret-left"></i></button>


</div>


    `;

function toolboxStart() {
  const toolbox = document.getElementById("toolbox");
  const toolboxIcon = document.getElementById("toolbox-icon");
  const toolboxContent = document.getElementById("toolbox-content");
  const toolboxButton = document.getElementById("toolbox-btn");

  let dragging = false;
  let moved = false;
  let startX = 0;
  let startY = 0;
  let offsetY = 0;
  let toolboxIsOpen = !toolboxContent.hidden;
  let toolboxOnLeft = false;

  toolbox.style.position = "fixed";
  toolbox.style.right = "0";
  toolbox.style.top = "50%";
  toolbox.style.transform = "translateY(-50%)";
  toolbox.style.cursor = "grab";
  toolbox.style.touchAction = "none";
  toolbox.style.display = "flex";
  toolbox.style.alignItems = "center";
  toolbox.style.flexDirection = "row-reverse";

  function updateToolboxIcon() {
    if (toolboxOnLeft) {
      toolboxIcon.className = toolboxIsOpen
        ? "fa-solid fa-caret-left"
        : "fa-solid fa-caret-right";
    } else {
      toolboxIcon.className = toolboxIsOpen
        ? "fa-solid fa-caret-right"
        : "fa-solid fa-caret-left";
    }
  }

  toolbox.addEventListener("pointerdown", e => {
    dragging = true;
    moved = false;

    startX = e.clientX;
    startY = e.clientY;

    const rect = toolbox.getBoundingClientRect();
    offsetY = e.clientY - rect.top;

    toolbox.style.cursor = "grabbing";
    toolbox.style.transform = "none";

    e.preventDefault();
  });

  document.addEventListener("pointermove", e => {
    if (!dragging) return;

    if (
      Math.abs(e.clientX - startX) > 5 ||
      Math.abs(e.clientY - startY) > 5
    ) {
      moved = true;
    }

    const maxY = window.innerHeight - toolbox.offsetHeight;
    const y = Math.max(
      0,
      Math.min(e.clientY - offsetY, maxY)
    );

    toolbox.style.top = `${y}px`;

    if (e.clientX < window.innerWidth / 2) {
      toolbox.style.left = "0";
      toolbox.style.right = "auto";
      toolbox.style.flexDirection = "row";
      toolboxOnLeft = true;
    } else {
      toolbox.style.left = "auto";
      toolbox.style.right = "0";
      toolbox.style.flexDirection = "row-reverse";
      toolboxOnLeft = false;
    }

    updateToolboxIcon();
  });

  document.addEventListener("pointerup", () => {
    if (!dragging) return;

    dragging = false;
    toolbox.style.cursor = "grab";
  });

  document.addEventListener("pointercancel", () => {
    dragging = false;
    toolbox.style.cursor = "grab";
  });

  toolboxButton.addEventListener("click", e => {
    if (moved) {
      moved = false;
      return;
    }

    toolboxIsOpen = !toolboxIsOpen;
    toolboxContent.hidden = !toolboxIsOpen;

    updateToolboxIcon();
  });

  updateToolboxIcon();
}

toolboxStart();

  

  function startElementRemover() {
  let active = true;
  let highlighted = null;

  function highlight(element) {
    if (!active) return;
    if (element === document.body || element === document.documentElement) return;

    if (highlighted && highlighted !== element) {
      highlighted.style.outline = highlighted.dataset.originalOutline || "";
    }

    if (highlighted !== element) {
      highlighted = element;
      highlighted.dataset.originalOutline = element.style.outline || "";
      element.style.outline = "2px solid red";
    }
  }

  function mouseMove(event) {
    if (!active) return;

    const element = document.elementFromPoint(
      event.clientX,
      event.clientY
    );

    highlight(element);
  }

  function click(event) {
    if (!active) return;

    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();

    const element = document.elementFromPoint(
      event.clientX,
      event.clientY
    );

    if (
      !element ||
      element === document.body ||
      element === document.documentElement
    ) {
      return;
    }

    element.remove();

    active = false;

    document.removeEventListener("mousemove", mouseMove, true);
    document.removeEventListener("click", click, true);

    if (highlighted) {
      highlighted.style.outline = highlighted.dataset.originalOutline || "";
      delete highlighted.dataset.originalOutline;
    }

    highlighted = null;
  }

  document.addEventListener("mousemove", mouseMove, true);
  document.addEventListener("click", click, true);
}


function removeBlocklist() {
    //remove elements by id
 const blocklist = [
  "tpScreenLockCover"
];

blocklist.forEach(id => {
  const element = document.getElementById(id);

  if (element) {
    element.remove();
  }
}); 
    //remove images

  const imageSrcBlocklist = [
  "images/icons/blocked_content/youtube-denied.png",
  "images/icons/blocked_content/iframe-denied.png",
  "https://storage.googleapis.com/custom_extension_pages_files/",
  "https://storage.googleapis.com/blocksi_files/gamingdisabled.png",
  "iframe-denied.png"
];

document.querySelectorAll("img").forEach(img => {
  if (imageSrcBlocklist.some(src => img.src.includes(src))) {
    img.remove();
  }
});
    
}

    
    window.openFullscreen = function () {
      const iframe = document.getElementById("frame");

      if (iframe.requestFullscreen) {
        iframe.requestFullscreen();
      } else if (iframe.webkitRequestFullscreen) {
        iframe.webkitRequestFullscreen();
      } else if (iframe.msRequestFullscreen) {
        iframe.msRequestFullscreen();
      }
    };

    document
      .getElementById("fullscreenBtn")
      .addEventListener("click", openFullscreen);

    window.loadUrl = function () {
      const win = window.open("about:blank");

      if (!win) return;

      win.document.open();
      win.document.write(document.documentElement.outerHTML);
      win.document.close();
    };

    document
      .getElementById("aboutBlankBtn")
      .addEventListener("click", loadUrl);

    function cloakTab() {
      const btn = document.getElementById("cloakBtn");

      let toggled = false;

      const originalTitle = document.title;

      function setFavicon(url) {
        let link =
          document.querySelector("link[rel~='icon']") ||
          document.createElement("link");

        link.type = "image/x-icon";
        link.rel = "icon";
        link.href = url;

        document.head.appendChild(link);
      }

      const originalFavicon =
        document.querySelector("link[rel~='icon']")?.href || "";

      btn.onclick = function () {
        toggled = !toggled;

        if (toggled) {
          document.title = "Google Classroom";

          setFavicon(
            "https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://staticin.pages.dev/settings&size=16"
          );
        } else {
          document.title = originalTitle;
          setFavicon(originalFavicon);
        }
      };
    }

    cloakTab();





    

//widgets start//

//fps//
const iframe = document.getElementById("frame");
const counter = document.getElementById("fps-counter");

let last = performance.now();
let frames = 0;

function loop(now) {
    const win = iframe.contentWindow;

    // Only count when iframe is active and accessible
    if (win && document.hasFocus()) {
        frames++;

        const delta = now - last;

        if (delta >= 500) {
            const fps = Math.round((frames * 1000) / delta);
            counter.textContent = "FPS: " + fps;

            frames = 0;
            last = now;
        }
    }

    requestAnimationFrame(loop);
}

iframe.addEventListener("load", () => {
    last = performance.now();
    frames = 0;
});

requestAnimationFrame(loop);
    
//battery//


async function initBattery() {
  if (!navigator.getBattery) {
    document.getElementById("batteryText").textContent = "N/A";
    return;
  }

  const battery = await navigator.getBattery();

  function update() {
    const level = Math.round(battery.level * 100);

    document.getElementById("batteryText").textContent = level + "%";

    const fill = document.getElementById("batteryLevel");
    fill.setAttribute("width", (level / 100) * 16.5);
  }

  update();

  battery.addEventListener("levelchange", update);
  battery.addEventListener("chargingchange", update);
}

initBattery();


//widgets end//




    




    
  })();
}

window.loadGames = async function (type = "games") {
  const items = await getGames(type);

  const container = document.getElementById("games");
  if (!container) return;

  container.innerHTML = `
  <br><br>
  <form id="codeForm"> <input type="text" id="search" placeholder="Search" enterkeyhint="go"/> </form><br>
    <div id="cards2">
      ${items.map(item => `
        <div class="gamediv">
          <b>${item}</b>
          <img src="games/${item}.png" width="100" height="100">
          <button onclick="launchGame('${item}')">
            open
          </button>
        </div>
      `).join("")}
    </div>
    <br><br>
    <br><br>
  `;


const searchInput = document.getElementById('search');
const gameDivs = document.querySelectorAll('.gamediv');

searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();

    gameDivs.forEach(div => {
        const gameName = div.querySelector('b').textContent.toLowerCase();
        if (gameName.includes(query) || query === '') {
            div.style.display = 'flex'; // show matching games
        } else {
            div.style.display = 'none'; // hide non-matching games
        }
    });
});
document.querySelector("#search").addEventListener("input", function () {
  if (this.value === "'%[l#o#g#o.t#h#e#m#e]**,") {
    window.location.href = "/theme-test.html";
  }
});
};





window.Home = async function () {




  
  const html = await fetch("/index.html").then(r => r.text());
  const doc = new DOMParser().parseFromString(html, "text/html");

  document.getElementById("games").innerHTML =
    doc.getElementById("games").innerHTML;

loadSplash();
 
};

window.proxy = async function () {
    document.getElementById("games").innerHTML = `
      <iframe id="browser" src="/browser/index.html"></iframe>
    `;
};

window.settings = async function () {
    document.getElementById("games").innerHTML = `
       <div class="card">
  <div class="settings">
    <h2>Panic key</h2>
  <h3>The panic key is <b>ctrl + q</b></h3>
  
  <p style="display: inline-block;">Panic key url:</p> 
<input id="panicUrl" type="text" placeholder="google.com">
  </div>
    <div class="settings">

 <h2>Tab cloak</h2>

    <button id="toggleButton">ON/OFF</button>
<br>
    <p style="display: inline-block;">Title: </p>
    <input id="cloakTitleInput" type="text" placeholder="Google Classroom">
<br>
    <p style="display: inline-block;">Favicon URL: </p>
    <input id="cloakIconInput" type="text" placeholder="https://...">

    </div>
    <div class="settings">

    <h2>URL cloak</h2>
    <button id="aboutBlankBtn">Open site in about:blank</button> <button id="blobBtn">Open site in blob:</button>
    </div>
        <div class="settings">

    <h2>Theme</h2>
    <button id="themeToggle">Light Mode (beta)</button> <button id="particlesToggle">Particles</button>
    </div>

<div class="settings">
  <h2>Game Launch Mode</h2>

  <select id="launchMode">
    <option value="default">Default (?lesson=)</option>
    <option value="same">Same URL</option>
    <option value="aboutblank">About:blank</option>
  </select>
</div>
      <div class="settings">
  <h2>Close protection</h2>
    <button id="closeProtectionToggle">OFF</button>
      </div>
    </div>
<br><br>
<details>
  <summary>Advanced</summary>
    <div class="card">
  <div class="settings">
  <h2>browser</h2>
  <!--<p style="display: inline-block;">embedd URL (must start with http(s)://)</p>
  <input placeholder="/browser/index.html" id="browserUrl">-->
  <strong>Setting locked.</strong>
  <small>were still working on this setting, come back later.</small>
  </div>
  <div class="settings">
  <h2>eruda dev tools</h2>
  <button id="erudaButtonToggle">Eruda Button Toggle</button>
</div>

  <div class="settings">
  <h2>JavaScript runner</h2>
  <textarea id="jsCode" placeholder="Enter JavaScript here"></textarea>
<button id="runJsButton">Run JavaScript</button>
</div>
  
  </div>
</details>

<br><br>
<br><br>
    </div>
          `;

const toggle = document.getElementById("closeProtectionToggle");

function updateCloseProtection() {
    const enabled = localStorage.closeProtection === "true";
    toggle.textContent = `${enabled ? "ON" : "OFF"}`;
closeProtectionInit()
}

toggle.addEventListener("click", () => {
    localStorage.closeProtection =
        localStorage.closeProtection === "true" ? "false" : "true";

    updateCloseProtection();
});

updateCloseProtection();

  
  
  updateToggleButton();

const launchMode = document.getElementById("launchMode");

if (launchMode) {
  launchMode.value = getLaunchMode();
}
  
};


window.chat = async function () {
    document.getElementById("games").innerHTML = `
      <iframe src="/pages/chat.html"></iframe>
      `;



  
function initAuthListener() {
  window.addEventListener("message", (event) => {
    if (event.data.type === "AUTH_SYNC") {
      const {
        username,
        avatar_url,
        role,
        status_text,
        is_banned,
        user_id
      } = event.data.payload;

      localStorage.setItem("username", username);
      localStorage.setItem("avatar_url", avatar_url);
      localStorage.setItem("role", role);
      localStorage.setItem("status_text", status_text);
      localStorage.setItem("is_banned", String(is_banned));
      localStorage.setItem("user_id", user_id);
    }
  });
}

initAuthListener();


  
  
};



window.info = async function () {
    document.getElementById("games").innerHTML = `
      <iframe src="/pages/info.html"></iframe>
      `;
};

window.movies = async function () {
    document.getElementById("games").innerHTML = `
      <iframe src="/pages/movies.html"></iframe>
      `;
};


window.test = async function () {
    document.getElementById("games").innerHTML = `
      <h1 class="main-text">test</h1>
      <p>this is an example page in pgis 3</p>
    `;
};










//settings//





document.addEventListener("change", (e) => {
  if (e.target && e.target.id === "panicUrl") {
    saveUrl(e.target.value);
  }
});

document.addEventListener("keydown", (e) => {
  if (e.target && e.target.id === "panicUrl" && e.key === "Enter") {
    saveUrl(e.target.value);
  }

  if (e.ctrlKey && e.key.toLowerCase() === "q") {
    e.preventDefault();
    window.location.href =
      localStorage.getItem("redirectUrl") || "https://google.com";
  }
});

function saveUrl(value) {
  let url = value.trim();
  if (!url) return;

  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    url = "https://" + url;
  }

  localStorage.setItem("redirectUrl", url);
  alert("Saved");
}










const TOGGLE_KEY = "buttonEnabled";
const CLOAK_TITLE_KEY = "cloakTitle";
const CLOAK_ICON_KEY = "cloakIcon";

const originalTitle = document.title;
const originalFavicon =
  document.querySelector("link[rel~='icon']")?.href || "";

function setFavicon(url) {
  let link = document.querySelector("link[rel~='icon']");

  if (!link) {
    link = document.createElement("link");
    link.rel = "icon";
    document.head.appendChild(link);
  }

  link.href = url;
}

function applyCloak() {
  const enabled = localStorage.getItem(TOGGLE_KEY) === "true";

  const title =
    localStorage.getItem(CLOAK_TITLE_KEY) || "Google Classroom";

  const icon =
    localStorage.getItem(CLOAK_ICON_KEY) ||
    "https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://staticin.pages.dev/settings&size=16";

  if (enabled) {
    document.title = title;
    setFavicon(icon);
  } else {
    document.title = originalTitle;
    setFavicon(originalFavicon);
  }

  updateToggleButton();
}

function updateToggleButton() {
  const button = document.getElementById("toggleButton");
  if (!button) return;

  const enabled = localStorage.getItem(TOGGLE_KEY) === "true";
  button.textContent = enabled ? "ON" : "OFF";
}

document.addEventListener("click", (e) => {
  if (e.target?.id === "toggleButton") {
    const enabled = localStorage.getItem(TOGGLE_KEY) === "true";
    localStorage.setItem(TOGGLE_KEY, (!enabled).toString());
    applyCloak();
  }
});

document.addEventListener("input", (e) => {
  if (e.target?.id === "cloakTitleInput") {
    localStorage.setItem(CLOAK_TITLE_KEY, e.target.value);
    applyCloak();
  }

  if (e.target?.id === "cloakIconInput") {
    localStorage.setItem(CLOAK_ICON_KEY, e.target.value);
    applyCloak();
  }
});

if (localStorage.getItem(TOGGLE_KEY) === null) {
  localStorage.setItem(TOGGLE_KEY, "false");
}

applyCloak();
















document.addEventListener("click", (e) => {
  const btn = e.target.closest("#aboutBlankBtn");
  if (!btn) return;

  const win = window.open("about:blank");

  const iframe = win.document.createElement("iframe");
  iframe.style.width = "100%";
  iframe.style.height = "100%";
  iframe.style.border = "none";
  iframe.src = window.location.href;

  win.document.body.style.margin = "0";
  win.document.body.appendChild(iframe);
});


document.addEventListener("click", (e) => {
  const btn = e.target.closest("#blobBtn");
  if (!btn) return;

  const html = `
    <!doctype html>
    <html>
      <head>
        <style>
          html, body {
            margin: 0;
            height: 100%;
            overflow: hidden;
          }
          iframe {
            width: 100%;
            height: 100%;
            border: none;
          }
        </style>
      </head>
      <body>
        <iframe src="${location.href}"></iframe>
      </body>
    </html>
  `;

  const blob = new Blob([html], { type: "text/html" });
  const url = URL.createObjectURL(blob);

  window.open(url);
});







const KEY = "theme";

function apply(theme) {
  document.documentElement.setAttribute("data-theme", theme);

  const btn = document.getElementById("themeToggle");
  if (btn) {
    btn.textContent = theme === "dark" ? "Light mode" : "Dark mode";
  }
}

function getTheme() {
  return localStorage.getItem(KEY) || "dark";
}

function toggle() {
  const current = getTheme();
  const next = current === "dark" ? "light" : "dark";

  localStorage.setItem(KEY, next);
  apply(next);
}

document.addEventListener("click", (e) => {
  if (e.target && e.target.id === "themeToggle") {
    toggle();
  }
});

apply(getTheme());










const PARTICLES_KEY = "particlesEnabled";

function updateParticles() {
  const enabled = localStorage.getItem(PARTICLES_KEY) !== "false";

  const particles = document.getElementById("particles-js");
  if (particles) {
    particles.style.display = enabled ? "" : "none";
  }

  const button = document.getElementById("particlesToggle");
  if (button) {
    button.textContent = enabled ? "Particles: ON" : "Particles: OFF";
  }
}

document.addEventListener("click", (e) => {
  const button = e.target.closest("#particlesToggle");
  if (!button) return;

  const enabled = localStorage.getItem(PARTICLES_KEY) !== "false";
  localStorage.setItem(PARTICLES_KEY, String(!enabled));

  updateParticles();
});

if (localStorage.getItem(PARTICLES_KEY) === null) {
  localStorage.setItem(PARTICLES_KEY, "true");
}

updateParticles();



















const STORAGE_KEY = "iframeUrl";

function applyBrowserUrl(url) {
  const iframe = document.getElementById("browser");
  if (iframe && url) {
    iframe.src = url;
  }
}

function saveBrowserUrl(url) {
  localStorage.setItem(STORAGE_KEY, url);
  applyBrowserUrl(url);
}

function bindBrowserUrlInput() {
  const input = document.getElementById("browserUrl");
  if (!input || input.dataset.bound === "true") return;

  input.dataset.bound = "true";

  input.addEventListener("keydown", (e) => {
    if (e.key !== "Enter") return;

    const url = input.value.trim();
    if (!url) return;

    saveBrowserUrl(url);
  });
}

function applySavedBrowserUrl() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) applyBrowserUrl(saved);
}

const observer = new MutationObserver(() => {
  bindBrowserUrlInput();
  applySavedBrowserUrl();
});

observer.observe(document.documentElement, {
  childList: true,
  subtree: true
});

bindBrowserUrlInput();
applySavedBrowserUrl();




















const ERUDA_BUTTON_KEY = "eruda_button_visible";

function applyErudaButtonState() {
  const visible = localStorage.getItem(ERUDA_BUTTON_KEY) !== "false";

  const erudaContainer = document.getElementById("eruda");
  if (erudaContainer) {
    erudaContainer.style.display = visible ? "" : "none";
  }

  const btn = document.getElementById("erudaButtonToggle");
  if (btn) {
    btn.textContent = visible
      ? "Eruda Button ON"
      : "Eruda Button OFF";
  }
}

function toggleErudaButton() {
  const visible = localStorage.getItem(ERUDA_BUTTON_KEY) !== "false";
  localStorage.setItem(ERUDA_BUTTON_KEY, (!visible).toString());
  applyErudaButtonState();
}

document.addEventListener("click", (e) => {
  if (e.target?.id === "erudaButtonToggle") {
    toggleErudaButton();
  }
});

document.addEventListener("DOMContentLoaded", applyErudaButtonState);













document.addEventListener("click", (e) => {
  if (e.target?.id !== "runJsButton") return;

  const textarea = document.getElementById("jsCode");

  if (!textarea) {
    alert("Textarea not found.");
    return;
  }

  const code = textarea.value;

  if (!code.trim()) {
    alert("Please enter some JavaScript.");
    return;
  }

  if (!confirm(
    "Warning: Running JavaScript can break the page or cause unexpected behavior.\n\nDo you want to continue?"
  )) {
    return;
  }

  try {
    new Function(code)();
  } catch (err) {
    alert("Error:\n" + err);
    console.error(err);
  }
});





document.addEventListener("change", (e) => {
  if (e.target?.id === "launchMode") {
    localStorage.setItem(LAUNCH_MODE_KEY, e.target.value);
  }
});


window.tempTabCloak = function () {
  document.title = "Google Classroom";

const favicon = document.querySelector("link[rel~='icon']") || document.createElement("link");
favicon.rel = "icon";
favicon.href = "https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://staticin.pages.dev/settings&size=16";

if (!document.head.contains(favicon)) {
  document.head.appendChild(favicon);
}
}

window.toolboxRedirect = function () {
window.location.href = "https://google.com";
}

window.toolboxAboutBlank = function () {
  const url = location.href;

  const win = window.open("about:blank");

  if (!win) return;

  win.document.write(`
    <!doctype html>
    <html>
      <body style="margin:0;overflow:hidden;">
        <iframe
          src="${url}"
          style="position:fixed;inset:0;width:100%;height:100%;border:none;"
        ></iframe>
      </body>
    </html>
  `);

  win.document.close();
};

function closeProtectionInit() {

if (localStorage.closeProtection === "true") {
    if ("navigation" in window) {
        navigation.addEventListener("navigate", e => {
            if (e.canIntercept) {
                e.preventDefault();
            }
        });
    }

    window.addEventListener("beforeunload", e => {
        e.preventDefault();
        e.returnValue = "";
    });
}

  }

closeProtectionInit()



