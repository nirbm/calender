$(document).ready(function () {
	var date = new Date();
	var d = date.getDate();
	var m = date.getMonth();
	var y = date.getFullYear();
	var dateClick;
	$('#btnChooseColor').click(endDialig);

	var calendar = $('#calendar').fullCalendar({
		header: {
			left: 'prev,next today',
			center: 'title',
			right: 'month, agendaWeek, year'
		},
		minTime: "06:00:00",
		maxTime: "22:00:00",
		hiddenDays: [6],
		firstHour: 8,
		allDaySlot: false,
		slotMinutes: 60,
		height: 550,
		axisFormat: "HH:mm",
		defaultView: "agendaWeek",
		weekends: true,
		selectable: true,
		selectHelper: true,
		weekNumbers: true,
		dayClick: function(date, allDay, jsEvent, view)
		{
			$("#dialog").dialog("open");
			dateClick = date;
		},
		select: function(start, end, allDay) {
			//var title = prompt('Event Title:');
			if (title) {
				calendar.fullCalendar('renderEvent',
						{
							title: title,
							start: start,
							end: end,
							allDay: allDay
						},
						true // make the event "stick"
				);
			}
			calendar.fullCalendar('unselect');
		},
		editable: true,
		eventSources: [
			// your event source
			{
				events: [ // put the array in the `events` property

				],
				color: '#3300FF',
				textColor: 'white'
			},
			{
				events: [

				],
				color: '#6699FF',
				textColor: 'black'
			}
		]
	});

	var dialogst = $("#dialog").dialog({
		autoOpen: false,
		height: 300,
		width: 350,
		modal: true
	});

	function endDialig(){

		var text = $("#endhour").val();
		var houre = parseInt(text);
		var day = dateClick.getDate();
		var month = dateClick.getMonth();
		var year = dateClick.getFullYear();
		text = $("#event_input").val();
		var endDate = new Date(year, month, day, houre, 0);

		if(dateClick.getHours() >= endDate.getHours())
		{	alert("uston we have a problem"); return;}

		calendar.fullCalendar('renderEvent',
				{
					title: text,
					start: dateClick,
					end: endDate,
					allDay: false
				},
				true // make the event "stick"
		);

		$("#dialog").dialog("close");
	}

});