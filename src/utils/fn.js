export const getArrSlider = (start, end, number) => {
  const limit = start > end ? number : end;
  let output = [];
  for (let i = start; i <= limit; i++) {
    output.push(i);
  }
  if (start > end) {
    for (let i = 0; i <= end; i++) {
      output.push(i);
    }
  }
  return output;
};

export const handleNumber = (number) => {
  if (number > Math.pow(10, 6)) {
    return (number / Math.pow(10, 6)).toFixed(1) + "M";
  } else if (number > Math.pow(10, 3)) {
    return (number / Math.pow(10, 3)).toFixed(1) + "K";
  }
  return number;
};
