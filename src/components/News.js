import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import defaultImage from './toi.webp'

export default class News extends Component {
  static defaultProps = {
    country : 'in',
    pageSize : 9,
    category : 'general'
  }

  static propTypes = {
    country : PropTypes.string,
    pageSize : PropTypes.number,
    category : PropTypes.string
  }

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

  constructor(props) {
    super(props);
    this.state = {
      page : 1,
      articles : [],
      loading : false
    }
    document.title = `${this.props.category==='general'?"AP News":`AP News - ${this.capitalizeFirstLetter(this.props.category)}`}`;
  }

  async componentDidMount(){
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=25a0da4b24434785acb2a8c28a38f472&page=1&pageSize=${this.props.pageSize}`;
    this.setState({loading:true});
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles : parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false
    });
  }

  handlePrevClick = async ()=> {
    console.log("Previous");
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=25a0da4b24434785acb2a8c28a38f472&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    this.setState({loading : true});
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      page : this.state.page - 1,
      articles : parsedData.articles,
      loading: false
    })
  }
  handleNextClick = async ()=> {
    console.log("Next");

      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=25a0da4b24434785acb2a8c28a38f472&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
      this.setState({loading : true});
      let data = await fetch(url);
      let parsedData = await data.json();
      this.setState({
        page : this.state.page + 1,
        articles : parsedData.articles,
        loading : false
      })
  
  }

  render() {
    return (
      <div className='container my-3'>
        <h1 className='text-center'>{this.props.category === 'general'?'AP News - Get the latest news':`Top ${this.capitalizeFirstLetter(this.props.category)} Headlines`}</h1>
        {this.state.loading && <Spinner/>}
        <div className="row">
            {!this.state.loading && this.state.articles.map((element)=>{
              return(
                <div className="col-md-4" key={element.url}>
                <NewsItem title={element.title?element.title:" "} description={element.description?element.description:" "} imageUrl={element.urlToImage?element.urlToImage:defaultImage} newsUrl={element.url} author={element.author} date={element.publishedAt} sources={element.source.name}/>
              </div>
              )
            })}
        </div>
        <div className="container d-flex justify-content-between">
          <button type="button" disabled={this.state.page<=1} className="btn btn-dark m-3" onClick={this.handlePrevClick}>&larr; Previous</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark m-3" onClick={this.handleNextClick}>Next &rarr; </button>
        </div>
      </div>
    )
  }
}
