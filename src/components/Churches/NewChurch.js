/* eslint-disable camelcase */
import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { createChurch } from '../../redux/thunk';
import Input from '../Input';

const NewChurch = () => {
  const [msg, setMsg] = useState('');
  const name = useRef();
  const location = useRef();
  const established_at = useRef();
  const user_id = '1';

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      name: name.current.value,
      location: location.current.value,
      established_at: established_at.current.value,
      user_id,
    };

    dispatch(createChurch(formData)).then(setMsg('Church Added Successfully!'));

    name.current.value = '';
    location.current.value = '';
    established_at.current.value = '';

    navigate('/churches');
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="form">
        <Input
          name="name"
          ref={name}
          type="text"
          placeholder="Church Name"
        />
        <Input
          name="location"
          ref={location}
          type="text"
          placeholder="Location"
        />
        <Input
          name="established_at"
          ref={established_at}
          type="date"
          placeholder="Established In"
        />

        <div className="submit-btn">
          <Button
            type="submit"
            variant="contained"
            color="success"
          >
            Add Church
          </Button>
        </div>
        <span>{msg}</span>
      </form>
    </div>
  );
};

export default NewChurch;
