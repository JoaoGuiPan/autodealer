import React from 'react';
import { Link } from "react-router-dom";

import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar';
import AssessmentIcon from '@material-ui/icons/Assessment';
import HomeIcon from '@material-ui/icons/Home';

export default function AppSideMenu() {
  return (
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
  );
}