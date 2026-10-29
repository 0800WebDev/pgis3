
const params = new URLSearchParams(window.location.search);
const requestedSite = params.get("url") || "/404.html";

let site = "/404.html";

try {
  const parsed = new URL(requestedSite);
  if (parsed.protocol === "http:" || parsed.protocol === "https:") {
    site = parsed.href;
  }
} catch {}

window.LOADER_CONFIG = {
  site,
  wisp: "wss://pgis-wisp.joytree.site/"
};
