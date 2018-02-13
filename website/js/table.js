var taskColumns = []; // Data cells for each row
var rowNumber   = 0;  // Store the row number

var tableTD = 
	{ 
		cellOne:   0, 
		cellTwo:   1, 
		cellThree: 2, 
		cellFour:  3 
	}; // Names of cells being modified

var arcTaskBorder =
	{
		notCreated: 0,
		isCreated: 1	
	}; 

// Creates a task. Each task has a play/pause button, archive button and an instance of the stopwatch
function StartTask(input)
{	
	"use strict";
	
	var minimumCharacters  = 3;  // Character length lower limit
	var maximumCharacters  = 25; // Character length upper limit
	var activeTasksColumns = 4;  // Number of columns in the active task table
	
	// Limitating user input, requiring 3 or more characters 
	if (input.length < minimumCharacters || input.length > maximumCharacters) 
	{
		window.alert("A task name requires "+minimumCharacters+" to "+maximumCharacters+ " characters.");
		return;
	}
	
	var tb        = document.getElementById("activeTasksTable"); // Find table 
	var tbBdy     = document.getElementById("tasksTbody");       // Find tbody 
	
	taskColumns = new Array(input, "", "", ""); // "Task Name" | "Timer" | "Pause/Play" | "Archive"
	document.getElementById("userTaskInput").value = null; // Set input to null when user has submitted the task entry
	
	// Active tasks display
	// Looping through each task and each rows data cells
	var activeTasksTr = document.createElement("tr");
	activeTasksTr.id  = "row" + rowNumber;
		
	for (var activeTasksColumn = 0; activeTasksColumn < activeTasksColumns; activeTasksColumn++)	
	{		
		var activeTasksTd = document.createElement("td");
			
		switch(activeTasksColumn)
		{
			case tableTD.cellOne:
				activeTasksTd.id        = "taskName" + rowNumber;
				activeTasksTd.className = "taskName";
				break;
					
			case tableTD.cellTwo:
				activeTasksTd.width     = 200;
				activeTasksTd.align     = "center";
				activeTasksTd.id 	    = "timer" + rowNumber;
				activeTasksTd.className = "taskTime";
				break;
					
			case tableTD.cellThree:
				activeTasksTd.width = 80;
				activeTasksTd.align = "center";
				activeTasksTd.id    = "playPauseButton" + rowNumber; 
				break;
					
			case tableTD.cellFour:
				activeTasksTd.width     = 90;
				activeTasksTd.align     = "center";
				activeTasksTd.id        = "archiveButton" + rowNumber; 
				activeTasksTd.className = "archiveButton";
				break;
		}
		activeTasksTd.appendChild(document.createTextNode(taskColumns[activeTasksColumn])); // Inputs task name
		activeTasksTr.appendChild(activeTasksTd);
	}
		
	tbBdy.appendChild(activeTasksTr);
		
	document.getElementById("playPauseButton"+rowNumber).innerHTML = "<img id='playPauseImage"+rowNumber+"' src='./assets/Group 5.png'/>";
		
	document.getElementById("archiveButton"+rowNumber).innerHTML   = "<img id='archiveImage"+rowNumber+"'   src='./assets/Group 4.png'/>";
		
	var stopwatch = new Stopwatch(rowNumber);
	timers.push(stopwatch);
	stopwatch.start();
	rowNumber++;
	TableRowSpacing(tb);
}

var archivedRowNumber = 0; // Store current row number for archived tasks

// Creates spacing between a row for a given table
function TableRowSpacing(tableName)
{
	"use strict";
	var rowSpacing    = tableName.insertRow(tableName.rows.length);
	rowSpacing.id     = "trSpacing";
}

// Removes spacing between a row when archieving a task
function RemoveSpacing()
{
	"use strict";
	var spacing   = document.getElementById("trSpacing");
	spacing.parentNode.removeChild(spacing);
}

// Creating border round archived task each time one is archived
function ArchiveTaskBorder()
{
	"use strict";
	document.getElementById("archiveTasksTable").style.borderStyle = "solid";
	document.getElementById("archiveTasksTable").style.borderWidth = 1;
	document.getElementById("archiveTasksTable").style.borderColor = "#E7E7E7";	
}

// Adds taskName and task below the active tasks
function ArchiveTask(taskName, time)
{
	"use strict";
	var archivedTaskColumns = 3;
	var arcBorderCreated    = 0;
	
	if (arcBorderCreated === arcTaskBorder.notCreated)
	{
		ArchiveTaskBorder();
		arcBorderCreated = arcTaskBorder.isCreated;
	}
	
	RemoveSpacing();
	
	var aTbBdy   = document.getElementById("archiveTasksTbody");
	
	// Archived tasks display
	var archiveTasksTr = document.createElement("tr");  
	archiveTasksTr.id  = "row" + archivedRowNumber;
	
	for (var archiveColumn = 0; archiveColumn < archivedTaskColumns; archiveColumn++)	
	{		
		var archiveTasksTd = document.createElement("td");
		archiveTasksTd.id  = "archived";
			
		switch(archiveColumn)
		{
			case tableTD.cellOne:
				archiveTasksTd.innerHTML = "L";
				archiveTasksTd.id        = "tick";
				break;
				
			case tableTD.cellTwo:
				archiveTasksTd.innerHTML = taskName;
				archiveTasksTd.id        = "archivedTaskName" + archivedRowNumber;
				break;
				
			case tableTD.cellThree:
				archiveTasksTd.width     = 160;
				archiveTasksTd.innerHTML = time;
				break;
		}
		archiveTasksTr.appendChild(archiveTasksTd);
	}

	aTbBdy.appendChild(archiveTasksTr);
	archivedRowNumber++;
}