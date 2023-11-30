/* eslint-disable max-len */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { fetchMemberDetail } from '../../redux/thunk';
import styles from '../../styles/Members.module.css';

const MemberDetail = () => {
  const { memberId } = useParams();
  const dispatch = useDispatch();

  const {
    memberDetail, isLoading, error, errorMsg,
  } = useSelector((store) => store.members);

  const navigate = useNavigate();
  const goBack = () => {
    navigate('/members');
  };

  useEffect(() => {
    dispatch(fetchMemberDetail(memberId));
  }, [dispatch, memberId]);

  if (error) {
    return (
      <span>
        Something Went Wrong...
        <br />
        <br />
        {errorMsg}
      </span>
    );
  }
  return isLoading ? <span>Loading...</span> : memberDetail && (
    <>
      <Button onClick={goBack} variant="contained" className={styles.backBtn} startIcon={<ArrowBack />}>
        Back
      </Button>
      <div className={styles.memberDetail}>
        <h2>Member Detail</h2>
        <div className={styles.memberDetailHeader}>
          <img src={memberDetail.attributes.photo_url} alt="member detail" className={styles.memberDetailImg} />
          <h3>
            Full Name:
            {' '}
            {memberDetail.attributes.name}
          </h3>
        </div>
        <div className={styles.basicInfo}>
          <strong>

            Address:
            {' '}
            {memberDetail.attributes.address}
          </strong>
          <strong>

            Phone Number:
            {' '}
            {memberDetail.attributes.phone_number}
          </strong>
          <strong>

            Member Since:
            {' '}
            {memberDetail.attributes.joined_at}
          </strong>
        </div>
        <div className={styles.memberMinistry}>
          <strong>Church</strong>
          <ul>
            {memberDetail.memberChurch.map((church) => <li key={church.id}>{church.attributes.name}</li>)}
          </ul>
          <strong>Teams</strong>
          <ul>
            {memberDetail.memberTeams.map((team) => <li key={team.id}>{team.attributes.name}</li>)}
          </ul>
        </div>
      </div>

    </>
  );
};

export default MemberDetail;
