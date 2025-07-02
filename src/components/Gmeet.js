import React, { useState, useEffect } from 'react';

const GoogleMeetApp = () => {
      const handleCreateMeet = async () => {
        const res = await fetch('https://omcbackend.onrender.com/api/gmeet/auth/url');
        const { url } = await res.json();
        console.log(url);
        window.location.href = url;
      };
   return (
    <div style={{ padding: 20 }}>
      <h1>Google Meet Generator</h1>
      <button onClick={handleCreateMeet}>Create Google Meet</button>
   
    </div>
  );
};

export default GoogleMeetApp;
