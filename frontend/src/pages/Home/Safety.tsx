const Safety = () => {
    return (
        <div className="flex flex-col items-center text-center mt-10">
      <h1 className="text-4xl font-bold">Your Safety is Our Priority</h1>
      <h2 className="text-2xl mb-4">At Vibe, we take the safety and privacy of our users very seriously. Here's what we do to protect you:</h2>
      <img src="/path/to/image.jpg" alt="Safety and security" className="w-full h-64 rounded-lg" />
      <ul className="list-disc leading-loose mt-6">
        <li>Moderation: Explain how Vibe has a team of moderators who review profiles, messages, and user activity to ensure the safety of the community.</li>
        <li>Reporting and blocking: Describe how Vibe users can report and block other users who are behaving in a harmful or inappropriate manner.</li>
        <li>Privacy controls: Outline the various privacy controls that Vibe offers, such as the ability to hide your profile from search engines and control who can see your profile information and photos.</li>
        <li>Security measures: Detail the various security measures that Vibe has in place, such as encryption and secure servers, to protect user data and prevent unauthorized access.</li>
      </ul>
      <h3 className="text-2xl mt-6 font-bold">Testimonials:</h3>
      <blockquote className="my-4 text-lg font-serif italic">
        "I feel so much more secure knowing that Vibe has such strict safety measures in place. I can use the app with confidence."
      </blockquote>
      <blockquote className="text-lg font-serif italic">
        "I appreciate how easy it is to report and block users on Vibe. It gives me peace of mind knowing that I can protect myself."
      </blockquote>
      <a href="/signup" className="btn mt-6">Sign Up for Vibe</a>
    </div>
    )
}

export default Safety