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
