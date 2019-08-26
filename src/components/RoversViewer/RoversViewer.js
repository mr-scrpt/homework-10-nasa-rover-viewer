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
import RoverPhotos, {changeSol, fetchPhotosRequest, getSol, getRovers} from '../../modules/RoverPhotos';
import { connect } from 'react-redux';
import {getIsAuthorized} from '../../modules/Auth';


class RoversViews extends PureComponent{

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { getSol, getRoversList, fetchPhotosRequest, isAuthorized} = this.props;

    if (prevProps.getSol.currency !== getSol.currency){
      const roverList = getRoversList;
      const currentSol = getSol.currency;
      const renderList = roverList && roverList.map(rover=>{
        return fetchPhotosRequest({key: isAuthorized, name: rover, sol: currentSol});
      });
      console.log(renderList);
    }

  }

  getSolOnSlider = (sol)=>{
    const { changeSol } = this.props;
    changeSol(sol);

  };


  render() {
    //const { getCurrentSol } = this.props;
    //const { getSol, getRoversList, fetchPhotosRequest, isAuthorized} = this.props;
    //const roverList = getRoversList;
    //const currentSol = getSol.currency;

    return(
      <>
        <SelectSol changeSol={this.getSolOnSlider}/>
        {/*{roverList && roverList.map(rover=>{
            fetchPhotosRequest({key: isAuthorized, name: rover, sol: currentSol});

          return(
            <div>222</div>
          )
        })}*/}
        {/*<RoverPhotos/>*/}

      </>
    )
  }
}
//state => ({ getCurrentSol: getSol(state) })
export default connect(
  state => ({
    getRoversList: getRovers(state),
    getSol: getSol(state),
    isAuthorized: getIsAuthorized(state)

  }),
  { changeSol, fetchPhotosRequest }
)(RoversViews);

