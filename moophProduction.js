/*
 * MOOPH = Module for Object Oriented Pseudomultithreaded Hypertext
 * Copyright 2013 Cenek Svoboda, svobo.c@gmail.com
 */
var MOOPH=(function(){if(typeof window.performance==='undefined'){window.performance={}};if(!window.performance.now){window.performance.now=function(){return new Date().getTime();};}var _fs=[];return {createFalseThread:function(){var _ftid=_fs.length;_fs[_ftid]={};_fs[_ftid].p=true;_fs[_ftid].imflt=false;_fs[_ftid].imbca=true;_fs[_ftid].td=1;_fs[_ftid].md=0;_fs[_ftid].lt=0;_fs[_ftid].fT=function(ftid){if(_fs[ftid].p===true){return;}var now=window.performance.now();if(now>_fs[ftid].lt+_fs[ftid].md){var imbc=_fs[ftid].imbca;if(!imbc){_fs[ftid].funct(_fs[ftid].prms);}if(_fs[ftid].imflt){_fs[ftid].lt+=_fs[ftid].md;}else{if(!imbc){_fs[ftid].lt=window.performance.now();}else{_fs[ftid].lt=now;}}if(imbc){_fs[ftid].funct(_fs[ftid].prms);}}var fun=function(){_fs[ftid].fT(ftid);};setTimeout(fun,_fs[ftid].td);};return {setFunction:function(funct){_fs[_ftid].funct=funct;},setParameters:function(prms){_fs[_ftid].prms=prms;},setTimeoutDelay:function(td){_fs[_ftid].td=td;},setMeasuredDelay:function(md){_fs[_ftid].md=md;},setMeasuredFromLastTime:function(imflt){_fs[_ftid].imflt=imflt;},setMeasuredBeforeCall:function(imbca){_fs[_ftid].imbca=imbca;},start:function(){_fs[_ftid].p=false;_fs[_ftid].lt=window.performance.now();_fs[_ftid].fT(_ftid);},pause:function(){_fs[_ftid].p=true;}};}};}());
