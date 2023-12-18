/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';

import { getChurches, updateMember } from '../../redux/thunk';
import styles from '../../styles/Members.module.css';
import TeamsDropdown from '../Teams/TeamsDropdown';

const UpdateMember = ({ memberDetail }) => {
  const [msg, setMsg] = useState('');
  const [selectedTeams, setSelectedTeams] = useState(memberDetail.memberTeams);
  const [fileImg, setFileImg] = useState(memberDetail.attributes.photo_url);

  const {
    churches, isLoading,
  } = useSelector((store) => store.churches);

  function handleImgUpload(e) {
    setFileImg(URL.createObjectURL(e.target.files[0]));
  }

  const dispatch = useDispatch();
  const form = useForm();
  const {
    register, handleSubmit, formState, control,
  } = form;
  const { errors } = formState;

  // console.log(selectedTeams);

  const onSubmit = (data) => {
    const member = new FormData();
    member.append('member[id]', memberDetail.attributes.id);
    member.append('member[name]', data.name);
    member.append('member[photo]', data.photo[0]);
    member.append('member[address]', data.address);
    member.append('member[phone_number]', data.phone_number);
    member.append('member[joined_at]', data.joined_at);
    member.append('member[church_id]', data.church_id);
    selectedTeams.forEach((team) => {
      member.append('member[teams][]', team.id);
    });
    dispatch(updateMember({ id: memberDetail.attributes.id, memberData: member })).then(setMsg('Member Updated Successfully!'));
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
        <div className={styles.formInput}>
          <label htmlFor="name" className={styles.label}>Full Name</label>
          <input
            type="text"
            defaultValue={memberDetail.attributes.name}
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
        </div>
        <div className={styles.formInput}>
          <label htmlFor="photo" className={styles.label}>Photo</label>
          <input
            type="file"
            id="photo"
            {...register('photo')}
            defaultValue={[]}
            placeholder="Photo"
            onChange={handleImgUpload}
          />
          <img
            src={fileImg}
            alt={memberDetail.attributes.name}
            className={styles.memberDetailImg}
          />
          <span className={styles.errorMsg}>{ errors.photo?.message }</span>
        </div>
        <div className={styles.formInput}>
          <label htmlFor="address" className={styles.label}>Address</label>
          <input
            type="text"
            id="address"
            defaultValue={memberDetail.attributes.address}
            {...register('address', { required: 'Address is required' })}
            placeholder="Address"
            className={styles.inputField}
          />
          <span className={styles.errorMsg}>{ errors.address?.message }</span>
        </div>
        <div className={styles.formInput}>
          <label htmlFor="phone_number" className={styles.label}>Phone Number</label>
          <input
            type="text"
            id="phone_number"
            defaultValue={memberDetail.attributes.phone_number}
            {...register('phone_number', {
              required: 'Phone number is required',
              pattern:
            { value: /^[0-9]*$/, message: 'Add correct phone number' },
            })}
            placeholder="Phone Number"
            className={styles.inputField}
          />
          <span className={styles.errorMsg}>{ errors.phone_number?.message }</span>
        </div>
        <div className={styles.formInput}>
          <label htmlFor="joined_at" className={styles.label}>Member Since</label>
          <input
            type="date"
            id="joined_at"
            defaultValue={memberDetail.attributes.joined_at}
            {...register('joined_at', { required: 'Joined date is required' })}
            placeholder="Member Since"
            className={styles.inputField}
          />
          <span className={styles.errorMsg}>{ errors.joined_at?.message }</span>
        </div>
        <div className={styles.formInput}>
          <label htmlFor="church_id" className={styles.label}>Branch</label>
          <select id="church_id" name="church_id" defaultValue={memberDetail.memberChurch[0].id} {...register('church_id', { required: 'Please Select a Church' })} className={styles.inputField}>
            {isLoading ? <option>Loading...</option> : churches.map((church) => (

              <option
                value={church.id}
                key={church.id}
              >
                {church.name}
              </option>

            ))}
          </select>
          <span className={styles.errorMsg}>{ errors.church_id?.message }</span>
        </div>
        <div className={styles.selectorInput}>
          <label htmlFor="teams" className={styles.label}>Teams</label>
          <Controller
            control={control}
            name="teams"
            render={({ field }) => (
              <TeamsDropdown
                field={field}
                defaultValue={memberDetail.memberTeams.map((val) => val.id)}
                selectedTeams={selectedTeams}
                setSelectedTeams={setSelectedTeams}
              />
            )}
          />
        </div>
        <div className={styles.submitBtn}>
          <Button type="submit" variant="contained" color="success">
            Update Member
          </Button>
        </div>
        <span>{msg}</span>

      </form>
    </div>
  );
};

UpdateMember.propTypes = {
  memberDetail: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.number,
      PropTypes.string,
      PropTypes.object,
      PropTypes.array,
    ]),
  ).isRequired,
};

export default UpdateMember;
