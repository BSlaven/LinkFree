import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ProgressBar } from 'primereact/progressbar'
import { Skeleton } from 'primereact/skeleton'

import Profile from './Profile'
import Links from './Links'
import Milestones from './Milestones'

function Socials() {
  const [showProgress, setShowProgress] = useState(true)
  const { username } = useParams()
  const [profile, setProfile] = useState()

  useEffect(() => {
    fetch(`/data/${username}.json`)
      .then((response) => response.json())
      .then((data) => setProfile(data))
      .catch((error) => console.log('Socials useEffect', error))
      .finally(() => setShowProgress(false))
  }, [username])

  if (!profile) {
    return (
      <div className="p-text-center">
        <div className="flex-column">
          <img
            src="/eddiehub_community_logo.webp"
            alt="image"
            style={{ width: '150px' }}
          />
          <h1>Profile not found.</h1>
          <h1>
            If you are a new user, please consider registering at LinkFree.
          </h1>
          <h2>
            Read the documendation{' '}
            <Link
              to={{
                pathname:
                  'https://github.com/EddieHubCommunity/LinkFree#readme',
              }}
              target="_blank"
              rel="noreferrer"
            >
              here
            </Link>
            .
          </h2>
        </div>
      </div>
    )
  } else {
    return (
      <main>
        {showProgress && <ProgressBar mode="indeterminate" />}
        <>
          <Link to="/" aria-label="Go back to Home">
            <i className="pi pi-arrow-left"></i>
          </Link>
          <Profile isLoading={showProgress} profile={profile} />
          {profile.links && !showProgress
            ? <Links links={profile.links} />
            : <div className="p-d-flex p-jc-center p-mt-4 p-mb-4">
              <Skeleton shape="rounded" height="50px" width="45rem" /></div>}
        </>
        {profile.milestones && <Milestones milestones={profile.milestones} />}
      </main>
    )
  }
}

export default Socials
