import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box, Button, Modal, Typography,
} from '@mui/material';
// import {
//   Button,
// } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { fetchTeamDetail } from '../../redux/thunk';
import styles from '../../styles/Churches.module.css';
import UpdateTeam from './UpdateTeam';

const TeamDetail = () => {
  const { teamId } = useParams();
  const [modalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch();

  const {
    teamDetail, isLoading, error, errorMsg,
  } = useSelector((store) => store.teams);

  const navigate = useNavigate();
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  const goBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    dispatch(fetchTeamDetail(teamId));
  }, [dispatch, teamId]);

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
  return isLoading ? <span>Loading...</span> : teamDetail && (
    <div className={styles.churchDetailPage}>
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
            Update Team
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{ mt: 2 }}
            component="div"
          >
            <UpdateTeam teamDetail={teamDetail} />
            {' '}
            <Button onClick={handleModalClose}>Close</Button>
          </Typography>
        </Box>
      </Modal>
      <div className={styles.chruchDetail}>
        <div className={styles.churchDetailHeader}>
          <h2>Church Detail</h2>
          {/* <img src={churchDetail.attributes.photo_url}
          alt="member detail" className={styles.memberDetailImg} /> */}
        </div>
        <div className={styles.churchInfo}>
          <strong>
            {`Church Name: ${teamDetail.name}`}
          </strong>
          <strong>
            {`Main Leader: ${teamDetail.main_leader_name}`}
          </strong>
          <strong>
            {`Sub Leader: ${teamDetail.sub_leader_name}`}
          </strong>
          <strong>
            {`Established In: ${teamDetail.established_at}`}
          </strong>
          {/* <strong>
            {`Established In: ${teamDetail.sub_leader_name}`}
          </strong> */}
          {/* <strong>
            {`Member Since: ${memberDetail.attributes.joined_at}`}
          </strong> */}
          {/* <div className={styles.memberDetailExtra}>
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
          </div> */}
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

export default TeamDetail;
