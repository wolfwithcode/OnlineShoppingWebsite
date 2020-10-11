import React  from 'react';
import '../../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faAngleRight } from "@fortawesome/free-solid-svg-icons";
import {
    Link,
    withRouter
  } from "react-router-dom"; 

import ScrollAnimation from 'react-animate-on-scroll'; 

function NewsBanner(props) {

    const location = props.history.location.pathname

    const locationText = location.slice(1);
    const locationArr = [];
    const locationSplit = locationText.split('/');
    for (let i = 0; i < locationSplit.length; i++) {
        if (i !== 1) {
            locationArr.push((locationText.split('/'))[i]);
        }
    }
    const redirect = (event) => {
        if (event.target.textContent === 'news') {
            props.history.push(`/news`)
        }
    }

    return(
        <div className="NewsBanner">
            <div className="newsbanner-container">
                <div className="newsbanner-overlay flex-center">
                    { locationArr[1] &&
                        <ScrollAnimation animateIn='fadeInDown' animateOut='fadeOutUp'  className="newsbanner-title">
                        {locationArr[1]}
                    </ScrollAnimation>
                    }
                    { locationArr[0] && !locationArr[1] &&
                        <ScrollAnimation animateIn='fadeInDown' animateOut='fadeOutUp'  className="newsbanner-title">
                        {locationArr[0]}
                    </ScrollAnimation>
                    }

                    <div className="newsbanner-breadcrumb flex-center"> 
                        <Link className="a" to="/">Home</Link>
                        {
                            locationArr.map((item, index) => {
                                return(
                                    <div key={index} className="flex-center">
                                        <FontAwesomeIcon icon={faAngleRight} style={{margin: '10px'}}/>
                                        <div className="link a" onClick={redirect}>{item}</div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withRouter(NewsBanner);