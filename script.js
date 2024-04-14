const html = document.documentElement;
const canvas = document.getElementById("hero-lightpass");
const context = canvas.getContext("2d");

const frameCount = 500;
const currentFrame = (index) =>
`gif/frame_${index.toString().padStart(5, "0")}.gif`;

let imgIndex = 1; // Índice da imagem atual
let imgLoaded = false; // Flag para controlar se a imagem atual foi carregada

const img = new Image();

const loadImage = (index) => {
  img.src = currentFrame(index);
  img.onload = () => {
    imgLoaded = true;
    drawImage();
  };
};

const drawImage = () => {
  if (!imgLoaded) return; // Se a imagem atual não estiver carregada, saia da função

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

const updateImage = (index) => {
  if (!imgLoaded || index === imgIndex) return; // Se a imagem atual não estiver carregada ou for a mesma imagem, não faça nada
  imgIndex = index;
  loadImage(imgIndex);
};

window.addEventListener("scroll", () => {
  const scrollTop = html.scrollTop;
  const maxScrollTop = html.scrollHeight - window.innerHeight;
  const scrollFraction = scrollTop / maxScrollTop;
  const frameIndex = Math.min(
    frameCount - 1,
    Math.ceil(scrollFraction * frameCount)
  );

  updateImage(frameIndex + 1);
});

// Inicializa carregando a primeira imagem
loadImage(imgIndex);