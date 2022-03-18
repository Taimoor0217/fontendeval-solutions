class ImageCarousel {
  constructor(dataSource, carouselContainerSelector, interval, options = {}) {
    this.dataSource = dataSource;
    this.carouselContainer = document.querySelector(carouselContainerSelector);
    this.displayImage = null;
    this.imageUrls = [];
    this.interval = interval;
    this.currentImageIndex = 0;
    this.nextImageInterval = null;
    this.fetchData();
    this.next = this.next.bind(this);
  }
  // with the assumption that all the data would look similar
  async fetchData() {
    try {
      const rawData = await fetch(this.dataSource);
      const jsonData = await rawData.json();
      const images = jsonData.data.children;
      this.imageUrls = images.map((image, index) => {
        //place check before returning
        return {
          title: image.data.title,
          url: image.data.thumbnail,
        };
      });
      console.log(this.imageUrls);
      this.render();
    } catch (err) {
      throw err;
      //set the error state
    }
  }
  deleteInteval() {
    // delete the interval
    clearInterval(this.nextImageInterval);
  }
  updateDisplayImageSource() {
    this.displayImage.src = this.imageUrls[this.currentImageIndex].url;
    this.displayImage.alt = this.imageUrls[this.currentImageIndex].title;
  }
  next() {
    this.currentImageIndex++;
    this.currentImageIndex %= this.imageUrls.length;
    this.updateDisplayImageSource();
  }
  startInterval() {
    this.nextImageInterval = setInterval(this.next, this.interval);
  }
  render() {
    const displayImage = document.createElement("img");
    displayImage.className = "carousel-display-image";
    displayImage.src = this.imageUrls[this.currentImageIndex].url;
    displayImage.alt = this.imageUrls[this.currentImageIndex].title;
    this.displayImage = displayImage;
    this.carouselContainer.appendChild(displayImage);
    this.startInterval();
  }
}
const imageCarousel1 = new ImageCarousel(
  "https://www.reddit.com/r/aww/top/.json?t=all",
  "#image-carousel",
  2000
);
// imageCarousel1.deleteInteval()
