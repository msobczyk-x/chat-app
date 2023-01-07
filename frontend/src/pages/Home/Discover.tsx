const Discover = () => {
    return (
        <div className="flex flex-col items-center text-center mt-10">
        <h1 className="text-4xl font-bold">Find Your Soulmate on Vibe</h1>
        <h2 className="text-2xl mb-4">Discover like-minded individuals and build meaningful connections with our advanced matching algorithms.</h2>
        <img src="/path/to/image.jpg" alt="Love and connection" className="w-full h-64 rounded-lg" />
        <ul className="list-disc leading-loose mt-6">
          <li>Advanced matching algorithms: Explain how Vibe uses data and technology to help users find compatible partners.</li>
          <li>Wide user base: Mention the size of the Vibe community and the diversity of its members.</li>
          <li>Safe and secure: Emphasize that user privacy and security are a top priority for Vibe.</li>
          <li>Easy to use: Highlight the simplicity and user-friendliness of the app.</li>
        </ul>
        <h3 className="text-2xl mt-6 font-bold">Testimonials:</h3>
        <blockquote className="my-4 text-lg font-serif italic">
          "I never thought I'd find my soulmate online, but Vibe changed everything. The matching algorithms really work!"
        </blockquote>
        <blockquote className="text-lg font-serif italic">
          "Vibe has given me the chance to connect with so many amazing people. I'm so grateful for this app."
        </blockquote>
        <a href="/signup" className="btn mt-6">Sign Up for Vibe</a>
      </div>
    )
}

export default Discover