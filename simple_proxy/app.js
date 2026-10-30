(async () => {
  const status = document.getElementById("status");
  try {
    const { site, wisp } = window.LOADER_CONFIG;
    const base = new URL("./", location.href).pathname;
    const { ScramjetController } = $scramjetLoadController();
    const scramjet = new ScramjetController({
      prefix: base + "scramjet/",
      files: {
        wasm: "https://cdn.jsdelivr.net/gh/Destroyed12121/Staticsj@main/JS/scramjet.wasm.wasm",
        all: "https://cdn.jsdelivr.net/gh/Destroyed12121/Staticsj@main/JS/scramjet.all.js",
        sync: "https://cdn.jsdelivr.net/gh/Destroyed12121/Staticsj@main/JS/scramjet.sync.js"
      }
    });
    await scramjet.init();
    const connection = new BareMux.BareMuxConnection(base + "bareworker.js");
    await connection.setTransport(
      "https://cdn.jsdelivr.net/npm/@mercuryworkshop/epoxy-transport@2.1.28/dist/index.mjs",
      [{ wisp }]
    );
    const registration = await navigator.serviceWorker.register(base + "sw.js", { scope: base });
    await navigator.serviceWorker.ready;
    registration.active?.postMessage({ type: "config", wispurl: wisp, servers: [{ name: "Default", group: "Default", url: wisp }], autoswitch: false });
    const frame = scramjet.createFrame();
    document.getElementById("app").appendChild(frame.frame);
    await frame.go(site);
    status.hidden = true;
  } catch (error) {
    console.error(error);
    status.textContent = "Failed to load: " + error.message;
  }
})();
