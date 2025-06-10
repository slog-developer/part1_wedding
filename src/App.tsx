import { useEffect, useState } from 'react'
import classNames from 'classnames/bind'

import styles from './App.module.scss'

import FullScreenMessage from '@shared/FullScreenMessage'

import { Wedding } from '@models/wedding'

import Heading from '@components/sections/Heading'
import Video from '@components/sections/Video'
import Intro from '@components/sections/Intro'
import Invitation from '@components/sections/Invitation'
import ImageGallery from '@components/sections/ImageGallery'
import Calendar from '@components/sections/Calendar'
import Map from '@components/sections/Map'
import Contact from '@components/sections/Contact'
import Share from '@components/sections/Share'
import Modal from './components/shared/Modal'
import AttendCountModal from './components/AttendCountModal'
import { getWedding } from './api/wedding'
import useWedding from './hooks/useWedding'

const cx = classNames.bind(styles)

function App() {
  const { wedding, loading, error } = useWedding()

  if (loading) {
    return <FullScreenMessage type="loading" />
  }

  if (error) {
    return <FullScreenMessage type="error" />
  }

  if (wedding == null) {
    return null
  }

  const {
    date,
    galleryImages,
    groom,
    bride,
    location,
    message: { intro, invitation },
  } = wedding

  return (
    <div className={cx('container')}>
      <Heading date={date} />
      <Video />
      <Intro
        groomName={groom.name}
        brideName={bride.name}
        date={date}
        locationName={location.name}
        message={intro}
      />
      <Invitation message={invitation} />
      <ImageGallery images={galleryImages} />
      <Calendar date={date} />
      <Map location={location} />
      <Contact groom={groom} bride={bride} />
      <Share groomName={groom.name} brideName={bride.name} date={date} />

      <AttendCountModal wedding={wedding} />
    </div>
  )
}

export default App
