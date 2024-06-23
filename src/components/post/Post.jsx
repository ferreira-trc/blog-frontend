import { useState } from "react";
import { Button } from "../Button.jsx";
import { Icon } from "./Icon";

export function Post({post}) {
    return(
        <>
              <article className="lp-article" key={post.id}>
                        <section className="lp-section-header">                            
                            <h2>{post.title}</h2>
                        </section> 

                        <section>
                            <p>{post.text}</p>
                        </section>
                        
                        <section className="lp-section-bottom">                            
                            <div>
                                <Button  clase={"lp-button"}>
                                    <span>comment</span>
                                    <Icon name={"comment"}/>
                                </Button>
                           </div>
                        </section> 
                    </article>
        </>
    )
}