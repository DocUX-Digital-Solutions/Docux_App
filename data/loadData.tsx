import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [jsonData, setJsonData] = useState([]);
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
