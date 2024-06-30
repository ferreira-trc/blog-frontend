export function Post({ post }) {    

  return (
      <>        
        <section className="p-section-title">
            <h2>{post.title}</h2>
        </section>

        <section className="p-section-author">
            <h3>{post.authorUserName}</h3>
        </section>

        <section className="p-section-category">
            <h6>{post.category}</h6>
        </section>

        <section className="p-body">
            <pre>{post.text}</pre>
        </section> 
      </>


            
            
  );
}

