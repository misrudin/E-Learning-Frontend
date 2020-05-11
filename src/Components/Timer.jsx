import React, { useState, useEffect } from "react";

const Timer = ({ batas }) => {
  const [detik, setDetik] = useState(59);
  const [menit, setMenit] = useState(1);

  useEffect(() => {
    const hitung = () => {
      let detik2 = 59;
      setInterval(() => {
        detik2--;
        if (detik2 < 0) {
          detik2 = 59;
          let menit2 = menit - 1;
          setMenit(menit2);
          if (menit2 <= 0 && detik2 <= 0) {
            clearInterval(hitung);
          }
        }
        setDetik(detik2);
      }, 1000);
    };
    hitung();
  }, [menit]);

  useEffect(() => {
    localStorage.setItem("Last", batas);
  }, [batas]);

  return (
    <div>
      <p>
        {menit} : {detik}
      </p>
    </div>
  );
};

export default Timer;
