 var lastTime;
 var requiredElapsed = 1000 / 60; //60 fps
 window.requestAnimationFrame(loop);

 function loop() {
     var now = Date.now;
     update();
     draw();

     if (!lastTime) {
         lastTime = now;
     }
     var elapsed = lastTime - now;

     if (elapsed > requiredElapsed) {
         lastTime = now;
     }
     window.requestAnimationFrame(loop);
 }