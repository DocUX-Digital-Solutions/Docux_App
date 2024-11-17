import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [jsonData, setJsonData] = useState({ "hi": "hello" });
    const [organizedAppointments, setOrganizedAppointments] = useState({});

    const organizeAppointmentsByHour = (appointments) => {
        const organizedData = {};
      
        // Loop through the appointments
        Object.entries(appointments).forEach(([key, appointment]) => {
          const date = new Date(appointment.timeAppointment); // Convert the time string to Date object
          const hour = date.getHours(); // Get the hour (24-hour format)
          const period = hour < 12 ? 'AM' : 'PM'; // Determine AM or PM
          
          // Convert hour to 12-hour format
          const hour12 = hour % 12 || 12; // Convert 0 to 12 for AM/PM notation
      
          // Format the period with the hour (e.g., "3:00 AM", "5:00 PM")
          const timePeriod = `${hour12}:00 ${period}`;
      
          // Ensure the timePeriod exists in the organizedData object
          if (!organizedData[timePeriod]) {
            organizedData[timePeriod] = [];
          }
      
          // Add the appointment to the appropriate timePeriod group
          organizedData[timePeriod].push(appointment);
        });
      
        // Sort the data by hour (AM first, then PM)
        const sortedKeys = Object.keys(organizedData).sort((a, b) => {
          // Extract hours from the timePeriod strings ("3:00 AM" -> 3, "5:00 PM" -> 17)
          const getHour = (time) => {
            const [hourStr] = time.split(':'); // Get the hour part (e.g., "3" from "3:00 AM")
            const period = time.split(' ')[1]; // Get AM/PM part (e.g., "AM")
            let hour = parseInt(hourStr, 10);
            if (period === 'PM' && hour !== 12) hour += 12; // Convert PM hour to 24-hour format
            if (period === 'AM' && hour === 12) hour = 0; // Convert 12 AM to 0 hour
            return hour;
          };
      
          return getHour(a) - getHour(b);
        });
      
        // Create a new sorted object based on the sorted keys
        const sortedData = {};
        sortedKeys.forEach((timePeriod) => {
          sortedData[timePeriod] = organizedData[timePeriod];
        });
      
        return sortedData;
      };
      
    
      
      
    useEffect(() => {
        const data = {"doctorsName":"Dr. Mike Smith",
            "appointments": {
                "eqwd3142412":{
                name: "Jane Doe1",
                timeAppointment: "2024-11-09T22:32:06Z",
                status:"ER",
                symptoms: "headache"
                },
                "eqwd3143412":{
                    name: "Jane Doe2",
                    timeAppointment: "2024-11-09T22:30:06Z",
                    status:"Late",
                    symptoms: "headache"
                    },
                    "eqwd31434":{
                    name: "Jane Doe3",
                    timeAppointment: "2024-11-09T22:20:06Z",
                    status:"ER",
                    symptoms: "headache"
                    },
                "15312qdwr32":{
                name: "Jane Doe4",
                timeAppointment: "2024-11-09T02:32:06Z",
                status:"",
                symptoms: "headache"
                },
                "nfwlqkn323423":{
                name: "Jane Doe5",
                timeAppointment: "2024-11-09T4:32:06Z",
                status:"ER",
                symptoms: "headache"
                },
                "kfnalknflkwe32432":{
                name: "Jane Doe6",
                timeAppointment: "2024-11-09T8:32:06Z",
                status:"",
                symptoms: "headache"
                }
        }
        }
        setJsonData(data);
        setOrganizedAppointments(organizeAppointmentsByHour(data.appointments));
    }, []);

    return (
        <UserContext.Provider value={{ jsonData,organizedAppointments }}>
            {children}
        </UserContext.Provider>
    );
};
