import React, { Component } from 'react'
import defaultImage from './toi.webp'


export default class NewsItem extends Component {
  render() {
    let {title,description,imageUrl,newsUrl,author,date,sources} = this.props;
    return (
      <div>
        <div className="card m-3">
          <img src={!imageUrl?defaultImage:imageUrl} className="card-img-top" alt="..."/>
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <span className="badge rounded-pill text-bg-secondary">{sources}</span>
            <p className="card-text">{description}</p>
            <p className="card-text"><small className="text-body-secondary">By {!author?'Sources':author} on {new Date(date).toDateString()}</small></p>
            <a rel='noreferrer' href={newsUrl} target='_blank' className="btn btn-sm btn-dark">Read more</a>
          </div>
        </div>
      </div>
    )
  }
}
