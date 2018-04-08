// Canvas setup
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let img = new Image();
let fileName = "";
let fileExtension = "";

const downloadBtn = document.getElementById("download-btn");
const uploadFile = document.getElementById("upload-file");
const revertBtn = document.getElementById("revert-btn");

// Add Filters & Effects
document.addEventListener("click", e => {
  if (e.target.classList.contains("filter-btn")) {
    const classList = e.target.classList;

    switch (true) {
      case classList.contains("brightness-add"):
        Caman("#canvas", img, function() {
          this.brightness(5).render();
        });
        break;
      case classList.contains("brightness-remove"):
        Caman("#canvas", img, function() {
          this.brightness(-5).render();
        });
        break;
      case classList.contains("contrast-add"):
        Caman("#canvas", img, function() {
          this.contrast(5).render();
        });
        break;
      case classList.contains("contrast-remove"):
        Caman("#canvas", img, function() {
          this.contrast(-5).render();
        });
        break;
      case classList.contains("saturation-add"):
        Caman("#canvas", img, function() {
          this.saturation(5).render();
        });
        break;
      case classList.contains("saturation-remove"):
        Caman("#canvas", img, function() {
          this.saturation(-5).render();
        });
        break;
      case classList.contains("vibrance-add"):
        Caman("#canvas", img, function() {
          this.vibrance(5).render();
        });
        break;
      case classList.contains("vibrance-remove"):
        Caman("#canvas", img, function() {
          this.vibrance(-5).render();
        });
        break;
      case classList.contains("vintage-add"):
        Caman("#canvas", img, function() {
          this.vintage().render();
        });
        break;
      case classList.contains("lomo-add"):
        Caman("#canvas", img, function() {
          this.lomo().render();
        });
        break;
      case classList.contains("clarity-add"):
        Caman("#canvas", img, function() {
          this.clarity().render();
        });
        break;
      case classList.contains("sincity-add"):
        Caman("#canvas", img, function() {
          this.sinCity().render();
        });
        break;
      case classList.contains("crossprocess-add"):
        Caman("#canvas", img, function() {
          this.crossProcess().render();
        });
        break;
      case classList.contains("pinhole-add"):
        Caman("#canvas", img, function() {
          this.pinhole().render();
        });
        break;
      case classList.contains("nostalgia-add"):
        Caman("#canvas", img, function() {
          this.nostalgia().render();
        });
        break;
      case classList.contains("hermajesty-add"):
        Caman("#canvas", img, function() {
          this.herMajesty().render();
        });
        break;
      default:
        alert(`No filter has been found.`);
        break;
    }
  }
});

// Revert Filters
revertBtn.addEventListener("click", e => {
  Caman("#canvas", img, function() {
    this.revert();
  });
});

// Upload File
uploadFile.addEventListener("change", e => {
  // Get file
  const file = document.getElementById("upload-file").files[0];

  // Init FileReader
  const reader = new FileReader();

  if (file) {
    // Set file name
    [fileName, fileExtension] = file.name.split(".");

    // Read data as URL
    reader.readAsDataURL(file);
  }

  // Add image to canvas
  reader.addEventListener("load", () => {
    // Create img
    img = new Image();
    // Set src
    img.src = reader.result;
    // On image load, add to canvas
    img.onload = function() {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0, img.width, img.height);
      canvas.removeAttribute("data-caman-id");
    };
  });
});

// Download file
downloadBtn.addEventListener("click", e => {
  // Init file name
  let newFileName;

  // Check image type
  fileExtension === "png" || fileExtension === "jpg"
    ? (newFileName = `${fileName}-edited.${fileExtension}`)
    : alert("First, upload an image to download.");

  // Call download
  download(canvas, newFileName);
});

function download(canvas, filename) {
  let e;

  const link = document.createElement("a");
  link.download = filename;
  link.href = canvas.toDataURL("image/jpeg", 0.8);

  e = new MouseEvent("click");
  link.dispatchEvent(e);
}
