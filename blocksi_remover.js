
  const blocksiUrl = "chrome-extension://ghlpmldmjjhmdgmneoaibbegkjjbonbk/images/icons/yt-denied.png";

fetch(blocksiUrl)
    .then(response => {
        if (response.ok) {
          console.log("blocksi extension detected");
            setTimeout(() => {
                document.querySelector("#__blocksi_iframe_blocked__")?.remove();
            }, 2000);
        }
    })
    .catch(() => {});
