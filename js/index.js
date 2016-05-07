var date = new Date();
var d = date.getDate();
var m = date.getMonth();
var y = date.getFullYear();

var calendar = $('#calendar').fullCalendar({
			header: {
				left: 'prev,next today',
				center: 'title',
              right: ''
			},
			hiddenDays: [6],
          firstHour: 8,
          allDaySlot: false,
          slotMinutes: 60,
          height: 400,
          axisFormat: "HH:mm",
          defaultView: "agendaWeek",
          weekends: true,
			selectable: true,
			selectHelper: true,
          weekNumbers: true,
			select: function(start, end, allDay) {
				var title = prompt('Event Title:');
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
                     {
					      title: 'Dansk',
					      start: new Date(y, m, d, 10, 0),
					      end: new Date(y, m, 10, 45),
                       allDay: false
				      },
                  {
					      title: 'Tysk',
					      start: new Date(y, m, d, 10, 30),
					      end: new Date(y, m, d, 11, 15),
                    allDay: false
				     },
                  {
					      title: 'Matematik',
					      start: new Date(y, m, d, 12),
					      end: new Date(y, m, d, 12, 45),
                    allDay: false
				     }
                ],
                color: '#3300FF',    
                textColor: 'white'
            },
            {
                events: [ 
                     {
					      title: 'Spansk',
					      start: new Date(y, m, d, 8, 0),
					      end: new Date(y, m, d, 8, 45),
                       allDay: false
				      },
                  {
					      title: 'Biologi',
					      start: new Date(y, m, d, 9),
					      end: new Date(y, m, d, 9, 45),
                    allDay: false
				     },
                  {
					      title: 'Idræt',
					      start: new Date(y, m, d, 13),
					      end: new Date(y, m, d, 13, 45),
                    allDay: false
				     }
                ],
                color: '#6699FF',    
                textColor: 'black'
            }
         ]
		});