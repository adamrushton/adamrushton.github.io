var timers = [];

function Stopwatch(elem)
{
	"use strict";
	var time = 0;
	var offset;
	var interval;
	var isRunning;
	
	function update() 
	{
		var dt = delta();
		
		if (isRunning) 
		{
			time += dt;
			document.getElementById("timer" + elem).innerHTML = timeFormatter(time);
		}
	}
	
	function delta() 
	{  
    	var now        = Date.now();
    	var timePassed = now - offset;
    	offset         = now;

    	return timePassed;
	}
	
	function timeFormatter(time) 
	{
		time = new Date(time);

		var minutes = time.getMinutes().toString();
		var seconds = time.getSeconds().toString();

		return minutes + " min " + seconds + " sec";
	}
	
	this.start = function() 
	{
		interval = setInterval(update.bind(this), 10);
    	offset = Date.now();
		isRunning = true;
		
		document.getElementById("archiveButton"+ elem).addEventListener("click", function()
		{
			var taskName = document.getElementById("taskName" +elem).innerHTML;
			var time     = document.getElementById("timer"    +elem).innerHTML;
			
			ArchiveTask(taskName, time);
			isRunning = false;
			var row   = document.getElementById("row"+elem);
			row.parentNode.removeChild(row);
		});
		
		document.getElementById("playPauseButton" + elem).addEventListener("click", function() 
		{
			isRunning = !isRunning;
			
			if(isRunning) 
			{
				document.getElementById("playPauseButton" + elem).innerHTML = "<img class='tbl-btn' src='./assets/Group 5.png'/>";
			}
			else
			{
				document.getElementById("playPauseButton" + elem).innerHTML = "<img class='tbl-btn' src='./assets/Group 3.png'/>";
			}
		});
	};

    this.stop = function() 
	{
    	clearInterval(interval);
    	interval       = null;
    	this.isRunning = false;
    };
	
	this.isRunning = false;
}