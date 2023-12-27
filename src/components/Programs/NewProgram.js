/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { createProgram, getChurches } from '../../redux/thunk';
import TeamsDropdown from '../Teams/TeamsDropdown';
// import Input from '../Input';

const NewProgram = () => {
  const [msg, setMsg] = useState('');
  // const [hasAttendance, setHasAttendance] = useState(false);
  const [selectedTeams, setSelectedTeams] = useState([]);
  // const name = useRef();
  // const date = useRef();
  // const attTaker = useRef();
  // const church_id = '1';
  // const team_id = '1';
  // const program_id = '1';

  // const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    churches, isLoading,
  } = useSelector((store) => store.churches);

  const form = useForm();
  const {
    register, handleSubmit, reset, formState, control,
  } = form;
  const { errors } = formState;

  // const onChangeCheckBox = (e) => {
  //   setHasAttendance(e.target.checked);
  // };

  const onSubmit = (data) => {
    const program = new FormData();
    program.append('program[name]', data.name);
    program.append('program[date]', data.date);
    program.append('program[church_id]', data.church_id);
    // console.log(selectedTeams);
    if (selectedTeams.length > 0) {
      selectedTeams.forEach((team) => {
        // console.log(team);
        program.append('program[teams][]', team.id);
      });
    } else {
      program.append('program[teams]', '');
    }
    // e.preventDefault();
    // const programData = {
    //   name: name.current.value,
    //   date: date.current.value,
    //   church_id,
    //   team_id,
    // };
    // const attendanceData = {
    //   att_taker: attTaker.current.value,
    //   program_id,
    // };
    // const attendace = new FormData();
    // attendace.append('program[att_taker]', data.att_taker);

    // if (hasAttendance && data.att_taker !== '') {
    // dispatch(createProgram(program));
    // dispatch(createAttendance(attendace)).then(
    //   setMsg('Program Added Successfully'),
    // );
    // name.current.value = '';
    // date.current.value = '';
    // attTaker.current.value = '';

    // navigate('/programs');
    // } else if (hasAttendance && data.att_taker === '') {
    //   setMsg('Please add an attendance taker first');
    // } else {
    dispatch(createProgram(program)).then(
      setMsg('Program Added Successfully'),
    );
    // console.log(programResponse);
    //   name.current.value = '';
    //   date.current.value = '';

    //   navigate('/programs');
    // }
    setTimeout(() => {
      setMsg('');
    }, 3000);
    reset();
  };

  useEffect(() => {
    dispatch(getChurches());
  }, [dispatch]);

  return (
    (
      <div>
        <form onSubmit={handleSubmit(onSubmit)} className="form" noValidate>
          {/* <div className="formInput">
            <span>Take Attendance</span>
            <input
              type="checkbox"
              checked={hasAttendance}
              onChange={onChangeCheckBox}
            />
          </div>
          {hasAttendance && (
          // <Input
          //   name="att_taker"
          //   type="text"
          //   ref={attTaker}
          //   placeholder="Attendance Taker's Name"
          // />
          <div className="formInput">
            <label htmlFor="att_taker" className="label">Attendance Taker</label>
            <input
              type="text"
              id="att_taker"
              {...register('att_taker', {
                required:
                    {
                      value: true,
                      message: 'Attendance taker is required',
                    },
              })
                }
              className="inputField"
            />
            <span className="errorMsg">{ errors.att_taker?.message }</span>
          </div>
          )} */}
          <div className="formInput">
            <label htmlFor="name" className="label">Program Name</label>
            <input
              type="text"
              id="name"
              {...register('name', {
                required:
                    {
                      value: true,
                      message: 'Program name is required',
                    },
              })
                }
              placeholder="Program Name"
              className="inputField"
            />
            <span className="errorMsg">{ errors.name?.message }</span>
          </div>
          <div className="formInput">
            <label htmlFor="date" className="label">Member Since</label>
            <input
              type="date"
              id="date"
              {...register('date', { required: 'Joined date is required' })}
              placeholder="Member Since"
              className="inputField"
            />
            <span className="errorMsg">{ errors.date?.message }</span>
          </div>
          <div className="formInput">
            <label htmlFor="church_id" className="label">Branch Church</label>
            <select
              id="church_id"
              name="church_id"
              {...register('church_id', { required: 'Please Select a Church' })}
              className="inputField"
            >
              <option value="">Select Church</option>
              {isLoading ? <option>Loading...</option>
                : churches.map((church) => (
                  <option
                    value={church.id}
                    key={church.id}
                  >
                    {church.name}
                  </option>
                ))}
            </select>
            <span className="errorMsg">{ errors.church_id?.message }</span>
          </div>
          <div className="formInput">
            <label htmlFor="teams" className="label">Teams</label>
            <Controller
              control={control}
              name="teams"
              render={({ field }) => (

                <TeamsDropdown
                  field={field}
                  defaultValue={[]}
                  selectedTeams={selectedTeams}
                  setSelectedTeams={setSelectedTeams}
                />

              )}
            />
            <span className="errorMsg">{errors.teams?.message}</span>
          </div>
          <div className="submitBtn">
            <Button type="submit" variant="contained" color="success">
              Add Program
            </Button>
          </div>
          <span>{msg}</span>
        </form>
      </div>
    )
  );
};

export default NewProgram;
