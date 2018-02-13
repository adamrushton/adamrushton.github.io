// Get first task from index.html user input
window.onload = function() 
{
	"use strict";
	if(localStorage.getItem("firstTaskName") !== undefined) 
	{
		StartTask(localStorage.getItem("firstTaskName"));
	}
};

// Creates user inputs task
document.getElementById("create").addEventListener("click", function() 
{
	"use strict";
	StartTask(document.getElementById("userTaskInput").value);
	localStorage.removeItem("firstTaskName");
});