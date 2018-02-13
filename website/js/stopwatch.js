var timers = [];
// Timer for tasks

function Stopwatch(elem)
{
	"use strict";
	var time = 0;
	var offset;
	var interval;
	var isRunning;
	
	// Store delta time (time passed), updating time with dt when an instance of this class is running
	function update() 
	{
		var dt = delta();
		
		if (isRunning) 
		{
			time += dt;
			document.getElementById("timer" + elem).innerHTML = timeFormatter(time);
		}
	}
	
	// Calculating time
	function delta() 
	{  
    	var now        = Date.now();
    	var timePassed = now - offset;
    	offset         = now;

    	return timePassed;
	}
	
	// Format to print the stopwatch
	function timeFormatter(time) 
	{
		time = new Date(time);

		var minutes = time.getMinutes().toString();
		var seconds = time.getSeconds().toString();
		
		if (minutes >= 1)
		{
			return minutes + " min " + seconds + " sec";
		}
		else 
		{
			return seconds + " sec";	
		}
	}
	
	// Starts the stopwatch
	// Detecting user clicks onto archive button and playpause button for each task
	// Archive button hit -> gets task name and time, calls archivetask passing them as parameters
	// Archive button hit -> stops the timer and removes the active task
	// Play/pause button hit -> toggle isRunning. 
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