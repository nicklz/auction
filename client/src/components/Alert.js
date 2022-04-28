import React from 'react';

export const Alert = ({ message, messageType }) => {
  return (
    <>
      <div className={`alert ${messageType}`}>
        {message}
      </div>
    </>
  );
};
