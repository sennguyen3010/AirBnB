import React from 'react'
import LocationCards from './LocationCards'
import OptionTabs from './OptionTabs'

type Props = {}

export default function Home({}: Props) {
  return (
    <div className="container">
      <OptionTabs></OptionTabs>
      <LocationCards></LocationCards>
    </div>
  )
}