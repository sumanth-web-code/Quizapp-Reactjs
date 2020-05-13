import React, { useState, useEffect, useRef} from 'react';
import './App.css';
import FlashcardList from './components/FlashcardList';
import axios from 'axios';

function App() {
  const[flashCards, setFlashCards] = useState([]);
  const[categories, setCategories] = useState([]);

  const categoryEl = useRef();
  const amountEl = useRef();

  useEffect(() => {
    axios.get('https://opentdb.com/api_category.php')
    .then(res => {
      //console.log(res.data)
      setCategories(res.data.trivia_categories)
    })
    
  }, [])

 useEffect(()=>{
   
},[])

function decodeString(str) {
  const textArea = document.createElement('textarea')
  textArea.innerHTML = str;
  return textArea.value;
}

function handleSubmit(e){
  e.preventDefault();
  axios.get('https://opentdb.com/api.php?', {
    params: {
      amount: amountEl.current.value,
      category: categoryEl.current.value
    }
  })
  .then(response=> {
     setFlashCards(response.data.results.map((questionItem,index)=>{
      const answer = decodeString(questionItem.correct_answer)
      const options = [...questionItem.incorrect_answers.map(a=> decodeString(a))
       , answer]
      return{
        id: `${index}-${Date.now()}`,
        question: decodeString( questionItem.question),
        answer: answer,
        options:options.sort(()=> Math.random()- 0.5)
      }
    }))
   //console.log(response.data.results);
 })
}

  return (
    <>
     <div className="app">
       <h1>QUIZ APP</h1>
     </div>
    <form className="header" onSubmit={handleSubmit}>
        
          <div className="form-group">
             <label htmlFor="category">Category</label>
               <select id="category" ref={categoryEl}>
                 { categories.map(category=>{
                    return <option value={category.id} key={category.id}>
                      {category.name}
                    </option>
                 })}
               </select>
          </div>
          <div className="form-group">
             <label htmlFor="amount">Number of Questions</label>
               <input type="number" id="amount" min="1" defaultValue={10} step="1" ref={amountEl}/>
          </div>
          <div className="form-group">
             <button className="btn">Generate</button>
          </div>
       </form>
      <div className="container">
        <FlashcardList flashCards={flashCards}/>
      </div>
    </>
  );
}




export default App;
