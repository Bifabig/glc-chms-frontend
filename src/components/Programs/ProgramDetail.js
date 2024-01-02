import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box, Button, Modal, Typography,
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { fetchProgramDetail } from '../../redux/thunk';
import styles from '../../styles/Members.module.css';
import UpdateProgram from './UpdateProgram';

const ProgramDetail = () => {
  const { programId } = useParams();
  const [modalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch();

  const {
    programDetail, isLoading, error, errorMsg,
  } = useSelector((store) => store.programs);

  const navigate = useNavigate();
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  const goBack = () => {
    navigate('/programs');
  };

  useEffect(() => {
    dispatch(fetchProgramDetail(programId));
  }, [dispatch, programId]);

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
  return isLoading ? <span>Loading...</span> : programDetail && (
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
            left: '20%',
            transform: 'translate(-50%; -50%)',
            width: 500,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Update Program
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{ mt: 2 }}
            component="div"
          >
            <UpdateProgram programDetail={programDetail} />
            {' '}
            <Button onClick={handleModalClose}>Close</Button>
          </Typography>
        </Box>
      </Modal>
      <div className={styles.memberDetail}>
        <div className={styles.memberDetailHeader}>
          <h2>Program Detail</h2>
          {/* <img src={programDetail.attributes.photo_url}
          alt="member detail" className={styles.memberDetailImg} /> */}
        </div>
        <div className={styles.memberInfo}>
          <strong>
            {
            programDetail.attributes.attendance_taker === 'undefined'
              ? 'Attendance taker: N/A'
              : `Attendance taker: ${programDetail.attributes.attendance_taker}`
            }
          </strong>
          <strong>
            {`Program Name: ${programDetail.attributes.name}`}
          </strong>
          {/* <strong>
            {`Phone Number: ${programDetail.attributes.phone_number}`}
          </strong> */}
          <strong>
            {`Program Date: ${programDetail.attributes.date}`}
          </strong>
          <div className={styles.memberDetailExtra}>
            <strong>Church</strong>
            <ul>
              {programDetail.programChurch.map((church) => (
                <li key={church.id}>
                  {church.attributes.name}
                </li>
              ))}
            </ul>
            <strong>Teams</strong>
            <ul>
              {programDetail.programTeams.map((team) => (
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

export default ProgramDetail;
