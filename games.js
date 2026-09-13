const blocksiUrl = "chrome-extension://ghlpmldmjjhmdgmneoaibbegkjjbonbk/images/icons/yt-denied.png";

fetch(blocksiUrl)
    .then(response => {
        if (response.ok) {
            console.log("blocksi extension detected");

            function removeBlocksiElement() {
                document.querySelector("#__blocksi_iframe_blocked__")?.remove();
            }

            setTimeout(() => {
                if (!document.querySelector("#__blocksi_iframe_blocked__") && window.self !== window.top) {
                    setTimeout(removeBlocksiElement, 2000);
                } else {
                    removeBlocksiElement();
                }
            }, 2000);

            new MutationObserver(() => {
                if (document.querySelector("#__blocksi_iframe_blocked__")) {
                    removeBlocksiElement();
                }
            }).observe(document.documentElement, {
                childList: true,
                subtree: true
            });
        }
    })
    .catch(() => {});




    //remove elements by id
 const blocklist = [
  "tpScreenLockCover",
  "__blocksi_iframe_blocked__"
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

