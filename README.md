MOOPH
=====

MOOPH stands for Module for Object Oriented Pseudomultithreaded Hypertext (module as in "module pattern", not as in ECMAScript 6 module). 

Pseudomultithreading is a workaround for absence of crossplatform crossbrowser multithreading (parallel processing) 
with access to DOM in JavaScript. Unlike web workers, the solution can access shared resources easily. Unlike requestAnimationFrame, it is usable for processes, that are not related to animation (pseudothreads running in background).

I am publishing about my progress in this area on http://pseudomultithreading.webzdarma.cz now. You may find more complex examples over there. Something is also written on http://javascriptmultithreading.eu...

Cenek Svoboda, svobo.c@gmail.com
