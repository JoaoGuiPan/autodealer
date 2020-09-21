import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';

import { CONSTANTS } from '../common/constants';
import { carModelService } from '../service/CarModelService';
import { carBrandService } from '../service/CarBrandService';

const useStyles = makeStyles({
  table: {
    minWidth: 500,
  },
});

export default function AppCarRanking() {

  const classes = useStyles();
  const [brands, setBrands] = React.useState({})
  const [page, setContent] = React.useState({ contentList: [], page: 0, size: 5, totalelements: 1 });
  const [currentPage, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  carBrandService.listAll()
    .then(result => {
      for (const brand of result.brandsList) {
        brands[brand.id] = brand.name;
      }
      setBrands(brands);
    })
    .catch(err => console.error(err));

  const handleChangePage = (event, newPage) => {
    carModelService.search(newPage, rowsPerPage)
      .then(result => {
        setContent(result);
        setPage(result.page);
      })
      .catch(err => console.error(err));
  };

  const handleChangeRowsPerPage = (event) => {
    carModelService.search(0, parseInt(event.target.value, 10))
      .then(result => {
        setContent(result);
        setRowsPerPage(result.size);
        setPage(0);
      })
      .catch(err => console.error(err));
  };

  return (
    <Card>
      <Typography gutterBottom variant="h5" component="h2" style={{ textAlign: 'left', paddingLeft: '1em' }}>
        Car Ranking Suggestions
      </Typography>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Make</TableCell>
              <TableCell align="right">Version</TableCell>
              <TableCell align="right">Year</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Fuel Type</TableCell>
              <TableCell align="right">Fuel Consumption (Km/L)</TableCell>
              <TableCell align="right">Annual Maintenance Cost</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {page.contentList.map(row => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right" style={{ width: 160 }}>
                  {brands[row.brand]}
                </TableCell>
                <TableCell align="right" style={{ width: 160 }}>
                  {row.version}
                </TableCell>
                <TableCell align="right" style={{ width: 160 }}>
                  {row.year}
                </TableCell>
                <TableCell align="right" style={{ width: 160 }}>
                  {row.price}
                </TableCell>
                <TableCell align="right" style={{ width: 160 }}>
                  {CONSTANTS.fuelTypes[row.fueltype]}
                </TableCell>
                <TableCell align="right" style={{ width: 160 }}>
                  {row.fuelconsumptionkmperl}
                </TableCell>
                <TableCell align="right" style={{ width: 160 }}>
                  {row.annualmaintenancecost}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={4}></TableCell>
              <TablePagination
                rowsPerPageOptions={[5, 10, 20]}
                colSpan={4}
                count={page.totalelements}
                rowsPerPage={rowsPerPage}
                page={currentPage}
                SelectProps={{
                  inputProps: { 'aria-label': 'rows per page' },
                  native: true,
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Card>
  );
}