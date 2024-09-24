import React, { useEffect, useState, useRef } from 'react'

import Flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

export default function DatePicker() {
    const startDateRef = useRef(null);
    const endDateRef = useRef(null);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    useEffect(() => {
        // Initialize Flatpickr for start date
        const startDatePickr = Flatpickr(startDateRef.current, {
            dateFormat: 'Y-m-d',
            onChange: (selectedDates) => {
                setStartDate(selectedDates[0] ? selectedDates[0].toLocaleDateString() : '');
                console.log(startDate)
            },
        });

        // Split the input date into parts
        const [month, day, year] = startDate.split('/').map(part => part.padStart(2, '0'));

        // Format to YYYY-MM-DD
        let formattedStartDate = startDate ? `${year}-${month}-${day}` : '';


        // Initialize Flatpickr for end date
        const endDatePickr = Flatpickr(endDateRef.current, {
            dateFormat: 'Y-m-d',
            minDate: formattedStartDate,
            onChange: (selectedDates) => {
                setEndDate(selectedDates[0] ? selectedDates[0].toLocaleDateString() : '');
            }
        });

        // Clean up Flatpickr instance on unmount
        return () => {
            startDatePickr.destroy();
            endDatePickr.destroy();
        };
    }, []);

    console.log(startDate)

    return (
        <>
            <div className='mb-2'>
                <label>Start Date:</label>
                <input
                    ref={startDateRef}
                    type="text"
                    placeholder="Select Start Date"
                    value={startDate}
                    readOnly // Prevent manual input
                />
            </div>
            <div className='flex mb-2'>
                <label>End Date:</label>
                <input
                    ref={endDateRef}
                    type="text"
                    placeholder="Select End Date"
                    value={endDate}
                    readOnly // Prevent manual input
                />
            </div>
            <p>Selected Start Date: {startDate}</p>
            <p>Selected End Date: {endDate}</p>
        </>
    )
}
