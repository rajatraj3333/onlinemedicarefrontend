import { all } from "axios";
import { func, number } from "joi";
import React, { useState } from "react";

function PrimeNumber({ number }) {
  let allprimenumber = [];
  let numberlist = [];
  for (let i = 1; i < number; i++) {
    numberlist.push(i);

   
  }


  for (let j = 2; j <= number-1; j++) {
    if (j % number === 0 ) {
    } else {
        allprimenumber.push(j)
    }
  }

  return <>{allprimenumber}</>;
}

function Interview() {
  return <PrimeNumber number={22} />;
}

export default Interview;
