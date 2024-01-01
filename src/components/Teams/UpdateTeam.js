/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { getChurches, updateTeam } from '../../redux/thunk';
import styles from '../../styles/Churches.module.css';

const UpdateTeam = ({ teamDetail }) => {
  const [msg, setMsg] = useState('');
  const dispatch = useDispatch();

  const {
    churches, isLoading,
  } = useSelector((store) => store.churches);

  console.log(teamDetail);
  const form = useForm();
  const {
    register, handleSubmit, formState,
  } = form;
  const { errors } = formState;

  const onSubmit = (data) => {
    const team = new FormData();
    team.append('team[name]', data.name);
    team.append('team[main_leader_name]', data.main_leader_name);
    team.append('team[sub_leader_name]', data.sub_leader_name);
    team.append('team[established_at]', data.established_at);
    team.append('team[church_id]', data.church_id);

    dispatch(updateTeam({ id: teamDetail.id, teamData: team })).then(setMsg('Team Updated Successfully!'));
    setTimeout(() => {
      setMsg('');
    }, 3000);
  };
  useEffect(() => {
    dispatch(getChurches());
  }, [dispatch]);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form} noValidate>
        <div className="formInput">
          <label htmlFor="name" className="label">Team Name</label>
          <input
            type="text"
            defaultValue={teamDetail.name}
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
            defaultValue={teamDetail.main_leader_name}
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
            defaultValue={teamDetail.sub_leader_name}
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
            defaultValue={teamDetail.established_at}
            id="established_at"
            {...register('established_at', { required: 'Established date is required' })}
            className="inputField"
          />
          <span className="errorMsg">{ errors.established_at?.message }</span>
        </div>
        <div className="formInput">
          <label htmlFor="church_id" className="label">Branch Church</label>
          {isLoading ? <option>Loading...</option>
            : (
              <select
                id="church_id"
                name="church_id"
                defaultValue={teamDetail.church_id}
                {...register('church_id', { required: 'Please Select a Church' })}
                className="inputField"
              >
                {churches.map((church) => (
                  <option
                    key={church.id}
                    value={church.id}
                  >
                    {church.name}
                  </option>

                ))}
              </select>
            )}
          <span className="errorMsg">{ errors.church_id?.message }</span>
        </div>

        <div className="submitBtn">
          <Button
            type="submit"
            variant="contained"
            color="success"
          >
            Update Team
          </Button>
        </div>
        <span>{msg}</span>
      </form>
    </div>
  );
};

UpdateTeam.propTypes = {
  teamDetail: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.number,
      PropTypes.string,
      PropTypes.object,
      PropTypes.array,
    ]),
  ).isRequired,
};
export default UpdateTeam;
