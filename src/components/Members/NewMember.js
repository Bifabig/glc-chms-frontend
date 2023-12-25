/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { createMember, getChurches } from '../../redux/thunk';
import styles from '../../styles/Members.module.css';
import TeamsDropdown from '../Teams/TeamsDropdown';

const NewMember = () => {
  const [msg, setMsg] = useState('');
  const [selectedTeams, setSelectedTeams] = useState([]);
  const [fileImg, setFileImg] = useState('');

  const {
    churches, isLoading,
  } = useSelector((store) => store.churches);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const form = useForm();
  const {
    register, handleSubmit, reset, formState, control,
  } = form;
  const { errors } = formState;

  function handleImgUpload(e) {
    setFileImg(URL.createObjectURL(e.target.files[0]));
  }

  const onSubmit = (data) => {
    const member = new FormData();
    member.append('member[name]', data.name);
    member.append('member[photo]', data.photo[0]);
    member.append('member[address]', data.address);
    member.append('member[phone_number]', data.phone_number);
    member.append('member[joined_at]', data.joined_at);
    member.append('member[church_id]', data.church_id);
    if (selectedTeams.length > 0) {
      selectedTeams.forEach((team) => {
        member.append('member[teams][]', team.id);
      });
    } else {
      member.append('member[teams]', '');
    }
    dispatch(createMember(member)).then(setMsg('Member Added Successfully!'));
    setTimeout(() => {
      setMsg('');
    }, 3000);

    reset();
    setFileImg('');
    navigate('/members');
  };

  useEffect(() => {
    dispatch(getChurches());
  }, [dispatch]);

  return (
    isLoading ? <option>Loading...</option>
      : (
        <div>
          <form onSubmit={handleSubmit(onSubmit)} className="form" noValidate>
            <div className="formInput">
              <label htmlFor="name" className="label">Full Name</label>
              <input
                type="text"
                id="name"
                {...register('name', {
                  required:
                    {
                      value: true,
                      message: 'Full name is required',
                    },
                })
                }
                placeholder="Full Name"
                className="inputField"
              />
              <span className="errorMsg">{ errors.name?.message }</span>
            </div>
            <div className="formInput">
              <label htmlFor="photo" className="label">Photo</label>
              <input
                type="file"
                id="photo"
                {...register('photo', { required: 'Photo is required' })}
                placeholder="Photo"
                onChange={handleImgUpload}
              />
              {fileImg === '' ? '' : <img src={fileImg} alt="member" className={styles.memberDetailImg} />}
              <span className="errorMsg">{ errors.photo?.message }</span>
            </div>
            <div className="formInput">
              <label htmlFor="address" className="label">Address</label>
              <input
                type="text"
                id="address"
                {...register('address', { required: 'Address is required' })}
                placeholder="Address"
                className="inputField"

              />
              <span className="errorMsg">{ errors.address?.message }</span>
            </div>
            <div className="formInput">
              <label htmlFor="phone_number" className="label">Phone Number</label>
              <input
                type="text"
                id="phone_number"
                {...register('phone_number', {
                  required: 'Phone number is required',
                  pattern:
            { value: /^[0-9]*$/, message: 'Add correct phone number' },
                })}
                placeholder="Phone Number"
                className="inputField"

              />
              <span className="errorMsg">{ errors.phone_number?.message }</span>
            </div>
            <div className="formInput">
              <label htmlFor="joined_at" className="label">Member Since</label>
              <input
                type="date"
                id="joined_at"
                {...register('joined_at', { required: 'Joined date is required' })}
                placeholder="Member Since"
                className="inputField"

              />
              <span className="errorMsg">{ errors.joined_at?.message }</span>
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
                {churches.map((church) => (
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
            <div className="selectorInput">
              <label htmlFor="teams" className="label">Teams</label>
              <Controller
                control={control}
                name="teams"
                render={({ field }) => (

                  <TeamsDropdown
                    field={field}
                    defaultValue={[]}
                    selectedTeams={selectedTeams}
                    setSelectedTeams={setSelectedTeams}
                  />

                )}
              />
              <span className="errorMsg">{errors.teams?.message}</span>

            </div>
            <div className="submitBtn">
              <Button type="submit" variant="contained" color="success">
                Add Member
              </Button>
            </div>
            <span>{msg}</span>
          </form>
        </div>
      )
  );
};

export default NewMember;
