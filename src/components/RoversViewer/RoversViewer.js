// Здесь вам нужно реализовать вью

// Подключите его к редакс роутеру
// Вам потребуются селекторы для получения выбранного сола
// и списка фотографий

// Так же вы будете диспатчить экшены CHANGE_SOL и FETCH_PHOTOS_REQUEST
// Эти экшены находятся в модуле ROVER PHOTOS
import React, { Component } from 'react';
import SelectSol from '../SelectSol';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import RoverPhotos, {changeSol, fetchPhotosRequest,getSol} from '../../modules/RoverPhotos';
import { connect } from 'react-redux';

class RoversViews extends Component{
  state = {
    sol: {}
  };
  getSolOnSlider = (sol)=>{
    const { changeSol, fetchPhotosRequest } = this.props;
    changeSol(sol);
    fetchPhotosRequest(sol);

  };
  render() {
    const { getCurrentSol } = this.props;


    return(
      <>
        <SelectSol changeSol={this.getSolOnSlider}/>
       {/* <RoverPhotos/>*/}

      </>
    )
  }
}
//state => ({ getCurrentSol: getSol(state) })
export default connect(
  state => state,
  { changeSol, fetchPhotosRequest }
)(RoversViews);