const { createCanvas } = require("canvas");

const genAlternate = str => {
  return [...str]
    .map((char, i) => char[`to${i % 2 ? "Upper" : "Lower"}Case`]())
    .join("");
};

const genRandomString = () => {
  return genAlternate(
    Math.random()
      .toString(36)
      .substring(2, 8)
  );
};

const fontBase = 200;
const fontSize = 35;

const font = width => {
  const ratio = fontSize / fontBase;
  const size = ratio * width;
  return `${size}px serif`;
};

// Get a float between min and max
const arbitraryRandom = (min, max) => Math.random() * (max - min) + min;

// Get a rotation between -degrees and degrees converted to radians
const randomRotation = (degrees = 15) =>
  (arbitraryRandom(-degrees, degrees) * Math.PI) / 180;

const configureText = (ctx, width, height) => {
  ctx.font = font(width);
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  const text = genRandomString();
  ctx.fillText(text, width / 2, height / 2);
  return text;
};

// Get a PNG dataURL of a captcha image
const generate = (width, height) => {
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");
  ctx.rotate(randomRotation());
  const text = configureText(ctx, width, height);
  console.log(text);
  return {
    image: canvas.toDataURL(),
    text: text
  };
};

module.exports = generate;
