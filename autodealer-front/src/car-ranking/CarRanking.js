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
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

import { CONSTANTS } from '../common/constants';
import { carModelService } from '../service/CarModelService';
import { carBrandService } from '../service/CarBrandService';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  table: {
    minWidth: 500,
  },
}));

export default function AppCarRanking() {

  const classes = useStyles();
  const [brands, setBrands] = React.useState({})
  const [filters, setFilters] = React.useState({ monthlytraveldistance: null, periodinyears: null, fuelpriceineurperl: null });
  const [page, setContent] = React.useState({ contentList: [], page: 0, size: 5, totalelements: 1 });
  const [currentPage, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  if (Object.keys(brands).length === 0) {
    carBrandService.listAll()
      .then(result => {
        for (const brand of result.brandsList) {
          brands[brand.id] = brand.name;
        }
        setBrands(brands);
      })
      .catch(err => console.error(err));
  }

  const handleChangePage = (_, newPage) => {
    carModelService.ranking(newPage, rowsPerPage, filters.monthlytraveldistance, filters.periodinyears, filters.fuelpriceineurperl)
      .then(result => {
        setContent(result);
        setPage(result.page);
      })
      .catch(err => console.error(err));
  };

  const handleChangeRowsPerPage = (event) => {
    if (filters.monthlytraveldistance && filters.periodinyears && filters.fuelpriceineurperl) {
      carModelService.ranking(0, parseInt(event.target.value, 10), filters.monthlytraveldistance, filters.periodinyears, filters.fuelpriceineurperl)
        .then(result => {
          setContent(result);
          setRowsPerPage(result.size);
          setPage(0);
        })
        .catch(err => console.error(err));
    } else {
      setRowsPerPage(parseInt(event.target.value, 10));
    }
  };

  const filter = () => {
    if (filters.monthlytraveldistance && filters.periodinyears && filters.fuelpriceineurperl) {
      carModelService.ranking(currentPage, rowsPerPage, filters.monthlytraveldistance, filters.periodinyears, filters.fuelpriceineurperl)
        .then(result => {
          setContent(result);
          setPage(result.page);
          setRowsPerPage(result.size);
        })
        .catch(err => console.error(err));
    }
  };

  const handleMonthlyDistance = (event) => {
    setFilters({ monthlytraveldistance: event.target.value, periodinyears: filters.periodinyears, fuelpriceineurperl: filters.fuelpriceineurperl });
  };

  const handlePeriod = (event) => {
    setFilters({ monthlytraveldistance: filters.monthlytraveldistance, periodinyears: parseInt(event.target.value, 10), fuelpriceineurperl: filters.fuelpriceineurperl });
  };

  const handleFuelPrice = (event) => {
    setFilters({ monthlytraveldistance: filters.monthlytraveldistance, periodinyears: filters.periodinyears, fuelpriceineurperl: event.target.value });
  };

  return (
    <Card>
      <Typography gutterBottom variant="h5" component="h2" style={{ textAlign: 'left', paddingLeft: '1em' }}>
        Car Ranking Suggestions
      </Typography>
      <div>
        <TextField label="Monthly Traveled Distance" type="number" style={{width: 200, marginRight: '1em' }} onChange={handleMonthlyDistance}/>
        <TextField label="Period In Years" type="number" style={{ marginRight: '1em' }} onChange={handlePeriod}/>
        <TextField label="Fuel Price (€)" type="number" onChange={handleFuelPrice}/>
        <IconButton variant="contained" color="primary" onClick={filter}>
          <SearchIcon />
        </IconButton>
      </div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Make</TableCell>
              <TableCell align="right">Version</TableCell>
              <TableCell align="right">Year</TableCell>
              <TableCell align="right">Price (€)</TableCell>
              <TableCell align="right">Fuel Type</TableCell>
              <TableCell align="right">Fuel Consumption (Km/L)</TableCell>
              <TableCell align="right">Annual Maintenance Cost (€)</TableCell>
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
              <TableCell colSpan={4}></TableCell> {/* added to display pagination on the right side, just like the other pages */}
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