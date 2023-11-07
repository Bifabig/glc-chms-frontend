/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import Input from './Input';
import { createMember } from '../redux/thunk';
import styles from '../styles/NewMember.module.css';

const NewMember = () => {
  const [isdisabled, setIsDisabled] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    photo: '',
    address: '',
    phone_number: '',
    joined_at: '',
    // user_id: currentUser ? currentUser.id : 1,

  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleFormInputs = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createMember(formData));
    setFormData({
      name: '',
      photo: '',
      address: '',
      phone_number: '',
      joined_at: '',
      // user_id: currentUser ? currentUser.id : 1,
      // user_id: 1,
    });
    navigate('/');
  };

  useEffect(() => {
    const {
      name, photo, address, phone_number, joined_at,
    } = formData;

    if (name && photo && address && phone_number && joined_at) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [formData]);

  const {
    name, photo, address, phone_number, joined_at,
  } = formData;

  return (
    <div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <Input
          name="name"
          value={name}
          type="text"
          placeholder="Full Name"
          handleInput={handleFormInputs}
        />
        <Input
          name="photo"
          value={photo}
          type="text"
          placeholder="Photo"
          handleInput={handleFormInputs}
        />
        <Input
          name="address"
          value={address}
          type="text"
          placeholder="Address"
          handleInput={handleFormInputs}
        />
        <Input
          name="phone_number"
          value={phone_number}
          type="text"
          placeholder="Phone Number"
          handleInput={handleFormInputs}
        />
        <Input
          name="joined_at"
          value={joined_at}
          type="date"
          placeholder="Member Since"
          handleInput={handleFormInputs}
        />
        <div className="submit-btn">
          <Button type="submit" variant="contained" color="success" disabled={isdisabled}>
            Add Member
          </Button>
        </div>
      </form>
    </div>
  );
};

export default NewMember;
