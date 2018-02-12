var taskEntries = []; // Data cells for each row
var rowNumber = 0;    // Store the row number

var tableTD = 
	{ cellOne:   0, 
	  cellTwo:   1, 
	  cellThree: 2, 
	  cellFour:  3 }; // Names of cells being modified

// Creates a task. Each task has a play/pause button, archive button and an instance of the stopwatch
function StartTask(input)
{	
	"use strict";

	// Limitating user input, requiring 3 or more characters 
	if (input.length < 3) 
	{
		window.alert("A task name requires 3 or more characters.");
		return;
	}
	
	var tb        = document.getElementById("activeTasksTable");
	var tbBdy     = document.getElementById("tasksTbody");
	
	tb.appendChild(tbBdy);

	taskEntries[0] = new Array(input, "", "", ""); // "Task Name" | "Timer" | "Pause/Play" | "Archive"
	
	document.getElementById("userTaskInput").value = null; // Set input to null when user has submitted the task entry
	
	// Active tasks display
	// Looping through each task and each rows data cells
	for (var activeTasksA = 0; activeTasksA < taskEntries.length; activeTasksA++)
	{
		var activeTasksTr = document.createElement("tr");
		activeTasksTr.id = "row" + rowNumber;
		
		for (var activeTasksB = 0; activeTasksB < taskEntries[activeTasksA].length; activeTasksB++)	
		{		
			var activeTasksTd = document.createElement("td");
			
			switch(activeTasksB)
			{
				case tableTD.cellOne:
					activeTasksTd.id = "taskName" + rowNumber;
					break;
				case tableTD.cellTwo:
					activeTasksTd.width = 150;
					activeTasksTd.align = "center";
					activeTasksTd.id 	= "timer" + rowNumber;
					break;
				case tableTD.cellThree:
					activeTasksTd.width = 111;
					activeTasksTd.align = "center";
					activeTasksTd.id    = "playPauseButton" + rowNumber; 
					break;
				case tableTD.cellFour:
					activeTasksTd.width  = 56;
					activeTasksTd.align  = "center";
					activeTasksTd.id     = "archiveButton" + rowNumber; 
					break;
			}
			
			activeTasksTd.appendChild(document.createTextNode(taskEntries[activeTasksA][activeTasksB]));
			activeTasksTr.appendChild(activeTasksTd);
		}
		
		tbBdy.appendChild(activeTasksTr);

		document.getElementById("playPauseButton"+rowNumber).innerHTML = "<img src='./assets/Group 5.png'/>";
		document.getElementById("archiveButton"+rowNumber).innerHTML = "<img src='./assets/Group 4.png'/>";
		
		var stopwatch = new Stopwatch(rowNumber);
		timers.push(stopwatch);
		stopwatch.start();
		rowNumber++;
	}	
}

var archivedRowNumber = 0;

// Adds taskName and task below the active tasks
function ArchiveTask(taskName, time)
{
	"use strict";
	var aTb       = document.getElementById("archiveTasksTable");
	var aTbBdy    = document.getElementById("archiveTasksTbody");
	aTb.appendChild(aTbBdy);
	// Archived tasks display
	for (var archiveTasksA = 0; archiveTasksA < taskEntries.length; archiveTasksA++)
	{
		var archiveTasksTr = document.createElement("tr");
		
		archiveTasksTr.id = "row" + archivedRowNumber;
		for (var archiveTasksB = 0; archiveTasksB < 2; archiveTasksB++)	
		{		
			var archiveTasksTd = document.createElement("td");
			archiveTasksTd.id = "archived";
			
			switch(archiveTasksB)
			{
				case tableTD.cellOne:
					archiveTasksTd.innerHTML = taskName;
					archiveTasksTd.width     = 650;
					archiveTasksTd.id        = "archivedTaskName" + archivedRowNumber;
					break;
				case tableTD.cellTwo:
					archiveTasksTd.innerHTML = time;
					break;
			}
			
			archiveTasksTr.appendChild(archiveTasksTd);
		}
		
		aTbBdy.appendChild(archiveTasksTr);
		archivedRowNumber++;
	}
}