export const isDestopViewport = (page) => {
  const size = page.viewportSize();
  return size.width >= 600;
};
