import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { getCurrentProfile, createProfile } from '../../redux/actions/profile';
import Spinner from '../layout/Spinner';

const EditProfile = ({
  profile: { loading, profile },
  getCurrentProfile,
  createProfile,
  history,
}) => {
  useEffect(() => {
    getCurrentProfile();

    if (profile) {
      const newFormData = {};
      for (let field in profile) {
        if (field === 'skills') {
          newFormData.skills = profile.skills.join(',');
        } else if (field === 'social') {
          for (let social in profile.social) {
            newFormData[social] = profile.social[social];
          }
        } else {
          newFormData[field] = profile[field];
        }
      }
      setFormData(newFormData);
    }
    // eslint-disable-next-line
  }, [loading]);

  const [formData, setFormData] = useState({
    company: '',
    website: '',
    location: '',
    status: '',
    skills: '',
    githubusername: '',
    bio: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    youtube: '',
    instagram: '',
  });

  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  const {
    company,
    website,
    location,
    status,
    skills,
    githubusername,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    createProfile(formData, history, true);
  };

  if (loading) {
    return <Spinner />;
  }

  if (!profile) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <Fragment>
      <h1 className='large text-primary'>Edit Your Profile</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Let's get some information to make your
        profile stand out
      </p>
      <small>* = required fields</small>
      <form className='form' onSubmit={onSubmit}>
        <div className='form-group'>
          <select name='status' value={status} onChange={onChange}>
            <option value='0'>* Select Professional Status</option>
            <option value='Developer'>Developer</option>
            <option value='Junior Developer'>Junior Developer</option>
            <option value='Senior Developer'>Senior Developer</option>
            <option value='Manager'>Manager</option>
            <option value='Student or Learning'>Student or Learning</option>
            <option value='Instructor or Teacher'>Instructor or Teacher</option>
            <option value='Intern'>Intern</option>
            <option value='Other'>Other</option>
          </select>
          <small className='form-text'>
            Give us an idea of where you are at in your career
          </small>
        </div>

        <div className='form-group'>
          <input
            type='text'
            placeholder='Company'
            name='company'
            value={company}
            onChange={onChange}
          />
          <small className='form-text'>
            Could be your own company or one you work for
          </small>
        </div>

        <div className='form-group'>
          <input
            type='text'
            placeholder='Website'
            name='website'
            value={website}
            onChange={onChange}
          />
          <small className='form-text'>
            Could be your own or a company website
          </small>
        </div>

        <div className='form-group'>
          <input
            type='text'
            placeholder='Location'
            name='location'
            value={location}
            onChange={onChange}
          />
          <small className='form-text'>
            City & state suggest (eg. Boston, MA
          </small>
        </div>

        <div className='form-group'>
          <input
            type='text'
            placeholder='* Skills'
            name='skills'
            value={skills}
            onChange={onChange}
          />
          <small className='form-text'>
            Please use comma separated values (eg. HTML, CSS, JavaScript, PHP)
          </small>
        </div>

        <div className='form-group'>
          <input
            type='text'
            placeholder='Github Username'
            name='githubusername'
            value={githubusername}
            onChange={onChange}
          />
          <small className='form-text'>
            If you want your latest repos and a Github link, include your
            username
          </small>
        </div>

        <div className='form-group'>
          <textarea
            name='bio'
            placeholder='A short bio of yourself'
            rows='10'
            value={bio}
            onChange={onChange}
          />
          <small className='form-text'>Tell us a little about yourself</small>
        </div>

        <div className='my-2'>
          <button
            onClick={() => toggleSocialInputs(!displaySocialInputs)}
            className='btn'
            type='button'
          >
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>
        {displaySocialInputs && (
          <Fragment>
            <div className='form-group social-input'>
              <i className='fab fa-twitter fa-2x'></i>
              <input
                type='text'
                placeholder='Twitter URL'
                name='twitter'
                value={twitter}
                onChange={onChange}
              />
            </div>
            <div className='form-group social-input'>
              <i className='fab fa-facebook fa-2x'></i>
              <input
                type='text'
                placeholder='Facebook URL'
                name='facebook'
                value={facebook}
                onChange={onChange}
              />
            </div>
            <div className='form-group social-input'>
              <i className='fab fa-youtube fa-2x'></i>
              <input
                type='text'
                placeholder='Youtube URL'
                name='youtube'
                value={youtube}
                onChange={onChange}
              />
            </div>
            <div className='form-group social-input'>
              <i className='fab fa-linkedin fa-2x'></i>
              <input
                type='text'
                placeholder='Linkedin URL'
                name='linkedin'
                value={linkedin}
                onChange={onChange}
              />
            </div>
            <div className='form-group social-input'>
              <i className='fab fa-instagram fa-2x'></i>
              <input
                type='text'
                placeholder='Instagram URL'
                name='instagram'
                value={instagram}
                onChange={onChange}
              />
            </div>
          </Fragment>
        )}
        <button type='submit' className='btn btn-primary my-1'>
          Submit
        </button>
        <Link to='/dashboard' className='btn my-1'>
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

EditProfile.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  createProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile, createProfile })(
  EditProfile
);
