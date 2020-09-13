import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar';
import AssessmentIcon from '@material-ui/icons/Assessment';
import HomeIcon from '@material-ui/icons/Home';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import AppHome from './home/Home';
import AppCarManagement from './car-management/CarManagement';
import AppCarRanking from './car-ranking/CarRanking';

const useStyles = makeStyles((theme) => ({
  root: {
    'text-align': 'center',
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  list: {
    width: 250,
  },
}));

function App() {
  const classes = useStyles();

  const [state, setState] = React.useState({
    menuOpen: false
  });

  const toggleDrawer = (menuOpen) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, menuOpen });
  };

  const menuList = () => (
      <div
        className={clsx(classes.list)}
        role="presentation"
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
      >
        <List>
          <ListItem>
              <ListItemText primary='Menu' />
          </ListItem>
          <Link to="/">
            <ListItem button key='Home'>
                <ListItemIcon><HomeIcon /></ListItemIcon>
                <ListItemText primary='Home' />
            </ListItem>
          </Link>
          <Divider />
          <Link to="/car-management">
            <ListItem button key='Car Management'>
                <ListItemIcon><DirectionsCarIcon /></ListItemIcon>
                <ListItemText primary='Car Management' />
            </ListItem>
          </Link>
          <Divider />
          <Link to="/car-suggestions">
            <ListItem button key='Car Suggestions'>
                <ListItemIcon><AssessmentIcon /></ListItemIcon>
                <ListItemText primary='Car Suggestions' />
            </ListItem>
          </Link>
        </List>
      </div>
  );

  return (
    <div className={classes.root}>
      <Router>
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              TITLE
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer anchor='left' open={state.menuOpen} onClose={toggleDrawer(false)}>
          {menuList()}
        </Drawer>
        <Switch>
          <Route path="/car-management">
            <AppCarManagement />
          </Route>
          <Route path="/car-suggestions">
            <AppCarRanking />
          </Route>
          <Route path="/">
            <AppHome />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
