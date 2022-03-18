class PlotHistograms {
  constructor(graphSelector, fetchUrl) {
    this.url = fetchUrl;
    this.data = [];
    this.xScale = 50;
    this.yScale = 50;
    this.height = 0;
    this.width = 0;
    this.graph = document.querySelector(graphSelector);
    this.getData();
  }
  async getData() {
    try {
      //add pagination to the Data ?
      const data = await fetch(this.url);
      const textData = await data.text();
      this.data = textData.split('\n').slice(1 , 100);
      this.initializeDimensions()
    } catch (err) {
      console.error(err);
    }
  }
  initializeDimensions(){
    const maxVal = Math.max(...this.data)
    const len = this.data.length;
    this.width = len* this.xScale + 20; 
    this.height = maxVal * this.yScale + 20
    this.render()
  }
  render(){
    const graphFragment = document.createDocumentFragment('div')
    // const verticlMarkers = this.createVerticalMarkers()
    // graphFragment.appendChild(verticlMarkers)
    const graphContainer = document.createElement('div')
    graphContainer.className = "histograms-container";
    graphContainer.style.height = `${this.height}px`
    graphContainer.style.width = `${this.width}px`
    this.appendHistograms(graphContainer)
    graphFragment.appendChild(graphContainer)
    this.graph.appendChild(graphFragment);
  }
  appendHistograms(node){
    this.data.forEach((d)=>{
      const histogram = document.createElement('div')
      histogram.className = "histogram"
      histogram.style.height = `${d * this.yScale}px`
      histogram.style.minWidth = `10px`
      node.appendChild(histogram)
    })
  }
  createVerticalMarkers(){
    const yAxis = document.createElement('div')
    yAxis.className="yAxis"
    for(let i of this.data){
      const marker = document.createElement('div')
      marker.className="yAxis-marker"
      marker.innerText = i
      marker.style.height = `${i*this.yScale}px`
      yAxis.appendChild(marker)
    }
    return yAxis;
  }
}

const histograms = new PlotHistograms(
  "#histogram_graph",
  "https://www.random.org/integers/?num=200&min=1&max=10&col=1&base=10&format=plain&rnd=new"
);