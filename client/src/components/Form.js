import React, { useState } from 'react';
import { postData, formatMoney } from '../utils/helpers';

export const Form = ({ setBids, bids, setMessage, setMessageType }) => {
  let defaultAmount = 0;
  if (bids.length > 0) {
    let lastBid = bids.at(-1)
    defaultAmount = lastBid.amount + 1
  }

  const [amount, setAmount] = useState(defaultAmount);
  // Beacuse I'm not setting up any kind of user auth system lets just hardcode the user stuff
  const [user, setUser] = useState(1);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Actually - lets limit them to a billion
    if (amount < 1000000000) {
      const endpoint = 'http://localhost:6868/api/auctions/1/bid'

      const post = {
        userId: user,
        amount: amount,
      }

      const response = await postData(endpoint, post)
      if (response.error) {
        setMessage(response.error)
        setMessageType('error')
      }
      else {
        bids.push(response)
        setBids(bids)
        setAmount(response.amount)
        setMessage(`Bid for ${formatMoney(response.amount)} accepted!`)
        setMessageType('success')
      }
    }
    else {
      setMessage("Woah let's keep it under 1 billion")
      setMessageType('error')
    }
  }

  return (
    <>
      <form className="bidder-form" onSubmit={handleSubmit}>
        <label>Enter your bid:
          <input
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </label>
        <select defaultValue={user.userId} onChange={(e) => setUser(e.target.value)}>
          {
            // Again hardcoding these 
          }
          <option value="1">Bob</option>
          <option value="2">Larry</option>
        </select>
        <input type="submit" />
      </form>
    </>
  );
};
