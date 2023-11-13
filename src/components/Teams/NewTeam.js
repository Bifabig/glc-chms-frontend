/* eslint-disable camelcase */

import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import Input from '../Input';
import { createTeam } from '../../redux/thunk';

const NewTeam = () => {
  const [msg, setMsg] = useState('');
  const name = useRef();
  const main_leader_name = useRef();
  const sub_leader_name = useRef();
  const established_at = useRef();
  const church_id = '1';

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      name: name.current.value,
      main_leader_name: main_leader_name.current.value,
      sub_leader_name: sub_leader_name.current.value,
      established_at: established_at.current.value,
      church_id,
    };

    dispatch(createTeam(formData)).then(setMsg('Team Added Successfully'));

    name.current.value = '';
    main_leader_name.current.value = '';
    sub_leader_name.current.value = '';
    established_at.current.value = '';

    navigate('/teams');
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="form">
        <Input
          name="name"
          ref={name}
          type="text"
          placeholder="Team Name"
        />
        <Input
          name="main_leader_name"
          ref={main_leader_name}
          type="text"
          placeholder="Main Leader Name"
        />
        <Input
          name="sub_leader_name"
          ref={sub_leader_name}
          type="text"
          placeholder="Sub Leader Name"
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
            Add Team
          </Button>
        </div>
        <span>{msg}</span>
      </form>
    </div>
  );
};

export default NewTeam;
