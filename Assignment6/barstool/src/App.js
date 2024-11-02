
import './App.css';
import './BarstoolGetter';
import BarstoolGetter from './BarstoolGetter';
import { useEffect, useState } from 'react';
function App() {
  const axios = require('axios')
  const barstool = new BarstoolGetter();
  const url = 'https://www.jalirani.com/files/barstool.json' 
  const [parsedData, setParsedData] = useState([])

  const fetchData = async () => {
    const data = await barstool.getJsonData(url);
    const pData = barstool.getParsedData(data);
    setParsedData(pData);
    console.log(pData); 
};
useEffect(() => {
  fetchData(); 
}, []);
  
  return (
    <div className="App">

      <div className='articleSection'>
      {parsedData.map((e, i) => {
        return <div key={i} className='article'>

            <img src={e.article_image} className='articleImage'/>
            <div className='hero'> 
              <a href={e.article_url} target='_blank'>
                <h1>{e.article_title}</h1>
              </a>
              <div className='authorSection'>
                <img src={e.author_avatar} className='articleAvatar'/>
                <h3>{e.author_name}</h3>
              </div>
              <div className='articleCommentCount'>Comments: {e.comment_count}</div>
            </div>
        </div>
      })}
      </div>
    </div>
  );
}

export default App;
