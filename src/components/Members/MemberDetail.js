/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box, Button, Modal, Typography,
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { fetchMemberDetail } from '../../redux/thunk';
import styles from '../../styles/Members.module.css';
import UpdateMember from './UpdateMember';

const MemberDetail = () => {
  const { memberId } = useParams();
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);

  const {
    memberDetail, isLoading, error, errorMsg,
  } = useSelector((store) => store.members);

  const navigate = useNavigate();
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  const goBack = () => {
    navigate('/members');
  };

  // const handleUpdate = (e) => {
  //   e.preventDefault();
  //   // dispatch(updateMember(memberId));
  //     ;
  // };

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
      <Button onClick={handleModalOpen} variant="contained" className={styles.backBtn}>
        Update
      </Button>
      <Modal
        className={styles.modal}
        open={modalOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            left: '20%',
            transform: 'translate(-50%; -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Update Member
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{ mt: 2 }}
            component="div"
          >
            <UpdateMember memberDetail={memberDetail} />
            {' '}
            <Button onClick={handleModalClose}>Close</Button>
          </Typography>
        </Box>
      </Modal>
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
