export default () => {
   let scrollStep = () => {
      if (window.pageYOffset === 0) {
         clearInterval(intervalId);
      } else if ( window.pageYOffset < 1000) {
         window.scroll(0, window.pageYOffset - 40);
      } else {
         window.scroll(0, window.pageYOffset - 500);
      }
   }
   let intervalId = setInterval(scrollStep, 15);
}

