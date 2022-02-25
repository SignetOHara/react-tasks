import { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import data from '../products.json';

export const Sidebar = ({
  isOpen,
  toggleDrawerHandler,
  reset,
  filters,
  toggleExcept,
  allExcept,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
}) => {
  const [checked, setChecked] = useState([]);

  const catMapped = data.map((product) => product.category);
  const filteredCats = catMapped.filter(
    (category, index) => catMapped.indexOf(category) === index
  );

  const manMapped = data.map((product) => product.manufacturer);
  const filteredMans = manMapped.filter(
    (manufacturer, index) => manMapped.indexOf(manufacturer) === index
  );

  const checkboxHandler = (e) => {
    let updatedList = [...checked];
    if (e.target.checked) {
      updatedList = [...checked, e.target.value];
    } else {
      updatedList.splice(checked.indexOf(e.target.value), 1);
    }
    setChecked(updatedList);
  };

  const exceptHandler = (type) => {
    if (type === 'category') {
      toggleExcept('category');
    } else {
      toggleExcept('manufacturer');
    }
  };

  const priceHandler = (e, type) => {
    if (type === 'min-price') {
      setMinPrice(e.target.value);
    } else {
      setMaxPrice(e.target.value);
    }
  };

  const resetHandler = () => {
    reset();
    toggleDrawerHandler();
    setMinPrice('');
    setMaxPrice('');
    setChecked([]);
  };

  const applyHandler = () => {
    filters(checked);
    toggleDrawerHandler();
  };

  return (
    <Drawer open={isOpen} onClose={toggleDrawerHandler}>
      <Box sx={{ m: 10 }}>
        <FormGroup>
          {filteredCats.map((category, idx) => (
            <FormControlLabel
              key={idx}
              control={
                <Checkbox
                  checked={checked.includes(category)}
                  onChange={(e) => checkboxHandler(e)}
                  value={category}
                />
              }
              label={category}
            />
          ))}
          <FormControlLabel
            control={<Checkbox />}
            label="All Except"
            onChange={() => exceptHandler('category')}
            checked={allExcept.category}
          />
        </FormGroup>
        <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor="min-price-amount">Min Price</InputLabel>
          <OutlinedInput
            id="min-price-amount"
            value={minPrice}
            onChange={(e) => priceHandler(e, 'min-price')}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            label="Min Price"
            type="number"
          />
        </FormControl>
        <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor="max-price-amount">Max Price</InputLabel>
          <OutlinedInput
            id="max-price-amount"
            value={maxPrice}
            onChange={(e) => priceHandler(e, 'max-price')}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            label="Max Price"
            type="number"
          />
        </FormControl>
        <FormGroup>
          {filteredMans.map((manufacturer, idx) => (
            <FormControlLabel
              key={idx}
              control={
                <Checkbox
                  checked={checked.includes(manufacturer)}
                  onChange={(e) => checkboxHandler(e)}
                  value={manufacturer}
                />
              }
              label={manufacturer}
            />
          ))}
          <FormControlLabel
            control={<Checkbox />}
            label="All Except"
            onChange={exceptHandler}
            checked={allExcept.manufacturer}
          />
        </FormGroup>
        <Button sx={{ m: 2 }} variant="contained" onClick={applyHandler}>
          Apply
        </Button>
        <Button
          sx={{ m: 2 }}
          variant="outlined"
          color="warning"
          onClick={resetHandler}
        >
          Reset
        </Button>
      </Box>
    </Drawer>
  );
};
