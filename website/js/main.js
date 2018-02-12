window.onload = function() 
{
	"use strict";
	if(localStorage.getItem("firstTaskName") !== undefined) 
	{
		StartTask(localStorage.getItem("firstTaskName"));
	}
};

document.getElementById("create").addEventListener("click", function() 
{
	"use strict";
	StartTask(document.getElementById("userTaskInput").value);
});