import { Button } from '../Button.jsx';

export function CommentForm({classNameSection, classNameButton, onSubmit, value, onChange}) {
    return (
        <>
             <div className={classNameSection}>
                <form onSubmit={onSubmit}>
                    
                    <textarea
                    className='comment-text-area'
                    value={value}
                    onChange={onChange}
                    placeholder="Write your comment here..."
                    required
                    />
                    <Button className={classNameButton} type="submit">
                        Submit Comment 
                    </Button>
                </form>
            </div>
        </>
    );
}