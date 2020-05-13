import React from 'react';
import FlashCard from './FlashCard';

 function FlashcardList({ flashCards}) {
  return (
    <div className="card-grid">
    {
        flashCards.map((flashCard)=>{
            return <FlashCard flashCard={flashCard} key={flashCard.id}/>
        })
    }
    </div>
  );
}

export default FlashcardList;