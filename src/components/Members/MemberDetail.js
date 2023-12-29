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
  const [modalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch();

  const {
    memberDetail, isLoading, error, errorMsg,
  } = useSelector((store) => store.members);

  const navigate = useNavigate();
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

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
    <div className={styles.memberDetailPage}>
      <Button
        onClick={goBack}
        variant="outlined"
        className={styles.backBtn}
        size="medium"
        startIcon={<ArrowBack />}
      />
      <Modal
        className={styles.modal}
        open={modalOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            left: '19%',
            transform: 'translate(-50%; -50%)',
            width: 600,
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
        <div className={styles.memberDetailHeader}>
          <h2>Member Detail</h2>
          <img src={memberDetail.attributes.photo_url} alt="member detail" className={styles.memberDetailImg} />
        </div>
        <div className={styles.memberInfo}>
          <strong>
            {`Full Name: ${memberDetail.attributes.name}`}
          </strong>
          <strong>
            {`Address: ${memberDetail.attributes.address}`}
          </strong>
          <strong>
            {`Phone Number: ${memberDetail.attributes.phone_number}`}
          </strong>
          <strong>
            {`Member Since: ${memberDetail.attributes.joined_at}`}
          </strong>
          <div className={styles.memberDetailExtra}>
            <strong>Church</strong>
            <ul>
              {memberDetail.memberChurch.map((church) => (
                <li key={church.id}>
                  {church.attributes.name}
                </li>
              ))}
            </ul>
            <strong>Teams</strong>
            <ul>
              {memberDetail.memberTeams.map((team) => (
                <li key={team.id}>
                  {team.attributes.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <Button
          onClick={handleModalOpen}
          variant="outlined"
          className={styles.updateBtn}
          size="small"
        >
          Update
        </Button>
      </div>

    </div>
  );
};

export default MemberDetail;
