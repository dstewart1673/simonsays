function rando() {
  const val = Math.random();

  if (val < .25) {
    return 0;
  } else if (val < .5) {
    return 1;
  } else if (val < .75) {
    return 2;
  } else {
    return 3;
  }
}

export { rando };
