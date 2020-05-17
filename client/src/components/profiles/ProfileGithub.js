import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getRepos } from '../../redux/actions/profile';
import Spinner from '../layout/Spinner';

const ProfileGithub = ({ username, getRepos, profile: { repos, loading } }) => {
  useEffect(() => {
    getRepos(username);
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className='profile-github'>
      <h2 className='text-primary my-1'>
        <i className='fab fa-github'></i> Github Repos
      </h2>
      {repos &&
        repos.length > 0 &&
        repos.map((repo) => (
          <div key={repo.id} className='repo bg-whitee my-1 p-1'>
            <div>
              <h4>
                <a
                  href={repo.html_url}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  {repo.name}
                </a>
              </h4>
              <p>{repo.description}</p>
            </div>
            <div>
              <ul>
                <li className='badge badge-primary'>
                  Stars: {repo.stargazers_count}
                </li>
                <li className='badge badge-dark'>
                  Watchers: {repo.watchers_count}
                </li>
                <li className='badge'>Forks: {repo.forks_count}</li>
              </ul>
            </div>
          </div>
        ))}
    </div>
  );
};

ProfileGithub.propTypes = {
  username: PropTypes.string.isRequired,
  getRepos: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getRepos })(ProfileGithub);
