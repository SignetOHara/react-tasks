import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

export const ProductList = ({
  data,
  info,
  toggleDrawerHandler,
  sortHandler,
}) => {
  return (
    <Box border="1px solid #b8b8b8">
      <Button onClick={toggleDrawerHandler} sx={{ m: 2 }} variant="contained">
        Options
      </Button>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <Grid item>
          <Typography>Total Quantity: {info.totalQty}</Typography>
        </Grid>
        <Grid item>
          <Typography>Total Cost: ${info.totalCost}</Typography>
        </Grid>
        <Grid item>
          <Typography>Average Price: ${info.avgPrice}</Typography>
        </Grid>
        <Grid item>
          <Typography>
            Most Expensive Product: {info.expensiveName.name} - $
            {info.expensivePrice}
          </Typography>
        </Grid>
        <Grid item sx={{ mb: 2 }}>
          <Typography>
            Cheapest Product: {info.cheapestName.name} - ${info.cheapestPrice}
          </Typography>
        </Grid>
      </Grid>
      <TableContainer component={Paper}>
        <Table size="medium">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#e0e0e0' }}>
              <TableCell
                align="center"
                sx={{ padding: '1rem 0', cursor: 'pointer' }}
                onClick={sortHandler}
                id="id"
              >
                #
              </TableCell>
              <TableCell
                align="center"
                sx={{ padding: '1rem 0', cursor: 'pointer' }}
                onClick={sortHandler}
                id="name"
              >
                Name
              </TableCell>
              <TableCell
                align="center"
                sx={{ padding: '1rem 0', cursor: 'pointer' }}
                onClick={sortHandler}
                id="category"
              >
                Category
              </TableCell>
              <TableCell
                align="center"
                sx={{ padding: '1rem 0', cursor: 'pointer' }}
                onClick={sortHandler}
                id="price"
              >
                Price ($)
              </TableCell>
              <TableCell
                align="center"
                sx={{ padding: '1rem 0', cursor: 'pointer' }}
                onClick={sortHandler}
                id="manufacturer"
              >
                Manufacturer
              </TableCell>
              <TableCell
                align="center"
                sx={{ padding: '1rem 0', cursor: 'pointer' }}
                onClick={sortHandler}
                id="production-date"
              >
                Production Date
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.map((product) => (
                <TableRow key={product.id}>
                  <TableCell align="center">{product.id}</TableCell>
                  <TableCell align="center">{product.name}</TableCell>
                  <TableCell align="center">{product.category}</TableCell>
                  <TableCell align="center">{product.price}</TableCell>
                  <TableCell align="center">{product.manufacturer}</TableCell>
                  <TableCell align="center">{product.productionDate}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
