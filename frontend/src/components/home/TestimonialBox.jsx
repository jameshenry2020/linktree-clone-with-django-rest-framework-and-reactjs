import React from "react";
import {QuoteIcon} from "..";

export default function TestimonialBox({ text, author }) {
  return (
    <div className=" w-100 py-4 px-5 mt-8 rounded flex align-items-center text-white flex-column" style={{backgroundColor:'#0B093B'}}>
      <div style={{position:'relative', top:'-35px', zIndex:2}}>
        <QuoteIcon />
      </div>
      <p className="whiteColor font13" style={{ paddingBottom: "30px" }}>
        {text}
      </p>
      <p className="orangeColor font13" style={{alignSelf: 'flex-end'}}>
        <em>{author}</em>
      </p>
    </div>
  );
}

