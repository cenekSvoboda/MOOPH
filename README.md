MOOPH
=====

MOOPH stands for Module for Object Oriented Pseudomultithreaded Hypertext (module as in "module pattern", not as in ECMAScript 6 module). 

MOOPH module is a workaround for absence of crossplatform crossbrowser multithreading (parallel processing) 
with access to DOM in JavaScript. 

Unlike web workers, the solution can access shared resources easily. 

Unlike requestAnimationFrame, it is better for processes, that are not related to animation (pseudothreads running in background). 

Unlike setInterval solutions, if set to max speed, MOOPH by default doesn't queue time consuming function calls.


I am publishing about my progress in this area on http://pseudomultithreading.webzdarma.cz now. You may find more complex examples over there.

http://mooph.eu

&copy; Cenek Svoboda, svobo.c@gmail.com


https://www.hackthissite.org/forums/viewtopic.php?f=38&t=10670
