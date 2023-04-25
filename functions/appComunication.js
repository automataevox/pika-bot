const app = require('express');

var diff;
app.use((req, res, next) => {
    const startTime = Date.now();
  
    // Set a listener for the 'finish' event
    res.on('finish', () => {
      const endTime = Date.now();
      diff = endTime - startTime;
      console.log(`Response time: ${diff} ms`);
    });
});

module.exports = diff;