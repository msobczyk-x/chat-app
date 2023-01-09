import { motion } from 'framer-motion'
import { NavLink } from 'react-router-dom'
const Features = () => {
    return (
        <motion.div 
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="flex flex-col items-center mt-10">
      <h1 className="text-4xl font-bold pl-5 pr-10 pt-5">Experience the Best of Vibe</h1>
      <h2 className="text-2xl mb-4 pt-10 px-5">From advanced matching algorithms to a wide user base, Vibe has everything you need to find and connect with your soulmate.</h2>
      <img src="/src/assets/chat.jpg" alt="Love and connection" className="w-full h-64 rounded-sm my-10 md:w-max" />
      <ul className="list-disc leading-loose mt-6 px-10">
        <li className='py-2'>Advanced matching algorithms: Explain how Vibe uses data and technology to help users find compatible partners.</li>
        <li className='py-2'>Wide user base: Mention the size of the Vibe community and the diversity of its members.</li>
        <li className='py-2'>Safe and secure: Emphasize that user privacy and security are a top priority for Vibe.</li>
        <li className='py-2'>Easy to use: Highlight the simplicity and user-friendliness of the app.</li>
        <li className='py-2'>In-depth profiles: Describe the detailed profile information that Vibe users can provide, including their interests, values, and relationship preferences.</li>
        <li className='py-2'>Matching criteria: Outline the various factors that Vibe takes into account when making matches, such as age, location, and lifestyle choices.</li>
        <li className='py-2'>Matching recommendations: Explain how Vibe suggests matches to users based on their profile information and preferences.</li>
        <li className='py-2'>Message features: Detail the various ways that users can communicate on Vibe, including text, audio, and video messaging.</li>
      </ul>
      <h3 className="text-2xl mt-6 font-bold">Testimonials:</h3>
      <blockquote className="my-4 text-lg font-serif italic px-10">
        "I never thought I'd find my soulmate online, but Vibe changed everything. The matching algorithms really work!"
      </blockquote>
      <blockquote className="my-4 text-lg font-serif italic px-10">
        "Vibe has given me the chance to connect with so many amazing people. I'm so grateful for this app."
      </blockquote>
      <NavLink className="register text-2xl my-14 font-semibold transition ease-in-out hover:-translate-y-1 hover:scale-110 delay-150" to="/register">Sign up for Vibe</NavLink>
    </motion.div>
    )
}

export default Features