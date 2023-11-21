/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable camelcase */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { useForm } from 'react-hook-form';
// import Input from '../Input';
import { createMember } from '../../redux/thunk';

const NewMember = () => {
  const [msg, setMsg] = useState('');
  // const name = useRef();
  // const photo = useRef();
  // const address = useRef();
  // const phone_number = useRef();
  // const joined_at = useRef();
  const church_id = '1';
  const team_id = '1';

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const form = useForm();
  const { register, handleSubmit } = form;

  const onSubmit = (data) => {
    // e.preventDefault();
    // const img = photo.current.files[0];
    // const photoObj = URL.createObjectURL(img);

    // const formData = {
    //   name: name.current.value,
    //   photo: photoObj,
    //   address: address.current.value,
    //   phone_number: phone_number.current.value,
    //   joined_at: joined_at.current.value,
    //   church_id,
    // };
    // const img = data.photo[0];
    // const photoObj = URL.createObjectURL(img);

    // const formData = data.map((e) => ({ ...e, photo: photoObj, church_id }));
    const member = new FormData();
    member.append('member[name]', data.name);
    member.append('member[photo]', data.photo[0]);
    member.append('member[address]', data.address);
    member.append('member[phone_number]', data.phone_number);
    member.append('member[joined_at]', data.joined_at);
    member.append('member[church_id]', church_id);
    member.append('member[team_id]', team_id);
    dispatch(createMember(member)).then(setMsg('Member Added Successfully!'));
    // name.current.value = '';
    // photo.current.value = '';
    // address.current.value = '';
    // phone_number.current.value = '';
    // joined_at.current.value = '';
    navigate('/members');
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <label htmlFor="name">Full Name</label>
        <input
          type="text"
          id="name"
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...register('name')}
          // name="name"
          // ref={name}
          // errorMsg="Name is required!"
          // type="text"
          placeholder="Full Name"
          // required="true"
        />
        <label htmlFor="photo">Photo</label>
        <input
          type="file"
          id="photo"
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...register('photo')}
          // name="photo"
          // ref={photo}
          // errorMsg="Image is required!"
          // type="file"
          placeholder="Photo"
          // required="true"
        />
        <label htmlFor="address">Address</label>
        <input
          type="text"
          id="address"
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...register('address')}
          // name="address"
          // ref={address}
          // errorMsg="Address is required"
          // type="text"
          placeholder="Address"
          // required="true"
        />
        <label htmlFor="phone_number">Phone Number</label>
        <input
          type="text"
          id="phone_number"
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...register('phone_number')}
          // name="phone_number"
          // ref={phone_number}
          // errorMsg="Phone number is required"
          // type="text"
          placeholder="Phone Number"
          // required="true"
        />
        <label htmlFor="joined_at">Member Since</label>
        <input
          type="date"
          id="joined_at"
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...register('joined_at')}
          // name="joined_at"
          // ref={joined_at}
          // type="date"
          placeholder="Member Since"
          // required="true"
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
