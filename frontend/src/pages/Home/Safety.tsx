import { motion } from 'framer-motion'
import { NavLink } from 'react-router-dom'
const Safety = () => {
    return (
      <motion.div 
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }} className="flex flex-col items-center mt-10">
      <h1 className="text-4xl font-bold pl-5 pr-10 pt-5">Your Safety is Our Priority</h1>
      <h2 className="text-2xl mb-4 pt-10 px-5">At Vibe, we take the safety and privacy of our users very seriously. Here's what we do to protect you:</h2>
      <img src="/src/assets/security.jpg" alt="Safety and security" className="w-full h-64 rounded-sm my-10 md:w-max" />
      <ul className="list-disc leading-loose mt-6 px-10">
        <li className='py-2'>Moderation: Explain how Vibe has a team of moderators who review profiles, messages, and user activity to ensure the safety of the community.</li>
        <li className='py-2'>Reporting and blocking: Describe how Vibe users can report and block other users who are behaving in a harmful or inappropriate manner.</li>
        <li className='py-2'>Privacy controls: Outline the various privacy controls that Vibe offers, such as the ability to hide your profile from search engines and control who can see your profile information and photos.</li>
        <li className='py-2'>Security measures: Detail the various security measures that Vibe has in place, such as encryption and secure servers, to protect user data and prevent unauthorized access.</li>
      </ul>
      <h3 className="text-2xl mt-6 font-bold">Testimonials:</h3>
      <blockquote className="my-4 text-lg font-serif italic px-10">
        "I feel so much more secure knowing that Vibe has such strict safety measures in place. I can use the app with confidence."
      </blockquote>
      <blockquote className="my-4 text-lg font-serif italic px-10">
        "I appreciate how easy it is to report and block users on Vibe. It gives me peace of mind knowing that I can protect myself."
    
      </blockquote>
       
                <NavLink className="register text-2xl my-14 font-semibold transition ease-in-out hover:-translate-y-1 hover:scale-110 delay-150" to="/register">Sign up for Vibe</NavLink>
    </motion.div>
    )
}

export default Safety