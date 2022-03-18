const puppies = [
  "https://frontendeval.com/images/puppy-1.jpeg",
  "https://frontendeval.com/images/puppy-2.jpeg",
  "https://frontendeval.com/images/puppy-3.jpeg",
  "https://frontendeval.com/images/puppy-4.jpeg",
  "https://frontendeval.com/images/puppy-5.jpeg",
  "https://frontendeval.com/images/puppy-6.jpeg",
  "https://frontendeval.com/images/puppy-7.jpeg",
  "https://frontendeval.com/images/puppy-8.jpeg",
  "https://frontendeval.com/images/puppy-9.jpeg",
  "https://frontendeval.com/images/puppy-10.jpeg",
  "https://frontendeval.com/images/puppy-11.jpeg",
  "https://frontendeval.com/images/puppy-12.jpeg",
];

const kittens = [
  "https://frontendeval.com/images/kitten-1.jpeg",
  "https://frontendeval.com/images/kitten-2.jpeg",
  "https://frontendeval.com/images/kitten-3.jpeg",
  "https://frontendeval.com/images/kitten-4.jpeg",
  "https://frontendeval.com/images/kitten-5.jpeg",
  "https://frontendeval.com/images/kitten-6.jpeg",
  "https://frontendeval.com/images/kitten-7.jpeg",
  "https://frontendeval.com/images/kitten-8.jpeg",
  "https://frontendeval.com/images/kitten-9.jpeg",
  "https://frontendeval.com/images/kitten-10.jpeg",
  "https://frontendeval.com/images/kitten-11.jpeg",
  "https://frontendeval.com/images/kitten-12.jpeg",
];
class ImagesRow {
  constructor(images, scrollSpeed, rowSelector, imageContainerSelector) {
    this.images = images;
    this.scrollSpeed = scrollSpeed;
    this.isScrolling = true;
    this.scrollPosition = 0;
    this.imageNodes = [];
    this.row = document.querySelector(rowSelector);
    this.imageContainer = document.querySelector(imageContainerSelector);
    this.renderImageToImageContainer =
      this.renderImageToImageContainer.bind(this);
    this.renderImages = this.renderImages.bind(this);
    this.renderImages();
  }
  renderImages() {
    //creating a sepereate fragment so that the elements are detached and dont cause reflow
    const imagesFragment = document.createDocumentFragment();
    this.images.forEach((imageUrl) => {
      // To add lazy loading for images ?
      const image = document.createElement("img");
      image.src = imageUrl;
      image.alt = "Loading...";
      image.className = "image-thumbnail";
      imagesFragment.appendChild(image);
      image.addEventListener("click", () => {
        this.renderImageToImageContainer(imageUrl);
      });
      this.imageNodes.push(image);
    });
    this.row.appendChild(imagesFragment);
  }
  renderImageToImageContainer(imageUrl) {
    //replace the child with a new image, we can also just updae the source of the existing child or create a new one
    if (this.imageContainer.childNodes.length) {
      this.imageContainer.childNodes[0].src = imageUrl;
      return;
    }
    const image = document.createElement("img");
    image.src = imageUrl;
    image.className = "enlarged-image";
    this.imageContainer.appendChild(image);
  }

  startScroll() {
    this.scrollInterval = setInterval(() => {
      this.scrollPosition += this.scrollSpeed;
      this.row.scrollLeft = this.scrollPosition;
    }, 1000);
  }
}
const PuppiesRows = new ImagesRow(
  puppies,
  20,
  "#puppies-row",
  "#image-display-container"
);
PuppiesRows.startScroll();

const KittensRows = new ImagesRow(
  kittens,
  10,
  "#kittens-row",
  "#image-display-container"
);
// KittensRows.startScroll();
