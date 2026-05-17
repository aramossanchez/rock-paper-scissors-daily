export const playCountdownSound = () => {
  const audio = new Audio(`${import.meta.env.BASE_URL}sounds/count.mp3`);
  audio.play();
};

export const playEndgameSound = () => {
  const audio = new Audio(`${import.meta.env.BASE_URL}sounds/endgame.mp3`);
  audio.play();
};

export const playHitSound = () => {
  const audio = new Audio(`${import.meta.env.BASE_URL}sounds/hit.mp3`);
  audio.play();
};
