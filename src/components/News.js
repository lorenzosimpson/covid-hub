import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';

function News(props) {
    const [articles, setArticles] = useState([])
    const key = process.env.REACT_APP_API_KEY

    useEffect(() => {
        axios.get('https://newsapi.org/v2/everything?q=coronavirus&from=2020-04-27&sortBy=publishedAt&apiKey=' + key
        )
        .then(res => {
            setArticles(res.data.articles)
        })
        .catch(err => {
            console.log(err)
        }) 
    }, [])

    if (!articles.length) {
        return <p>loading...</p>
    }

    return (
        <div className='news-container' id='news'>
            <div className='news-content'>
                <p id='news-header'>COVID-19 News</p>
            {
                articles.map(a => (
                    <div className='individual-article'>
                        <p className='article-src'>{a.source.name}</p>
                        <p className='published-at'>{moment(a.publishedAt).fromNow()}</p>
                        <a href={a.url}><p className='headline'>{a.title}</p></a>
                        <p className='article-desc'>{a.description}</p>
                    </div>
                  )
                )
            }
            <a href='https://newsapi.org' target='_blank' rel='noopener noreferrer'>
                <p id='powered-by'>Powered by News API</p>
            </a>
            </div>
        </div>
    );
}

export default News;
