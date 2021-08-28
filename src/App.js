import React , {useEffect} from 'react';
import './App.css';
import alanBtn from '@alan-ai/alan-sdk-web';
import { useState } from 'react';
import NewsCards from './component/newscards/NewsCards';
import useStyles from './style';
import wordsToNumbers from 'words-to-numbers';

const alankey = '88873fe9f797a8f272d8cabac6220f992e956eca572e1d8b807a3e2338fdd0dc/stage';
function App() {
    const [newsArticles , setnewsArticles] = useState([]);
    const [activeArticle , setActiveArticle] = useState(-1);
    const classes = useStyles();
  useEffect(() => {
     alanBtn({
       key : alankey,
       onCommand : ({command , articles , number})=>{
          if(command === 'newHeadlines'){ 
            setnewsArticles(articles);
            setActiveArticle(-1);
          }else if(command === 'highlight'){
              setActiveArticle((prevActiveArticle)=>prevActiveArticle +1 )
          }else if(command === 'open'){
            // window.open(articles[number].url , '_blank')
            const parsedNumber = number.length > 2 ? wordsToNumbers((number), { fuzzy: true }) : number;
          const article = articles[parsedNumber - 1];

          if (parsedNumber > articles.length) {
            alanBtn().playText('Please try that again...');
          } else if (article) {
            window.open(article.url, '_blank');
            alanBtn().playText('Opening...');
          } else {
            alanBtn().playText('Please try that again...');
          }
          }
       }
     })
  }, [])
  return (
    <>
      <div className={classes.logoContainer}>
         <img className={classes.alanLogo} src="https://static8.depositphotos.com/1081417/992/i/950/depositphotos_9927251-stock-photo-good-news.jpg" alt="Alan Ai" />
      </div>
      <NewsCards  articles={newsArticles} activeArticle={activeArticle}/>
    </>
  );
}

export default App;
