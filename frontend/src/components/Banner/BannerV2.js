import React, { Component } from 'react';
import '../../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faAngleRight } from "@fortawesome/free-solid-svg-icons";
import {
    withRouter
  } from "react-router-dom"; 
import ScrollAnimation from 'react-animate-on-scroll'; 

  
class BannerV2 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            location: this.props.history.location.pathname
        }
    }

    render() {
        const { location } = this.state;
        let { bannerImage, position } = this.props;
        const locationText = location.slice(1);

        return(
            <div className="BannerV2">
                <div 
                    className="newsbanner-container another-banner" 
                    style={{ 
                        backgroundImage: `url(${bannerImage})`,
                        backgroundPosition: position
                    }}
                    >
                    <div className="newsbanner-overlay flex-center another-overlay">
                        <ScrollAnimation animateIn='fadeInDown' animateOut='fadeOutUp' className="newsbanner-title">
                            {locationText}
                        </ScrollAnimation>
                        <div className="newsbanner-breadcrumb flex-center">
                            <div>Home</div>
                            <FontAwesomeIcon icon={faAngleRight} className="cart-icon" style={{margin: '0 10px'}}/>
                            <div>{locationText}</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(BannerV2);