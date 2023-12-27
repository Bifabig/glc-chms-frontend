/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Button } from '@mui/material';
import { createTeam, getChurches } from '../../redux/thunk';

const NewTeam = () => {
  const [msg, setMsg] = useState('');
  const dispatch = useDispatch();
  const form = useForm();
  const {
    register, handleSubmit, reset, formState,
  } = form;
  const { errors } = formState;

  const {
    churches, isLoading,
  } = useSelector((store) => store.churches);

  const onSubmit = (data) => {
    const team = new FormData();
    team.append('team[name]', data.name);
    team.append('team[main_leader_name]', data.main_leader_name);
    team.append('team[sub_leader_name]', data.sub_leader_name);
    team.append('team[established_at]', data.established_at);
    team.append('team[church_id]', data.church_id);

    dispatch(createTeam(team)).then(setMsg('Team Added Successfully'));
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
        <form onSubmit={handleSubmit(onSubmit)} className="form">
          <div className="formInput">
            <label htmlFor="name" className="label">Team Name</label>
            <input
              type="text"
              id="name"
              {...register('name', {
                required:
                    {
                      value: true,
                      message: 'Team name is required',
                    },
              })
                }
              className="inputField"
            />
            <span className="errorMsg">{ errors.name?.message }</span>
          </div>
          <div className="formInput">
            <label htmlFor="main_leader_name" className="label">Main Leader&apos;s Name</label>
            <input
              type="text"
              id="main_leader_name"
              {...register('main_leader_name', {
                required:
                    {
                      value: true,
                      message: 'Main leader&apos;s name is required',
                    },
              })
                }
              className="inputField"
            />
            <span className="errorMsg">{ errors.main_leader_name?.message }</span>
          </div>
          <div className="formInput">
            <label htmlFor="sub_leader_name" className="label">Sub Leader&apos;s Name</label>
            <input
              type="text"
              id="sub_leader_name"
              {...register('sub_leader_name', {
                required:
                    {
                      value: true,
                      message: 'Sub leader&apos;s name is required',
                    },
              })
                }
              className="inputField"
            />
            <span className="errorMsg">{ errors.sub_leader_name?.message }</span>
          </div>
          <div className="formInput">
            <label htmlFor="established_at" className="label">Established In</label>
            <input
              type="date"
              id="established_at"
              {...register('established_at', { required: 'Established date is required' })}
              className="inputField"
            />
            <span className="errorMsg">{ errors.established_at?.message }</span>
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

          <div className="submitBtn">
            <Button
              type="submit"
              variant="contained"
              color="success"
            >
              Add Team
            </Button>
          </div>
          <span>{msg}</span>
        </form>
      </div>
    )
  );
};

export default NewTeam;
