// Здесь вам нужно реализовать вью

// Подключите его к редакс роутеру
// Вам потребуются селекторы для получения выбранного сола
// и списка фотографий

// Так же вы будете диспатчить экшены CHANGE_SOL и FETCH_PHOTOS_REQUEST
// Эти экшены находятся в модуле ROVER PHOTOS
import React, { PureComponent} from 'react';
import SelectSol from '../SelectSol';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';

import Grid from '@material-ui/core/Grid';

import {changeSol, fetchPhotosRequest, getSol, getRovers, getPhotos} from '../../modules/RoverPhotos';
import { connect } from 'react-redux';
import {getIsAuthorized} from '../../modules/Auth';
import RoverPhotos from '../RoverPhotos';
import classes from './RoversViewer.module.css';



class RoversViews extends PureComponent{
  componentDidMount() {
    const { getSol, getRoversList, fetchPhotosRequest, isAuthorized} = this.props;
    const roverList = getRoversList;
    const currentSol = getSol.currency;
    roverList && roverList.forEach(rover=>{
      fetchPhotosRequest({key: isAuthorized, name: rover, sol: currentSol});
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { getSol, getRoversList, fetchPhotosRequest, isAuthorized} = this.props;

    if (prevProps.getSol.currency !== getSol.currency){
      const roverList = getRoversList;
      const currentSol = getSol.currency;
      roverList && roverList.forEach(rover=>{
        fetchPhotosRequest({key: isAuthorized, name: rover, sol: currentSol});
      });
    }
  }

  getSolOnSlider = (sol)=>{
    const { changeSol } = this.props;
    changeSol(sol);

  };


  render() {

    const { getRoversList, getSol, getRoverPhotos} = this.props;
    const currentSol = getSol.currency;
    const roverList = getRoversList;


    return(
        <Grid container justify="center" className={classes.root}>
          <SelectSol changeSol={this.getSolOnSlider} selectedSol={currentSol}/>
          <Grid container alignItems="flex-start" justify="space-between">
            {roverList && roverList.map(rover=>(

              <RoverPhotos key={rover}
                           name={rover}
                           photos={getRoverPhotos(rover, currentSol)} />
            ))}
          </Grid>
        </Grid>
    )
  }
}
//state => ({ getCurrentSol: getSol(state) })
export default connect(
  state => ({
    getRoversList: getRovers(state),
    getSol: getSol(state),
    isAuthorized: getIsAuthorized(state),
    getRoverPhotos: (name, sol) => getPhotos(state, name, sol),
    getCurrentPhoto: getPhotos(state)

  }),
  { changeSol, fetchPhotosRequest }
)(RoversViews);

