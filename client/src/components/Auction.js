import React, { useEffect, useState } from 'react';

import { fetchData, formatDate } from '../utils/helpers';

import { Bids } from './Bids';
import { Alert } from './Alert';
import { Form } from './Form';


export const Auction = () => {
  const [auction, setAuction] = useState({});
  const [bids, setBids] = useState([]);
  const [data, setData] = useState({});
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('success');

  useEffect(() => {
    const getData = async () => {
      if (data.fetched !== true) {
        const data = await fetchData('http://localhost:8080/api/auctions/1/get');

        data.fetched = true;
        setAuction(data.auction);
        setBids(data.bids);
        setData(data);
      }
    };

    getData();
  }, []);

  return (
    <>
      <div className="auction">

        {message && (
          <>
            <Alert message={message} messageType={messageType} />
          </>
        )}
        {auction && (
          <>
            <section className="auction-details container">
              <h1>Auction: {auction.name}</h1>
              <h4>{formatDate(auction.startDate)} to {formatDate(auction.endDate)}</h4>
              <img alt={auction.name} title={auction.name} src={auction.image} />
            </section>
          </>
        )}
        {data.fetched && (
          <>
            <section className="bids container">
              <Bids bids={bids} />
            </section>
          </>
        )}
        {data.fetched && (
          <>
            <Form bids={bids} setBids={setBids} setMessage={setMessage} setMessageType={setMessageType} />
          </>
        )}


      </div>
    </>
  );
};
