// Appointment.js
import React from 'react';
import { useDrag } from 'react-dnd';

const Appointment = ({ appointment, index }) => {
  const [, drag] = useDrag({
    type: 'APPOINTMENT',
    item: { index },
  });

  return <div ref={drag}>{appointment.name}</div>;
};

export default Appointment;
