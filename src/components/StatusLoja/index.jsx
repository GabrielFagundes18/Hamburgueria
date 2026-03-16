import React, { useState, useEffect } from 'react';
import { checkStoreStatus } from '../../utils/storeStatus';
import './style.css';

const StatusLoja = () => {
  const [status, setStatus] = useState(checkStoreStatus());

  useEffect(() => {
    const intervalo = setInterval(() => {
      setStatus(checkStoreStatus());
    }, 30000); 
    return () => clearInterval(intervalo);
  }, []);

  return (
    <div className={`status-container ${status.isOpen ? 'open' : 'closed'}`}>
      <span className={`dot ${status.isOpen ? 'pulse' : ''}`}></span>
      {status.message}
    </div>
  );
};

export default StatusLoja; 