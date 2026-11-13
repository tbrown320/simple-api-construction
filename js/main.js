//get variables set up
import { google_API_key } from "./config.js"
import { Cal_ID } from "./config.js"

let appt_list = document.getElementById('appointment_slots')

function findAppointments() {
    fetch(`https://www.googleapis.com/calendar/v3/calendars/${Cal_ID}/events?key=${google_API_key}`)
        .then(res => res.json())
        .then(schedule_data => {
            console.log(schedule_data.items)
            for (let i = 0; i < schedule_data.items.length; i++) {

                let start_time = new Date(schedule_data.items[i].start.dateTime)
                let end_time = new Date(schedule_data.items[i].end.dateTime)
                let appointment_date = new Date(schedule_data.items[i].start.dateTime).toDateString()
                let appt_start_time = start_time.toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true
                })

                let appt_end_time = end_time.toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true
                })
                console.log(appointment_date)
                console.log(appt_start_time);
                console.log(appt_end_time);

                let li = document.createElement('li')
                //insert the appointment times in a new div on the html page
                let timestamp = `Appointment Date: ${appointment_date}, Start Time: ${appt_start_time}, End Time: ${appt_end_time}`
                li.append(timestamp)
                appt_list.appendChild(li)


            }
        })
}

findAppointments()
