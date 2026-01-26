import Image from "next/image";

import classes from "./hero.module.css";

const HeroSection = () => {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
          <Image 
            src="/images/site/sherry.jpg"
            alt="An image showing Sherry"
            width={300}
            height={300}
            priority={true}
          />
      </div>
      <h1>Hi, I'm Sherry</h1>
      <p>
        I am a skilled Software Engineering and Web Development - Welcome to my blog!
      </p>
    </section>
  )
}

export default HeroSection