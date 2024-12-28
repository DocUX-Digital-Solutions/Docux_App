import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [jsonData, setJsonData] = useState([
        {
          "appointmentId": 1343,
          "reason": "Right achilles tear",
          "patientName": "Kori Carter1",
          "patientType": "new",
          "scheduledAt": "2024-12-15T14:00:00.000Z",
          "appointmentState": {
            "appointmentStateName": "In Progress"
          }
        },
        {
          "appointmentId": 1335,
          "reason": "Left ACL sprain",
          "patientName": "Lionel Messi",
          "patientType": "existing",
          "scheduledAt": "2024-12-15T18:00:00.000Z",
          "appointmentState": {
            "appointmentStateName": "Scheduled"
          }
        },
        {
          "appointmentId": 1336,
          "reason": "Dislocated shoulder",
          "patientName": "Samantha Smith",
          "patientType": "new",
          "scheduledAt": "2024-12-13T19:00:00.000Z",
          "appointmentState": {
            "appointmentStateName": "Scheduled"
          }
        },
        {
          "appointmentId": 1337,
          "reason": "Post procedure follow-up",
          "patientName": "Peyton Manning",
          "patientType": "new",
          "scheduledAt": "2024-12-13T19:30:00.000Z",
          "appointmentState": {
            "appointmentStateName": "Scheduled"
          }
        },
        {
          "appointmentId": 1338,
          "reason": "Right meniscus tear",
          "patientName": "Tim Beaver",
          "patientType": "existing",
          "scheduledAt": "2024-12-13T20:00:00.000Z",
          "appointmentState": {
            "appointmentStateName": "Scheduled"
          }
        },
        {
          "appointmentId": 1339,
          "reason": "Elbow injury",
          "patientName": "Clayton Kershaw",
          "patientType": "new",
          "scheduledAt": "2024-12-14T14:00:00.000Z",
          "appointmentState": {
            "appointmentStateName": "Scheduled"
          }
        },
        {
          "appointmentId": 1340,
          "reason": "Left hip pain",
          "patientName": "Anthony Davis",
          "patientType": "new",
          "scheduledAt": "2024-12-14T15:00:00.000Z",
          "appointmentState": {
            "appointmentStateName": "Scheduled"
          }
        },
        {
          "appointmentId": 1341,
          "reason": "Left wrist dislocation",
          "patientName": "Megan Rapinoe",
          "patientType": "new",
          "scheduledAt": "2024-12-14T16:00:00.000Z",
          "appointmentState": {
            "appointmentStateName": "Scheduled"
          }
        },
        {
          "appointmentId": 1342,
          "reason": "Right shoulder pain",
          "patientName": "Taylor Mays",
          "patientType": "existing",
          "scheduledAt": "2024-12-14T20:00:00.000Z",
          "appointmentState": {
            "appointmentStateName": "Scheduled"
          }
        }
      ]);
    const [organizedAppointments, setOrganizedAppointments] = useState([]);

    const organizeAppointmentsByHour = (appointments) => {
        const organized = [];

        Object.keys(appointments).forEach((key) => {
            const appointment = appointments[key];
            const date = new Date(appointment.timeAppointment);
            const hours = date.getHours();
            const minutes = date.getMinutes();
            const ampm = hours >= 12 ? 'PM' : 'AM';
            const formattedTime = `${hours % 12 || 12}:${minutes.toString().padStart(2, '0')} ${ampm}`;

            organized.push({ ...appointment, formattedTime });
        });
        return organized;
    };


/*
    useEffect(() => {
        const data = 
        setJsonData(data);
        //setOrganizedAppointments(organizeAppointmentsByHour(data.appointments));
    }, []);
*/
    return (
        <UserContext.Provider value={{jsonData}}>
            {children}
        </UserContext.Provider>
    );
};
