import React from "react";
import { Rate } from "antd";
type CardProps = {
    review: string;
    title: string;
    pic: string;
    score: number;
    };

const Card = (props: CardProps) => {
    const { review, title, pic, score } = props;
  return (
    <div className="flex flex-col w-80 h-80 bg-slate-100 rounded-lg shadow-lg p-5 m-5 backdrop-blur-lg">
      <div className="flex flex-row justify-between">
        <div className="border-b-2 text-2xl">{title}</div>
      <img src={pic} alt="logo" className="w-12 h-12 rounded-full" />
      </div>
      <p className="text-left py-5 text-clip">{review}</p>
      <Rate disabled defaultValue={score} />
    </div>
  );
};

export default Card;
