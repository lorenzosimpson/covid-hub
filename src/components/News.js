import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';

function News(props) {
    const [articles, setArticles] = useState([])
    const key = '0ef7d455948147d383960c21291ddc78';

    useEffect(() => {
        axios.get(`https://newsapi.org/v2/top-headlines?country=us&q=coronavirus&apiKey=${key}`)
        .then(res => {
            console.log(res)
            setArticles(res.data.articles)
        })
        .catch(err => {
            console.log(err)
        }) 
    }, [])

    if (!articles.length) {
        return <p>loading...</p>
    }
    console.log(articles)

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
            <p id='powered-by'>Powered by News API</p>
            </div>
        </div>
    );
}

export default News;