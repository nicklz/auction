import React from 'react';
import { uid } from 'react-uid';
import { formatMoney } from '../utils/helpers';

// I hardcode the users like before

export const Bids = ({ bids }) => {
  let defaultAmount = 0;
  if (bids.length > 0) {
    let lastBid = bids.at(-1)
    defaultAmount = lastBid.amount
  }
  return (
    <>
      <h1>Highest bid: {formatMoney(defaultAmount)}</h1>
      <ul>
        {bids.map((item, index) => {
          return (<li key={uid(index)}>{formatMoney(item.amount)}  by {item.userId === 1 ? 'Bob' : 'Larry'}</li>);
        })}
      </ul>
    </>
  );
};
