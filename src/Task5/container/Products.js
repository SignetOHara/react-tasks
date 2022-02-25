import { useState, useMemo } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { ProductList } from '../components/ProductList';
import { Sidebar } from '../components/Sidebar';
import fullData from '../products.json';

export const Products = ({ data, handleData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sortedBy, setSortedBy] = useState('');
  const [sortConfig, setSortConfig] = useState('');
  const [allExcept, setAllExcept] = useState({
    category: false,
    manufacturer: false,
  });
  const [error, setError] = useState({
    openSnackbar: false,
    message: '',
  });

  // SIDEDRAWER
  const toggleDrawerHandler = () => {
    setIsOpen((prev) => !prev);
  };

  // SNACKBAR
  const closeSnackHandler = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setError({
      openSnackbar: false,
      message: '',
    });
  };

  // INFO
  const totalQty = data.length;

  const totalCost = useMemo(() => {
    return data
      .map((product) => product.price)
      .reduce((prev, curr) => prev + curr, 0)
      .toFixed(2);
  }, [data]);

  const avgPrice = useMemo(() => {
    return (totalCost / totalQty).toFixed(2);
  }, [totalCost, totalQty]);

  const expensivePrice = useMemo(() => {
    return Math.max(...data.map((product) => product.price));
  }, [data]);

  const expensiveName = useMemo(() => {
    return data.find((product) => product.price === expensivePrice);
  }, [data, expensivePrice]);

  const cheapestPrice = useMemo(() => {
    return Math.min(...data.map((product) => product.price));
  }, [data]);

  const cheapestName = useMemo(() => {
    return data.find((product) => product.price === cheapestPrice);
  }, [data, cheapestPrice]);

  // FILTER LOGIC
  const filters = (filters) => {
    let filtered;

    if (allExcept.category && allExcept.manufacturer) {
      filtered = fullData.filter(
        (product) =>
          !filters.includes(product.category) &&
          !filters.includes(product.manufacturer)
      );
    } else if (allExcept.category && !allExcept.manufacturer) {
      filtered = fullData.filter(
        (product) =>
          !filters.includes(product.category) &&
          filters.includes(product.manufacturer)
      );
    } else if (!allExcept.category && allExcept.manufacturer) {
      filtered = fullData.filter(
        (product) =>
          filters.includes(product.category) &&
          !filters.includes(product.manufacturer)
      );
    } else {
      filtered = fullData.filter(
        (product) =>
          filters.includes(product.category) &&
          filters.includes(product.manufacturer)
      );
    }

    if (filters.length === 0) {
      filtered = fullData;
    }

    if (minPrice) {
      if (minPrice > expensivePrice) {
        setError({
          openSnackbar: true,
          message: 'Maximum Price is set lower than the cheapest product',
        });
      } else {
        filtered = filtered.filter((product) => product.price >= minPrice);
      }
    }

    if (maxPrice) {
      if (maxPrice < cheapestPrice) {
        setError({
          openSnackbar: true,
          message: 'Maximum Price is set lower than the cheapest product',
        });
      } else {
        filtered = filtered.filter((product) => product.price <= maxPrice);
      }
    }

    if (filtered.length === 0) {
      setError({
        openSnackbar: true,
        message: 'No Products meet your requirements!',
      });
    }

    handleData(filtered);
  };

  const reset = () => {
    handleData();
    setAllExcept({
      category: false,
      manufacturer: false,
    });
  };

  const toggleExcept = (type) => {
    if (type === 'category') {
      setAllExcept((prevState) => ({
        ...prevState,
        category: !prevState.category,
      }));
    } else {
      setAllExcept((prevState) => ({
        ...prevState,
        manufacturer: !prevState.manufacturer,
      }));
    }
  };

  const info = {
    totalQty,
    totalCost,
    avgPrice,
    expensivePrice,
    expensiveName,
    cheapestPrice,
    cheapestName,
  };

  // SORT LOGIC

  const sortHandler = (e) => {
    let target = e.currentTarget.id;
    let coefficient = 1;

    if (!sortConfig || sortConfig === 'descending' || target !== sortedBy) {
      setSortConfig('ascending');
    } else {
      setSortConfig('descending');
      coefficient = -1;
    }

    setSortedBy(target);

    if (target === 'production-date') {
      data.sort((a, b) => {
        let firstDate = new Date(a.productionDate);
        let secondDate = new Date(b.productionDate);

        if (firstDate.getTime() < secondDate.getTime()) {
          return -1 * coefficient;
        }
        if (firstDate.getTime() > secondDate.getTime()) {
          return 1 * coefficient;
        }
        return 0;
      });
    } else {
      data.sort((a, b) => {
        if (a[target] > b[target]) {
          return 1 * coefficient;
        }
        if (a[target] < b[target]) {
          return -1 * coefficient;
        }
        return 0;
      });
    }
    handleData(data);
  };

  return (
    <>
      {data.length === 0 ? (
        <>
          <Box>Table empty!</Box>
          <Button sx={{ m: 1 }} variant="contained" onClick={reset}>
            Reset
          </Button>
        </>
      ) : (
        <>
          <Sidebar
            data={data}
            isOpen={isOpen}
            toggleDrawerHandler={toggleDrawerHandler}
            reset={reset}
            toggleExcept={toggleExcept}
            allExcept={allExcept}
            filters={filters}
            minPrice={minPrice}
            setMinPrice={setMinPrice}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
          />
          <ProductList
            data={data}
            info={info}
            toggleDrawerHandler={toggleDrawerHandler}
            sortHandler={sortHandler}
          />
        </>
      )}
      <Snackbar
        open={error.openSnackbar}
        autoHideDuration={6000}
        onClose={closeSnackHandler}
      >
        <Alert
          onClose={closeSnackHandler}
          severity="error"
          sx={{ width: '100%' }}
        >
          {error.message}
        </Alert>
      </Snackbar>
    </>
  );
};
