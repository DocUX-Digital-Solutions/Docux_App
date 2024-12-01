import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [jsonData, setJsonData] = useState({ "hi": "hello" });
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



    useEffect(() => {
        const data = {
            "doctorsName": "Dr. Mike Smith",
            "appointments": {
                "eqwd3142412": {
                    name: "Jane Doe1",
                    timeAppointment: "2024-11-09T22:32:06Z",
                    status: "ER",
                    symptoms: "headache",
                    soapNotes: { 
                        "Subject": "Subjective: The patient presents with a chief complaint of chronic shoulder pain that has been ongoing for the past six months. The pain is described as a constant ache with intermittent sharp sensations, primarily localized to the right shoulder. The patient reports difficulty in performing overhead activities, such as reaching for items on high shelves, and notes that the pain tends to worsen during periods of increased activity. Objective: Physical examination reveals tenderness over the right shoulder, particularly...", 
                        "Objective": "2", 
                        "Assessment": "3", 
                        "Plan": "4", 
                    }
                },
                "eqwd3143412": {
                    name: "Jane Doe2",
                    timeAppointment: "2024-11-09T22:30:06Z",
                    status: "Late",
                    symptoms: "headache",
                    soapNotes: { 
                        "Subject": "1", 
                        "Objective": "2", 
                        "Assessment": "3", 
                        "Plan": "4", 
                    }
                },
                "eqwd31434": {
                    name: "Jane Doe3",
                    timeAppointment: "2024-11-09T22:20:06Z",
                    status: "ER",
                    symptoms: "headache",
                    soapNotes: { 
                        "Subject": "1", 
                        "Objective": "2", 
                        "Assessment": "3", 
                        "Plan": "4", 
                    }
                },
                "15312qdwr32": {
                    name: "Jane Doe4",
                    timeAppointment: "2024-11-09T02:32:06Z",
                    status: "",
                    symptoms: "headache",
                    soapNotes: { 
                        "Subject": "1", 
                        "Objective": "2", 
                        "Assessment": "3", 
                        "Plan": "4", 
                    }
                },
                "nfwlqkn323423": {
                    name: "Jane Doe5",
                    timeAppointment: "2024-11-09T4:32:06Z",
                    status: "ER",
                    symptoms: "headache",
                    soapNotes: { 
                        "Subject": "1", 
                        "Objective": "2", 
                        "Assessment": "3", 
                        "Plan": "4", 
                    }
                },
                "kfnalknflkwe32432": {
                    name: "Jane Doe6",
                    timeAppointment: "2024-11-09T8:32:06Z",
                    status: "",
                    symptoms: "headache",
                    soapNotes: { 
                        "Subject": "1", 
                        "Objective": "2", 
                        "Assessment": "3", 
                        "Plan": "4", 
                    }
                }
            }
        }
        setJsonData(data);
        setOrganizedAppointments(organizeAppointmentsByHour(data.appointments));
    }, []);

    return (
        <UserContext.Provider value={{ jsonData, organizedAppointments }}>
            {children}
        </UserContext.Provider>
    );
};
