
  
export const moviesImages = {
    0: require('./images/1.jpeg'),
    1: require('./images/2.jpeg'),
    2: require('./images/3.jpeg'),
    3: require('./images/4.jpeg'),
    4: require('./images/5.jpeg'),
    5: require('./images/6.jpeg'),
    6: require('./images/7.jpeg'),
    7: require('./images/8.jpeg'),
    8: require('./images/9.jpeg'),
    9: require('./images/10.jpeg'),
    10:require('./images/11.jpeg'),
    11: require('./images/12.jpeg'),
    12: require('./images/13.jpeg'),
    13: require('./images/14.jpeg'),
    14: require('./images/15.jpeg'),
    15: require('./images/16.jpeg'),
};
  
  export const randomImage = () => {
    const id = Math.floor(Math.random() * 15);
    return moviesImages[id];
  };
  