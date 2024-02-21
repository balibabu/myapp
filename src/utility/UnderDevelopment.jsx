import React from 'react'

export default function UnderDevelopment() {
  return (
    <div style={{ backgroundColor: 'grey' }}>
      <div style={{ height: '2rem' }}
        className="progress" role="progressbar" aria-label="Info striped example" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">
        <div className="fs-3 progress-bar progress-bar-striped progress-bar-animated" style={{ width: '100%' }}>UnderDevelopment</div>
      </div>
      <img style={{ width: '100vw' }}
        src="https://www.sardonyx.in/themes/images/software-development/sardonyx-softwaredevelopment001.gif" alt="" />
    </div>
  )
}
