import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import asyncGetGalleryList from '../../actions/asyncGetGalleryList.js';
import GalleryFilter from './GalleryFilter.js';
import GalleryListPosts from './GalleryListPosts.js';
import Loader from '../Loader.js';
import BackToTop from '../BackToTop.js';
import onClickButtonToTop from '../../helpers/buttonToTop.js';
import './styles/gallery.css';

class Gallery extends Component {
   constructor(props){
      super(props);
      this.state = {
         section: 'hot',
         sort: 'viral',
         page: 0,
         period: 'day',
         loader: false,
         buttonBackTop: false
      }

      this.onChangeSelect = this.onChangeSelect.bind(this);
      this.getGallery = this.getGallery.bind(this);
      this.infinityScrolling = this.infinityScrolling.bind(this);
   }
   getGallery(section, sort, page, period) {
      let { getGalleryList } = this.props;
      getGalleryList(
         section, 
         sort, 
         page, 
         period
      );
   }
   componentWillMount(){
      let { section, sort, page, period } = this.state;
      this.getGallery(section, sort, page, period);
      window.addEventListener("scroll", this.infinityScrolling);
   }
   componentWillUnmount() {
      window.removeEventListener("scroll", this.infinityScrolling);
   }
   componentWillUpdate(nextProps, nextState) {
      if (JSON.stringify(nextState) !== JSON.stringify(this.state)) {
         let { section, sort, page, period } = nextState;
         this.getGallery(section, sort, page, period);
      } 
      if (JSON.stringify(nextProps.galleryList) !== JSON.stringify(this.props.galleryList)) {
            this.setState({
               loader: false
            });
      }
   } 
   onChangeSelect(value, {_owner}){
      let type = _owner.memoizedProps.type;
      if (type === 'section') {
         this.setState({
            section: value.toLowerCase(),
            page: 0
         });
      } else if (type === 'sort') {
         this.setState({
            sort: value.toLowerCase(),
            page: 0
         });
      } else if (type === 'period') {
         this.setState({
            period: value.toLowerCase(),
            page: 0
         });
      }   
   }
   infinityScrolling() {
      let scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
      let scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;
      let clientHeight = document.documentElement.clientHeight || window.innerHeight;
      let scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;
      
      if ( scrollTop > 500 ) {
         this.setState({
            buttonBackTop: true
         });
      } else if (scrollTop < 10 ) {
         this.setState({
            buttonBackTop: false
         });
      }
      if (scrolledToBottom) {
         this.setState((prevState, props) => ({
            page: prevState.page + 1,
            loader: true
        })); 
      }
   }
   render() {
      let { loader, buttonBackTop } = this.state;
      let { galleryList } = this.props;
      return (
         <Fragment>
            <GalleryFilter
               onchange={this.onChangeSelect}
            />
            <GalleryListPosts
               galleryList={galleryList}
            />
            { loader && <Loader/> } 
            { buttonBackTop && 
               <BackToTop 
                  onclick={onClickButtonToTop}
            />}
         </Fragment>
      );
  }
}

const mapStateToProps = state => ({
   galleryList: state.galleryList
});

const mapDispatchToProps = dispatch => ({
   getGalleryList: (section, sort, page, period)  => {
      dispatch(asyncGetGalleryList(section, sort, page, period))
   } 
});
  
export default connect(
   mapStateToProps,
   mapDispatchToProps
)(Gallery);
