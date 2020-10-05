import React, { useContext, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { UserContext } from '../../App';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import { Button } from '@material-ui/core';
import Booking from '../Booking/Booking';
const Book = () => {
    const { bedType } = useParams();
    const [loggedInUser] = useContext(UserContext)

    const [selectedDate, setSelectedDate] = useState({
        checkIn: new Date(),
        checkOut: new Date()
    });

    const handleCheckIn = (date) => {
        const newDate = { ...selectedDate }
        newDate.checkIn = date;
        setSelectedDate(newDate)  
    };
    const handleCheckOut = (date) => {
        const newDate = { ...selectedDate }
        newDate.checkOut = date;
        setSelectedDate(newDate)

    }
    const handleBooking = () => {
        const newBooking = { ...loggedInUser, ...selectedDate };
        fetch('http://localhost:4000/addBooking', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newBooking)

        })
            .then(res => res.json())
            .then(data => {
            console.log(data)
        })
    }
    return (
        <div style={{ textAlign: 'center' }}>
            <h1> Hello {loggedInUser.name} Let's book a {bedType} Room.</h1>
            <p>Want a <Link to="/home">different room?</Link> </p>

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="space-around">
                    <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="dd/MM/yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        label="Check Out Date"
                        value={selectedDate.checkIn}
                        onChange={handleCheckIn}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                    <KeyboardDatePicker
                        margin="normal"
                        id="date-picker-dialog"
                        label="Check Out Date"
                        format="dd/MM/yyyy"
                        value={selectedDate.checkOut}
                        onChange={handleCheckOut}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                </Grid>
                <Button onClick={handleBooking} variant='contained' color='secondary'>Book now</Button>
            </MuiPickersUtilsProvider>
            <Booking/>
        </div>
    );
};

export default Book;