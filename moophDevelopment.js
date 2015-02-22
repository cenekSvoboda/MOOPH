/*
 * MOOPH = Module for Object Oriented Pseudomultithreaded Hypertext
 * Copyright 2013-2014 Cenek Svoboda, svobo.c@gmail.com
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
	var _falseThreads=[];
	return {
		createFalseThread:function createPseudoThread()
		{
			var _ftid=_falseThreads.length;
			_falseThreads[_ftid]={};
			_falseThreads[_ftid].pause=true;
			_falseThreads[_ftid].isMeasuredFromLastTime=false;
			_falseThreads[_ftid].isMeasuredBeforeCall=true;
			_falseThreads[_ftid].timeoutDelay=1;
			_falseThreads[_ftid].measuredDelay=0;
			_falseThreads[_ftid].lastTime=0;
			_falseThreads[_ftid].context=window;
			_falseThreads[_ftid].falseThread=function falseThread(ftid)
			{
				if(_falseThreads[ftid].pause===true){
					return;
				}
				var now=window.performance.now();
				if(now>_falseThreads[ftid].lastTime+_falseThreads[ftid].measuredDelay){
					var imbc=_falseThreads[ftid].isMeasuredBeforeCall;
					if(!imbc){
						_falseThreads[ftid].funct.call(_falseThreads[ftid].context,_falseThreads[ftid].parameters);
					}
					if(_falseThreads[ftid].isMeasuredFromLastTime){
						_falseThreads[ftid].lastTime+=_falseThreads[ftid].measuredDelay;
					}else{
						if(!imbc){
							_falseThreads[ftid].lastTime=window.performance.now();
						}else{
							_falseThreads[ftid].lastTime=now;
						}
					}
					if(imbc){
						_falseThreads[ftid].funct.call(_falseThreads[ftid].context,_falseThreads[ftid].parameters);
					}
				}
				var fun=function fun()
				{
					_falseThreads[ftid].falseThread(ftid);
				};
				setTimeout(fun,_falseThreads[ftid].timeoutDelay);
			};
			return {
				setFunction:function setFunction(funct)
				{
					_falseThreads[_ftid].funct=funct;
				},
				setContext:function setContext(cont)
				{
					_falseThreads[_ftid].context=cont;
				},
				setParameters:function setParameters(parameters)
				{
					_falseThreads[_ftid].parameters=parameters;
				},
				setTimeoutDelay:function setTimeoutDelay(timeoutDelay)
				{
					_falseThreads[_ftid].timeoutDelay=timeoutDelay;
				},
				setMeasuredDelay:function setMeasuredDelay(measuredDelay)
				{
					_falseThreads[_ftid].measuredDelay=measuredDelay;
				},
				setMeasuredFromLastTime:function setMeasuredFromLastTime(isMeasuredFromLastTime)
				{
					_falseThreads[_ftid].isMeasuredFromLastTime=isMeasuredFromLastTime;
				},
				setMeasuredBeforeCall:function setMeasuredBeforeCall(isMeasuredBeforeCall)
				{
					_falseThreads[_ftid].isMeasuredBeforeCall=isMeasuredBeforeCall;
				},
				start:function start()
				{
					_falseThreads[_ftid].pause=false;
					_falseThreads[_ftid].lastTime=window.performance.now();
					_falseThreads[_ftid].falseThread(_ftid);
				},
				pause:function pause()
				{
					_falseThreads[_ftid].pause=true;
				}
			};
		}
	};
}());
