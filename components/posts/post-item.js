import Link from 'next/link'

import classes from './post-item.module.css'
import Image from 'next/image'
const PostItem = (props) => {
  const { title, image, excerpt, date, slug } = props.post;

  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const imagepath = `/images/posts/${slug}/${image}`;
  const linkpath = `/posts/${slug}`;

  return (
    <li className={classes.post}>
     <Link href={linkpath}>
         <div className={classes.image}>
            <Image src={imagepath} alt={title} width={300} height={200} layout="responsive" />
         </div>
         <div className={classes.content}>
           <h3>{title}</h3>
           <time>{formattedDate}</time>
           <p>{excerpt}</p>
         </div>
     </Link>
    </li>
  );
}

export default PostItem