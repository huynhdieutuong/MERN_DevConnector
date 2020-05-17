import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const ProfileEducation = ({ education }) => {
  return (
    <div className='profile-edu bg-whitee p-2'>
      <h2 className='text-primary'>Education</h2>
      {education.length > 0 &&
        education.map((edu) => (
          <div key={edu._id}>
            <h3>{edu.school}</h3>
            <p>
              <Moment format='YYYY/MM/DD'>{edu.from}</Moment> -{' '}
              {edu.to ? <Moment format='YYYY/MM/DD'>{edu.to}</Moment> : 'Now'}
            </p>
            <p>
              <strong>Degree: </strong>
              {edu.degree}
            </p>
            <p>
              <strong>Fiel Of Study: </strong>
              {edu.fieldofstudy}
            </p>
            <p>
              <strong>Description: </strong>
              {edu.description}
            </p>
          </div>
        ))}
    </div>
  );
};

ProfileEducation.propTypes = {
  education: PropTypes.array.isRequired,
};

export default ProfileEducation;
