/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { createMember } from '../../redux/thunk';

const NewMember = () => {
  const [msg, setMsg] = useState('');
  const churchId = '1';
  const teamId = '2';

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const form = useForm();
  const { register, handleSubmit, reset } = form;

  const onSubmit = (data) => {
    const member = new FormData();
    member.append('member[name]', data.name);
    member.append('member[photo]', data.photo[0]);
    member.append('member[address]', data.address);
    member.append('member[phone_number]', data.phone_number);
    member.append('member[joined_at]', data.joined_at);
    member.append('member[church_id]', churchId);
    member.append('member[team_id]', teamId);
    dispatch(createMember(member)).then(setMsg('Member Added Successfully!'));
    reset();
    navigate('/members');
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <label htmlFor="name">Full Name</label>
        <input
          type="text"
          id="name"
          {...register('name')}
          placeholder="Full Name"
        />
        <label htmlFor="photo">Photo</label>
        <input
          type="file"
          id="photo"
          {...register('photo')}
          placeholder="Photo"
        />
        <label htmlFor="address">Address</label>
        <input
          type="text"
          id="address"
          {...register('address')}
          placeholder="Address"
        />
        <label htmlFor="phone_number">Phone Number</label>
        <input
          type="text"
          id="phone_number"
          {...register('phone_number')}
          placeholder="Phone Number"
        />
        <label htmlFor="joined_at">Member Since</label>
        <input
          type="date"
          id="joined_at"
          {...register('joined_at')}
          placeholder="Member Since"
        />

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
