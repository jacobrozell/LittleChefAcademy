// Public site config. The Web3Forms access key is meant to be public
// (it only lets people email Mac). Lock the key to this domain in the
// Web3Forms dashboard when you paste it. Do not put other secrets here.
window.MLCA = {
  preview: true,
  web3formsKey: "",
  cloudflareBeacon: "",
  // Mac's public email. Shows in the footer and in the form's error message
  // so parents have a fallback if a send fails. Leave "" to hide it.
  contactEmail: "",
};
