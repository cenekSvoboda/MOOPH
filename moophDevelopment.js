/*
 * MOOPH = Module for Object Oriented Pseudomultithreaded Hypertext
 * Copyright 2013-2015 Cenek Svoboda, svobo.c@gmail.com
 */
var MOOPH=(function MOOPH()
{
	if(typeof window.performance==='undefined'){
		window.performance={};
	}
	if(!window.performance.now){
		window.performance.now=function performanceNow()
		{
			return new Date().getTime();
		};
	}
	var _pseudoThreads=[];
	return {
		createPseudoThread:function createPseudoThread()
		{
			var _ftid=_pseudoThreads.length;
			_pseudoThreads[_ftid]={};
			_pseudoThreads[_ftid].pause=true;
			_pseudoThreads[_ftid].isMeasuredFromLastTime=false;
			_pseudoThreads[_ftid].isMeasuredBeforeCall=true;
			_pseudoThreads[_ftid].timeoutDelay=1;
			_pseudoThreads[_ftid].measuredDelay=0;
			_pseudoThreads[_ftid].lastTime=0;
			_pseudoThreads[_ftid].context=window;
			_pseudoThreads[_ftid].pseudoThread=function pseudoThread(ftid)
			{
				if(_pseudoThreads[ftid].pause===true){
					return;
				}
				var now=window.performance.now();
				if(now>_pseudoThreads[ftid].lastTime+_pseudoThreads[ftid].measuredDelay){
					var imbc=_pseudoThreads[ftid].isMeasuredBeforeCall;
					if(!imbc){
						_pseudoThreads[ftid].funct.call(_pseudoThreads[ftid].context,_pseudoThreads[ftid].parameters);
					}
					if(_pseudoThreads[ftid].isMeasuredFromLastTime){
						_pseudoThreads[ftid].lastTime+=_pseudoThreads[ftid].measuredDelay;
					}else{
						if(!imbc){
							_pseudoThreads[ftid].lastTime=window.performance.now();
						}else{
							_pseudoThreads[ftid].lastTime=now;
						}
					}
					if(imbc){
						_pseudoThreads[ftid].funct.call(_pseudoThreads[ftid].context,_pseudoThreads[ftid].parameters);
					}
				}
				var fun=function fun()
				{
					_pseudoThreads[ftid].pseudoThread(ftid);
				};
				setTimeout(fun,_pseudoThreads[ftid].timeoutDelay);
			};
			return {
				setFunction:function setFunction(funct)
				{
					_pseudoThreads[_ftid].funct=funct;
				},
				setContext:function setContext(cont)
				{
					_pseudoThreads[_ftid].context=cont;
				},
				setParameters:function setParameters(parameters)
				{
					_pseudoThreads[_ftid].parameters=parameters;
				},
				setTimeoutDelay:function setTimeoutDelay(timeoutDelay)
				{
					_pseudoThreads[_ftid].timeoutDelay=timeoutDelay;
				},
				setMeasuredDelay:function setMeasuredDelay(measuredDelay)
				{
					_pseudoThreads[_ftid].measuredDelay=measuredDelay;
				},
				setMeasuredFromLastTime:function setMeasuredFromLastTime(isMeasuredFromLastTime)
				{
					_pseudoThreads[_ftid].isMeasuredFromLastTime=isMeasuredFromLastTime;
				},
				setMeasuredBeforeCall:function setMeasuredBeforeCall(isMeasuredBeforeCall)
				{
					_pseudoThreads[_ftid].isMeasuredBeforeCall=isMeasuredBeforeCall;
				},
				start:function start()
				{
					_pseudoThreads[_ftid].pause=false;
					_pseudoThreads[_ftid].lastTime=window.performance.now();
					_pseudoThreads[_ftid].pseudoThread(_ftid);
				},
				pause:function pause()
				{
					_pseudoThreads[_ftid].pause=true;
				}
			};
		}
	};
}());
