export const px2Unit = (px) => {
  const unit = (px / 375) * 100;
  return `${unit}rem`;
};
