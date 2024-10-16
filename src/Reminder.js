import React from "react";
import './Reminder.css';
import {motion} from 'framer-motion';

function ReminderCard({title,description,date,color,onDelete}) {
    return (
        <motion.div
            className="reminder-card"
            style={{borderColor: color, backgroundColor: color}}
            initial={{ opacity: 0, y:-20}}
            animate={{ opacity: 1, y:0}}
            exit={{ opacity: 0, y:-20}}
            transition={{duration: 0.5}}
        >
            <h3>{title}</h3>
            <p>{description}</p>
            <p>{date}</p>
            <button onClick={onDelete}>Delete</button>
        </motion.div>
    );
}


export default ReminderCard;