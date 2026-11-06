(async () => {
  const status = document.getElementById("status");

  try {
    const { site, wisp } = window.LOADER_CONFIG;
    const base = new URL("./", location.href).pathname;

    const cdns = [
      "https://cdn.jsdelivr.net/gh/Destroyed12121/Staticsj@main/",
      "https://raw.githubusercontent.com/Destroyed12121/Staticsj/main/",
      "https://esm.sh/gh/Destroyed12121/Staticsj@main/"
    ];

    async function loadScramjetFiles() {
      for (const cdn of cdns) {
        try {
          const files = {
            wasm: cdn + "JS/scramjet.wasm.wasm",
            all: cdn + "JS/scramjet.all.js",
            sync: cdn + "JS/scramjet.sync.js"
          };

          await Promise.all(
            Object.values(files).map(async url => {
              const response = await fetch(url);
              if (!response.ok) throw new Error(`HTTP ${response.status}: ${url}`);
            })
          );

          return files;
        } catch (error) {
          console.warn("Scramjet CDN failed:", cdn, error);
        }
      }

      throw new Error("All Scramjet CDNs failed.");
    }

    const { ScramjetController } = $scramjetLoadController();

    const scramjet = new ScramjetController({
      prefix: base + "scramjet/",
      files: await loadScramjetFiles()
    });

    await scramjet.init();

    const connection = new BareMux.BareMuxConnection(base + "bareworker.js");

    await connection.setTransport(
      "https://cdn.jsdelivr.net/npm/@mercuryworkshop/epoxy-transport@2.1.28/dist/index.mjs",
      [{ wisp }]
    );

    const registration = await navigator.serviceWorker.register(
      base + "sw.js",
      { scope: base }
    );

    await navigator.serviceWorker.ready;

    registration.active?.postMessage({
      type: "config",
      wispurl: wisp,
      servers: [{ name: "Default", group: "Default", url: wisp }],
      autoswitch: false
    });

    const frame = scramjet.createFrame();
    document.getElementById("app").appendChild(frame.frame);

    await frame.go(site);
    status.hidden = true;

  } catch (error) {
    console.error(error);
    status.textContent = "Failed to load: " + error.message;
  }
})();
