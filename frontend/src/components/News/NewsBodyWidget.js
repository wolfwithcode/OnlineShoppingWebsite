import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faFacebookF, faTwitter, faInstagram, faGoogle } from '@fortawesome/free-brands-svg-icons';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

function NewsBodyWidget(props) {

    const [news, setNews] = useState([]);
    const [isSearchFocus, setIsSearchFocus] = useState(false);


    let splicedCate = [];
    let sortedCate = [];

    const topViews = (news.sort((a, b) => b.newView - a.newView)).slice(0,3); //Top view on Category
    if (news.length > 0) {
        
        //Get all category
        const cate = Object.values(news.reduce((a, {newCate}) => {
            a[newCate] = a[newCate] || {newCate, count: 0};
            a[newCate].count++;
            return a;
        }, Object.create(null)));
        //Sort and splice category by posts count
        cate.sort((a,b) =>  b.count - a.count)
        splicedCate = cate.splice(0,5);
        splicedCate.sort((a, b) => b.count - a.count);

        for (let i = 0; i < splicedCate.length; i++) {
            sortedCate.push(splicedCate[i].newCate);
        }
    }

    useEffect(() => {
        axios.get(`http://localhost:4000/news`)
            .then(res => {
                setNews(res.data)
            }
        )
    }, [])

    return (
        <div className="newsbody-widget">
            <div className="widget-search">
                <div className="widget-title">Search</div>
                <form className={ isSearchFocus === true ? "widget-form widget_search_click" : "widget-form"} 
                    onMouseEnter={() => { setIsSearchFocus(true)}}
                    onMouseLeave={() => { setIsSearchFocus(false)}}>
                    <input placeholder="Search the site"></input>
                    <button>Search</button>
                </form>
            </div>
            <div className="widget-pop">
                <div className="widget-title">Popular Posts</div>
                {
                    topViews.map((item, index) => {
                        return(
                            <div key={index} className="widget-post">
                                <div 
                                    className="widget-post-img" 
                                    style={{backgroundImage: `url(${item.newImg})`}}
                                    onClick={()=>{
                                        window.scrollTo(0,0); 
                                        props.history.push(`/news/${item._id}`)
                                    }}
                                ></div>
                                <div className="widget-post-info">
                                    <div 
                                        className="widget-post-title"
                                        onClick={()=>{
                                            window.scrollTo(0,0); 
                                            props.history.push(`/news/${item._id}`)
                                        }}
                                    >{item.newTitle}</div>
                                    <div className="widget-post-info2">
                                        <span className="widget-post-time">{item.newTime}</span>
                                        <span className="widget-post-view">{item.newView} view</span>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <div className="widget-cate">
                <div className="widget-title">Categorys</div>
                {
                    splicedCate.map((item, index) => {
                        return (
                            <div key={index} className="widget-cate-container">
                                <div 
                                    className="widget-cate-div"
                                    onClick={()=>{
                                        window.scrollTo(0,0); 
                                        props.history.push(`/news/category/${item.newCate}`)
                                    }}>
                                    <div>{item.newCate}</div>
                                    <div className="widget-cate-count">{item.count}</div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <div className="widget-connect">
                <div className="widget-title">Stay Connected</div>
                <div className="widget-connect-container">
                    <div className="widget-icon">
                        <FontAwesomeIcon icon={faFacebookF}/>
                    </div>
                    <div className="widget-icon">
                        <FontAwesomeIcon icon={faTwitter}/>
                    </div>
                    <div className="widget-icon">
                        <FontAwesomeIcon icon={faInstagram}/>
                    </div>
                    <div className="widget-icon">
                        <FontAwesomeIcon icon={faGoogle}/>
                    </div>
                </div>
            </div>

            <div className="widget-newsletter">
                <div className="widget-title">Newsletter</div>
                <form className={ isSearchFocus === true ? "widget-form widget_search_click" : "widget-form"} 
                    onMouseEnter={() => { setIsSearchFocus(true)}}
                    onMouseLeave={() => { setIsSearchFocus(false)}}>
                    <input placeholder="Enter your email"></input>
                    <button>Send</button>
                </form>
            </div>
        </div>
    )
}
export default withRouter(NewsBodyWidget);