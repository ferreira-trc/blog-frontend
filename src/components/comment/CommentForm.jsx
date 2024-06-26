import { Button } from '../Button.jsx';
import { Icon } from '../Icon.jsx';

export function CommentForm({classNameSection, classNameButton, onSubmit, value, onChange}) {
    return (
        <>
             <section className={classNameSection}>
                <form onSubmit={onSubmit}>
                    <Button className={classNameButton} type="submit">
                        <Icon name={"Submit Comment"} /> 
                    </Button>
                    <textarea
                    value={value}
                    onChange={onChange}
                    placeholder="Write your comment here..."
                    required
                    />
                </form>
            </section>
        </>
    );
}