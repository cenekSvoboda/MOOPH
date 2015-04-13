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
			var _ptid=_pseudoThreads.length;
			_pseudoThreads[_ptid]={};
			_pseudoThreads[_ptid].pause=true;
			_pseudoThreads[_ptid].isMeasuredFromLastTime=false;
			_pseudoThreads[_ptid].isMeasuredBeforeCall=true;
			_pseudoThreads[_ptid].timeoutDelay=1;
			_pseudoThreads[_ptid].measuredDelay=0;
			_pseudoThreads[_ptid].lastTime=0;
			_pseudoThreads[_ptid].context=window;
			_pseudoThreads[_ptid].pseudoThread=function pseudoThread(ptid)
			{
				if(_pseudoThreads[ptid].pause===true){
					return;
				}
				var now=window.performance.now();
				if(now>_pseudoThreads[ptid].lastTime+_pseudoThreads[ptid].measuredDelay){
					var imbc=_pseudoThreads[ptid].isMeasuredBeforeCall;
					if(!imbc){
						_pseudoThreads[ptid].funct.call(_pseudoThreads[ptid].context,_pseudoThreads[ptid].parameters);
					}
					if(_pseudoThreads[ptid].isMeasuredFromLastTime){
						_pseudoThreads[ptid].lastTime+=_pseudoThreads[ptid].measuredDelay;
					}else{
						if(!imbc){
							_pseudoThreads[ptid].lastTime=window.performance.now();
						}else{
							_pseudoThreads[ptid].lastTime=now;
						}
					}
					if(imbc){
						_pseudoThreads[ptid].funct.call(_pseudoThreads[ptid].context,_pseudoThreads[ptid].parameters);
					}
				}
				var fun=function fun()
				{
					_pseudoThreads[ptid].pseudoThread(ptid);
				};
				setTimeout(fun,_pseudoThreads[ptid].timeoutDelay);
			};
			return {
				setFunction:function setFunction(funct)
				{
					_pseudoThreads[_ptid].funct=funct;
				},
				setContext:function setContext(cont)
				{
					_pseudoThreads[_ptid].context=cont;
				},
				setParameters:function setParameters(parameters)
				{
					_pseudoThreads[_ptid].parameters=parameters;
				},
				setTimeoutDelay:function setTimeoutDelay(timeoutDelay)
				{
					_pseudoThreads[_ptid].timeoutDelay=timeoutDelay;
				},
				setMeasuredDelay:function setMeasuredDelay(measuredDelay)
				{
					_pseudoThreads[_ptid].measuredDelay=measuredDelay;
				},
				setMeasuredFromLastTime:function setMeasuredFromLastTime(isMeasuredFromLastTime)
				{
					_pseudoThreads[_ptid].isMeasuredFromLastTime=isMeasuredFromLastTime;
				},
				setMeasuredBeforeCall:function setMeasuredBeforeCall(isMeasuredBeforeCall)
				{
					_pseudoThreads[_ptid].isMeasuredBeforeCall=isMeasuredBeforeCall;
				},
				start:function start()
				{
					_pseudoThreads[_ptid].pause=false;
					_pseudoThreads[_ptid].lastTime=window.performance.now();
					_pseudoThreads[_ptid].pseudoThread(_ptid);
				},
				pause:function pause()
				{
					_pseudoThreads[_ptid].pause=true;
				}
			};
		}
	};
}());
