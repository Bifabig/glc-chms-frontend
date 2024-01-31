/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { updateChurch } from '../../redux/thunk';
import styles from '../../styles/Churches.module.css';

const UpdateChurch = ({ churchDetail }) => {
  const [msg, setMsg] = useState('');
  const dispatch = useDispatch();

  const form = useForm();
  const {
    register, handleSubmit, reset, formState,
  } = form;
  const { errors } = formState;

  const onSubmit = (data) => {
    const church = new FormData();
    church.append('church[name]', data.name);
    church.append('church[location]', data.location);
    church.append('church[established_at]', data.established_at);
    church.append('church[user_id]', '1');

    dispatch(updateChurch({ id: churchDetail.id, churchData: church })).then(setMsg('Church Added Successfully!'));
    setTimeout(() => {
      setMsg('');
    }, 3000);

    reset();
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form} noValidate>
        <div className="formInput">
          <label htmlFor="name" className={styles.label}>Church Name</label>
          <input
            type="text"
            defaultValue={churchDetail.name}
            id="name"
            {...register('name', {
              required:
                    {
                      value: true,
                      message: 'Church name is required',
                    },
            })
                }
            placeholder="Church Name"
            className="inputField"
          />
          <span className="errorMsg">{ errors.name?.message }</span>
        </div>
        <div className="formInput">
          <label htmlFor="location" className={styles.label}>Location</label>
          <input
            type="text"
            defaultValue={churchDetail.location}
            id="location"
            {...register('location', {
              required:
                    {
                      value: true,
                      message: 'Location is required',
                    },
            })
                }
            placeholder="Location"
            className="inputField"
          />
          <span className="errorMsg">{ errors.location?.message }</span>
        </div>
        <div className="formInput">
          <label htmlFor="established_at" className={styles.label}>Established In</label>
          <input
            type="date"
            defaultValue={churchDetail.established_at}
            id="established_at"
            {...register('established_at', {
              required:
                    {
                      value: true,
                      message: 'Established date is required',
                    },
            })
                }
            placeholder="Established In"
            className="inputField"
          />
          <span className="errorMsg">{ errors.established_at?.message }</span>
        </div>
        <div className="submitBtn">
          <Button
            type="submit"
            variant="contained"
            color="success"
          >
            Update Church
          </Button>
        </div>
        <span>{msg}</span>
      </form>
    </div>
  );
};

UpdateChurch.propTypes = {
  churchDetail: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.number,
      PropTypes.string,
      PropTypes.object,
      PropTypes.array,
    ]),
  ).isRequired,
};

export default UpdateChurch;
