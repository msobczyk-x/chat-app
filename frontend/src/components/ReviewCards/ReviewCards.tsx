import React from 'react';
import Card from './Card';

const Reviews = [
    {
        review: "I was pleasantly surprised by how much I enjoyed using Vibe. The matching recommendations are spot on, and I've made some great connections with like-minded people. I feel like Vibe has given me the chance to connect with people I wouldn't have met in my everyday life. ",
        title: "Rachel Johnson",
        pic:'https://i.pravatar.cc/300?img=1',
        score:5
    },
    {
        review: "Vibe has exceeded my expectations in every way. Not only have I met some great people, but I've also learned a lot about myself through the in-depth profile questions. Highly recommend Vibe to anyone looking for a meaningful connection.",
        title: "Alex Thompson",
        pic:'https://i.pravatar.cc/300?img=2',
        score: 4
    },
    {
        review: "I've been pleasantly surprised by how well Vibe has worked for me. The matching criteria is spot on, and I've made some great connections with people who share my interests and values. I'm so grateful for this app",
        title: "Sarah Williams",
        pic:'https://i.pravatar.cc/300?img=3',
        score: 4.5
    },
    {
        review: "I've met some amazing people on Vibe, and I'm confident that I'll find my soulmate thanks to the advanced matching algorithms. Highly recommend!",
        title: "Ryan Davis",
        pic:'https://i.pravatar.cc/300?img=4',
        score: 5
    },
]

const ReviewCards = () => {
    return (
        <div className="flex flex-col items-center justify-center lg:flex-row flex-wrap py-5">
            {Reviews.map((review, index) => {
                return (
                    
                        <Card review={review.review} title={review.title} pic={review.pic} score={review.score} key={index}/>
                    
                )
            })
            }
        
            </div>
    )

}

export default ReviewCards;