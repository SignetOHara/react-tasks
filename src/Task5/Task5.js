import { useState } from 'react';
import { Products } from './container/Products';
import data from './products.json';

export const Task5 = () => {
  const INITDATA = data;
  const [displayData, setDisplayData] = useState(INITDATA);

  const handleData = (data = INITDATA) => {
    setDisplayData(data);
  };

  return (
    <>
      {displayData && <Products data={displayData} handleData={handleData} />}
    </>
  );
};
