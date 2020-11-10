export const capitalize = (text) => text.split(' ')
  .map((word) => word[0].toUpperCase() + word.substring(1))
  .join(" ");