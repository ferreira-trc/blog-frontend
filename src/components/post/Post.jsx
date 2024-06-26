import { Button } from "../Button.jsx";
import { Icon } from "./Icon";

export function Post({post}) {
    
    return(
        <>
            <article className="lp-article" key={post.id}>

                <section className="lp-section-title">                                        
                    <h2>{post.title}</h2>                  
                </section> 
                
                <section className="lp-section-author">
                    <h3>{post.authorUserName}</h3> 
                </section>

                <section className="lp-section-category">
                    <h6>{post.category}</h6>
                </section>

                <section className="lp-body">
                    <p>{post.text}</p>
                </section>
                
                <section className="lp-section-bottom">                            
                    <div>
                        <Button  clase={"lp-button"}>                            
                            <Icon name={"comment"}/>
                        </Button>
                    </div>
                </section> 
            </article>
        </>
    )
}