async function generatePoster(userName, userPhoto, score) {
  const canvas = document.getElementById("posterCanvas");
  const ctx = canvas.getContext("2d");

  const bg = await loadImage("wanted_template.png");
  ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);

  let avatarSrc = userPhoto || "https://i.ibb.co/7n5T8Ns/avatar-placeholder.png";
  const avatar = await loadImage(avatarSrc);
  ctx.drawImage(avatar, 150, 200, 300, 300);

  ctx.font = "bold 40px serif";
  ctx.fillStyle = "black";
  ctx.fillText(userName, 180, 550);

  const reward = score * 10000;
  ctx.font = "bold 38px serif";
  ctx.fillText(reward.toLocaleString() + " Berries", 150, 650);

  canvas.style.display = "block";
  const btn = document.getElementById("posterBtn");
  btn.style.display = "inline-block";
  btn.innerText = "Скачать постер";
  btn.onclick = () => {
    const link = document.createElement("a");
    link.download = "wanted.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };
}

function loadImage(src) {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.src = src;
  });
}
