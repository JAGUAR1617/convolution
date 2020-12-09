let circ;
let filtered;
let dim = 64;

function preload() {
  circ = loadImage('circle0001.png');
}

let filter = [
  [-1, 1, 0],
  [-1, 0, 1],
  [-1, 1, 0]
];



function setup() {
  // generating random filter 3 x 3 matrix
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      filter[i][j] = random(-1, 1);
    }
  }

  createCanvas(dim * 10 * 2, dim * 10);
  filtered = createImage(dim, dim);
  background(255);
  noSmooth();
  image(circ, 0, 0, dim * 10, dim * 10);
  circ.loadPixels();
  filtered.loadPixels();
  for (let x = 1; x < dim - 1; x++) {
    for (let y = 1; y < dim - 1; y++) {
      let rgb = convolution(circ, x, y, filter);
      let pix = index(x, y);
      filtered.pixels[pix + 0] = rgb.r;
      filtered.pixels[pix + 1] = rgb.g;
      filtered.pixels[pix + 2] = rgb.b;
      filtered.pixels[pix + 3] = 255;
    }
  }
  filtered.updatePixels();
  image(filtered, dim * 10, 0, dim * 10, dim * 10)
}

function index(x, y) {
  return (x + y * circ.width) * 4;
}



function convolution(img, x, y, filter) {
  // let pix = index(x, y);
  let sumR = 0;
  let sumG = 0;
  let sumB = 0;

  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      // let px = x+i;
      // let py = y+j;
      let pix = index(x + i, y + j);
      let factor = filter[j + 1][i + 1];
      sumR += img.pixels[pix + 0] * factor;
      sumG += img.pixels[pix + 1] * factor;
      sumB += img.pixels[pix + 2] * factor;
    }
  }

  return {
    r: sumR,
    g: sumG,
    b: sumB
  };
}


function draw() {
}
