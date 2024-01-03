import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import PropTypes from 'prop-types';
import { getMembers } from '../../redux/thunk';

const MembersDropdown = ({
  defaultValue, field, selectedMembers, setSelectedMembers,
}) => {
  const dispatch = useDispatch();
  const {
    members, isLoading,
  } = useSelector((store) => store.members);

  useEffect(() => {
    dispatch(getMembers());
  }, [dispatch]);

  const handleOnChange = (selectedOptions) => {
    const newSelectedMembers = selectedOptions.map((option) => option.value);
    const selectedMemberObjects = members.filter(
      (member) => newSelectedMembers.includes(member.id),
    );
    setSelectedMembers(selectedMemberObjects);
  };
  return (
    isLoading ? <span>Loading...</span>
      : (
        <>
          <Select
            key={members.map((member) => member.id)}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...field}
            isMulti
            options={members.map((member) => ({
              value: member.id,
              label: member.name,
            }))}
            className="selectorDropdown"
            classNamePrefix="select"
            onChange={handleOnChange}
            value={selectedMembers?.name}
            defaultValue={members.filter((val) => defaultValue.includes(`${val.id}`))
              .map(
                (member) => ({
                  value: member.id,
                  label: member.name,
                }),
              )}
          />
        </>
      )

  );
};

MembersDropdown.propTypes = {
  field: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.number,
      PropTypes.string,
      PropTypes.object,
    ]),
  ).isRequired,
  defaultValue: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.number,
      PropTypes.string,
      PropTypes.object,
    ]),
  ).isRequired,
  setSelectedMembers: PropTypes.func.isRequired,
  selectedMembers: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.number,
      PropTypes.string,
      PropTypes.object,
    ]),
  ).isRequired,
};

export default MembersDropdown;
