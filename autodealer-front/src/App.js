import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import AppSideMenu from './side-menu/SideMenu';
import AppBrandManagement from './brand-management/BrandManagement';
import AppCarManagement from './car-management/CarManagement';
import AppCarRanking from './car-ranking/CarRanking';
import AppHome from './home/Home';

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
  container: {
    padding: '2em'
  }
}));

function App() {
  const classes = useStyles();

  const [state, setState] = React.useState({
    menuOpen: false,
    title: 'Car Management Web App'
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
      <AppSideMenu></AppSideMenu>
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
              {state.title}
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer anchor='left' open={state.menuOpen} onClose={toggleDrawer(false)}>
          {menuList()}
        </Drawer>
        <Switch>
          <div className={classes.container}>
            <Route exact path="/brand-management">
              <AppBrandManagement />
            </Route>
            <Route exact path="/car-management">
              <AppCarManagement />
            </Route>
            <Route exact path="/car-suggestions">
              <AppCarRanking />
            </Route>
            <Route exact path="/">
              <AppHome />
            </Route>
          </div>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
