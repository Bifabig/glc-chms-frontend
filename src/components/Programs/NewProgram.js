/* eslint-disable camelcase */
import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { createAttendance, createProgram } from '../../redux/thunk';
import Input from '../Input';

const NewProgram = () => {
  const [msg, setMsg] = useState('');
  const [hasAttendance, setHasAttendance] = useState(false);
  const name = useRef();
  const date = useRef();
  const attTaker = useRef();
  const church_id = '1';
  const team_id = '1';

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onChangeCheckBox = (e) => {
    setHasAttendance(e.target.checked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const programData = {
      name: name.current.value,
      date: date.current.value,
      church_id,
      team_id,
    };
    const attendanceData = {
      att_taker: attTaker.current.value,
    };

    if (hasAttendance && attTaker.current.value !== '') {
      dispatch(createProgram(programData), createAttendance(attendanceData)).then(setMsg('Program Added Successfully'));
    } else if (hasAttendance && attTaker.current.value !== '') {
      setMsg('Please add an attendance taker first');
    } else {
      dispatch(createProgram(programData)).then(setMsg('Program Added Successfully'));
    }

    name.current.value = '';
    date.current.value = '';
    attTaker.current.value = '';

    navigate('/programs');
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="form">
        <Input
          name="name"
          ref={name}
          type="text"
          placeholder="Program Name"
        />
        <Input
          name="date"
          ref={date}
          type="date"
          placeholder="Date"
        />

        <div>
          <span>Take Attendance</span>
          <input type="checkbox" checked={hasAttendance} onChange={onChangeCheckBox} />
        </div>

        {hasAttendance && (
          <input type="text" ref={attTaker} placeholder="Attendance Taker's Name" />
        )}

        <div className="submit-btn">
          <Button
            type="submit"
            variant="contained"
            color="success"
          >
            Add Program
          </Button>
        </div>
        <span>{msg}</span>
      </form>
    </div>
  );
};

export default NewProgram;
