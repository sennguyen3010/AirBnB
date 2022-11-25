import React from 'react';

const loadingGif = require('../../assets/img/loading8.gif');

type Props = {};

export default function Loading({}: Props) {
  return (
    <div className="loading">
      <img src={loadingGif} alt="loading..." />
    </div>
  );
}
