const html = document.documentElement;
const canvas = document.getElementById("hero-lightpass");
const context = canvas.getContext("2d");

const frameCount = 1049;
const currentFrame = (index) => `webp/${index.toString().padStart(5, "0")}.webp`;
//  `gif/animacao base_${index.toString().padStart(5, "0")}.jpg`;
//animacao-base_00000.wbm


const preloadImages = () => {
  for (let i = 1; i < frameCount; i++) {
    const img = new Image();
    img.src = currentFrame(i);
  }
};

const img = new Image();
img.src = currentFrame(1);

const drawImage = () => {
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  const aspectRatio = img.width / img.height;
  const canvasAspectRatio = windowWidth / windowHeight;
  let imgWidth, imgHeight, offsetX, offsetY;

  if (canvasAspectRatio > aspectRatio) {
    // Se a proporção da tela for maior que a proporção da imagem
    imgWidth = windowWidth;
    imgHeight = imgWidth / aspectRatio;
    offsetX = 0;
    offsetY = (windowHeight - imgHeight) / 2;
  } else {
    // Se a proporção da tela for menor que a proporção da imagem
    imgHeight = windowHeight;
    imgWidth = imgHeight * aspectRatio;
    offsetY = 0;
    offsetX = (windowWidth - imgWidth) / 2;
  }

  // Verifica se a tela é ultralarga e ajusta a altura da imagem, se necessário
  if (canvasAspectRatio > 2) {
    imgHeight = windowHeight;
    imgWidth = imgHeight * aspectRatio;
    offsetX = (windowWidth - imgWidth) / 2;
    offsetY = 0;
  }

  canvas.width = windowWidth;
  canvas.height = windowHeight;
  context.drawImage(img, offsetX, offsetY, imgWidth, imgHeight);
};


img.onload = drawImage;

window.addEventListener("resize", drawImage);

const updateImage = (index) => {
  img.src = currentFrame(index);
  //drawImage();
};

window.addEventListener("scroll", () => {
  const scrollTop = html.scrollTop;
  const maxScrollTop = html.scrollHeight - window.innerHeight;
  const scrollFraction = scrollTop / maxScrollTop;
  const frameIndex = Math.min(
    frameCount - 1,
    Math.ceil(scrollFraction * frameCount)
  );

  requestAnimationFrame(() => updateImage(frameIndex + 1));
});

preloadImages();
