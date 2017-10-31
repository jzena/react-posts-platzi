import React from 'react';
import { FormattedHTMLMessage } from 'react-intl';

function Comment(props) {
    return (
        <article id={`comment-${props.id}`}>
            <div>
                <FormattedHTMLMessage
                    id="comment.meta.author"
                    values={{
                        email: props.email,
                        name: props.name,
                    }}
                />
                <p>
                    {props.body}
                </p>
            </div>
        </article>
    );
}

export default Comment;