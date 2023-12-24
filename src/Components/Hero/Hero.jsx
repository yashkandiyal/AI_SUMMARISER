import React from 'react'
import './Hero.css'
const Hero = () => {
  const githubProfileUrl = 'https://github.com/yashkandiyal';
  return (
    
    <>
    <div className="heading">
        <h1>SummaAI</h1>
        <a href={githubProfileUrl} target='_blank' rel="noopener noreferrer"><i className="fa-brands fa-github" /></a>
        
        
    </div>
    <div className="Hero-heading">
        <h1>Summarize Your Articles with Chat-GPT</h1>
        <h2>Simplify your reading with SummaAI, an open-source article summarizer
        that transforms lengthy articles into clear and concise summaries</h2>
    </div>
    
    </>
  )
}

export default Hero
