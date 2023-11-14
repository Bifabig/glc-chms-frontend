/* eslint-disable camelcase */
import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import Input from '../Input';
import { createMember } from '../../redux/thunk';

const NewMember = () => {
  const [msg, setMsg] = useState('');
  const name = useRef();
  const photo = useRef();
  const address = useRef();
  const phone_number = useRef();
  const joined_at = useRef();
  const church_id = '1';

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const img = photo.current.files[0];
    const photoObj = URL.createObjectURL(img);

    const formData = {
      name: name.current.value,
      photo: photoObj,
      address: address.current.value,
      phone_number: phone_number.current.value,
      joined_at: joined_at.current.value,
      church_id,
    };
    dispatch(createMember(formData)).then(setMsg('Member Added Successfully!'));
    name.current.value = '';
    photo.current.value = '';
    address.current.value = '';
    phone_number.current.value = '';
    joined_at.current.value = '';
    navigate('/members');
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="form">
        <Input
          name="name"
          ref={name}
          errorMsg="Name is required!"
          type="text"
          placeholder="Full Name"
          required="true"
        />
        <Input
          name="photo"
          ref={photo}
          errorMsg="Image is required!"
          type="file"
          placeholder="Photo"
          required="true"
        />
        <Input
          name="address"
          ref={address}
          errorMsg="Address is required"
          type="text"
          placeholder="Address"
          required="true"
        />
        <Input
          name="phone_number"
          ref={phone_number}
          errorMsg="Phone number is required"
          type="text"
          placeholder="Phone Number"
          required="true"
        />
        <Input
          name="joined_at"
          ref={joined_at}
          type="date"
          placeholder="Member Since"
          required="true"
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
