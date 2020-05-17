import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const ProfileExperience = ({ experience }) => {
  return (
    <div className='profile-exp bg-whitee p-2'>
      <h2 className='text-primary'>Experiences</h2>
      {experience.length > 0 &&
        experience.map((exp) => (
          <div key={exp._id}>
            <h3>{exp.company}</h3>
            <p>
              <Moment format='YYYY/MM/DD'>{exp.from}</Moment> -{' '}
              {exp.to ? <Moment format='YYYY/MM/DD'>{exp.to}</Moment> : 'Now'}
            </p>
            <p>
              <strong>Position: </strong>
              {exp.title}
            </p>
            <p>
              <strong>Description: </strong>
              {exp.description}
            </p>
          </div>
        ))}
    </div>
  );
};

ProfileExperience.propTypes = {
  experience: PropTypes.array.isRequired,
};

export default ProfileExperience;
