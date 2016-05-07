
$(document).ready(function() {
	if(localStorage.getItem("Events") == undefined)
    {
		var events = [];
        localStorage.setItem("Events", JSON.stringify(events));
	}
	//show the calendar
    $('#calendar').fullCalendar({
		header: {
            left: 'next,prev today',
            center: 'title',
            right: 'month,basicWeek,basicDay'
        },
		eventClick: function(calEvent, jsEvent, view)
		{
			var contentBox = "<div id='myModal' class='modal'><div class='modal-content'><span class='close'>×</span><p>" + 
			calEvent.title +"<br/>"+ calEvent.start.startOf('day').fromNow()+ "</p></div></div>";
			$('#details').prepend(contentBox);
			// Get the modal
			var modal = document.getElementById('myModal');

			// Get the <span> element that closes the modal
			var span = document.getElementsByClassName("close")[0];

			// When the user clicks the button, open the modal 

				modal.style.display = "block";


			// When the user clicks on <span> (x), close the modal
			span.onclick = function() {
				modal.style.display = "none";
			}
			
			// When the user clicks anywhere outside of the modal, close it
			window.onclick = function(event) {
				if (event.target == modal) {
					modal.style.display = "none";
				}
			}
		},
		lang: 'he',
		isRTL: true,
        editable: false,
		eventLimit: true,
        fixedWeekCount: false,
		displayEventTime: false,
        //timezone: false,
        events:	getEventsFromStorage()
    });
    $("body").keydown(function(e) {
        if (e.keyCode == 37)
        {
            $('#calendar').fullCalendar('prev');
        }
        else if (e.keyCode == 39)
        {
            $('#calendar').fullCalendar('next');
        }
    });
	
});


//this function insert the tasks and the events (from the local storage) to array show them in the calendar
function getEventsFromStorage()
{
	var arr = [];
	if(localStorage.getItem("list") == undefined || localStorage.getItem("Events") == undefined)
        return arr;
                
    var list = JSON.parse(localStorage.getItem("list"));
    $.each(list, function(i, item) {
		var titleOfItem = item.CourseName + ', תרגיל מספר ' + item.MissionId;
		var task = {title : titleOfItem, start: item.FinalDate};
		arr.push(task);
	});
	
	var events = JSON.parse(localStorage.getItem("Events"));
	$.each(events, function(i, item) {
		var event = {title : item.title, start: item.start, end: item.end, color: item.color};
		arr.push(event);
	});
	return arr;
}

/*
    this function add the event to the local storage, create new event object and add the new event to the calendar.
*/
function addEventCliked()
{	
	var eventName = $('#eventName').val();
	var startDate = $('#startDate').val();
	var endDate = $('#endDate').val();
	if(eventName == '' || startDate == '' || endDate == '')
	{
		alert("You have to insert all the data");
		return;
	}
	var dEnd = new Date($('#endDate').val());
    dEnd.setDate(dEnd.getDate()+1);
	var dStart = new Date($('#startDate').val());
    	
	var newEvent = {title: $('#eventName').val(), start: dStart, end: dEnd , color: $(".jscolor").css("background-color")};
    var eventsArr = [];
    eventsArr.push(newEvent);
    
	$('#calendar').fullCalendar( 'addEventSource', eventsArr );
	var events = JSON.parse(localStorage.getItem("Events"));
	events.push(newEvent);
	localStorage.setItem("Events", JSON.stringify(events));
}

//this function clear all the events from the local storage and refresh the page
function ClearLocalStorage()
{
	if (confirm("האם למחוק את כל האירועים?") == true)
	{
		localStorage.removeItem('Events');
		window.location.reload();
	}
	
}

