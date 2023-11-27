/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { createMember, getChurches } from '../../redux/thunk';
import styles from '../../styles/Members.module.css';

const NewMember = () => {
  const [msg, setMsg] = useState('');
  // const churchId = '1';
  const teamId = '2';

  const {
    churches, isLoading,
  } = useSelector((store) => store.churches);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const form = useForm();
  const {
    register, handleSubmit, reset, formState,
  } = form;
  const { errors } = formState;

  const onSubmit = (data) => {
    const member = new FormData();
    member.append('member[name]', data.name);
    member.append('member[photo]', data.photo[0]);
    member.append('member[address]', data.address);
    member.append('member[phone_number]', data.phone_number);
    member.append('member[joined_at]', data.joined_at);
    member.append('member[church_id]', data.church_id);
    member.append('member[team_id]', teamId);
    dispatch(createMember(member)).then(setMsg('Member Added Successfully!'));
    reset();
    navigate('/members');
  };

  useEffect(() => {
    dispatch(getChurches());
  }, [dispatch]);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form} noValidate>
        <label htmlFor="name" className={styles.label}>Full Name</label>
        <input
          type="text"
          id="name"
          {...register('name', {
            required:
            { value: true, message: 'Full name is required' },
          })
          }
          placeholder="Full Name"
          className={styles.inputField}
        />
        <span className={styles.errorMsg}>{ errors.name?.message }</span>
        <label htmlFor="photo" className={styles.label}>Photo</label>
        <input
          type="file"
          id="photo"
          {...register('photo', { required: 'Photo is required' })}
          placeholder="Photo"
        />
        <span className={styles.errorMsg}>{ errors.photo?.message }</span>
        <label htmlFor="address" className={styles.label}>Address</label>
        <input
          type="text"
          id="address"
          {...register('address', { required: 'Address is required' })}
          placeholder="Address"
          className={styles.inputField}
        />
        <span className={styles.errorMsg}>{ errors.address?.message }</span>
        <label htmlFor="phone_number" className={styles.label}>Phone Number</label>
        <input
          type="text"
          id="phone_number"
          {...register('phone_number', {
            required: 'Phone number is required',
            pattern:
            { value: /^[0-9]*$/, message: 'Add correct phone number' },
          })}
          placeholder="Phone Number"
          className={styles.inputField}
        />
        <span className={styles.errorMsg}>{ errors.phone_number?.message }</span>
        <label htmlFor="joined_at" className={styles.label}>Member Since</label>
        <input
          type="date"
          id="joined_at"
          {...register('joined_at', { required: 'Joined date is required' })}
          placeholder="Member Since"
          className={styles.inputField}
        />
        <span className={styles.errorMsg}>{ errors.joined_at?.message }</span>

        <label htmlFor="church_id" className={styles.label}>Branch</label>

        <select {...register('church_id')} className={styles.inputField}>
          {isLoading ? <p>Loading</p> : churches.map((church) => (
            <option
              value={church.id}
              key={church.id}
            >
              {church.name}
            </option>
          ))}
        </select>

        <div className="submit-btn">
          <Button type="submit" variant="contained" color="success">
            Add Member
          </Button>
        </div>
        <span>{msg}</span>
      </form>
    </div>
  );
};

export default NewMember;
