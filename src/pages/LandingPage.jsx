import {Post} from "../components/post/Post"
import posts from '../data/posts.json';

export function LandingPage() {
    return (
        <>
            <main>
                {posts.map( (p) => {
                    return (
                        <Post post={p} key={p.id}/>
                    );
                })}
            </main>
        </>
    );
}