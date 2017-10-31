import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api.js';
import { FormattedMessage } from 'react-intl';
import './Post.css';

class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      user: props.user || null,
      comments: props.comments || null,
    };
  }

  async componentDidMount() {
    if (!!this.state.user && !!this.state.comments) return this.setState({ loading: false })
    const [
      user,
      comments,
    ] = await Promise.all([
      !this.state.user ? api.users.getSingle(this.props.userId) : Promise.resolve(null),
      !this.state.comments ? api.posts.getComments(this.props.userId) : Promise.resolve(null),
    ]);

    this.setState({
      loading: false,
      user: user || this.state.user,
      comments: comments || this.state.comments,
    })
  }

  render() {
    return (
      <article id={`post-${this.props.id}`} className="post">
        <h2 className="title">
          <Link to={`/posts/${this.props.id}`}>
            {this.props.title}
          </Link>
        </h2>
        <p className="body">
          {this.props.body}

        </p>
        {(!this.props.loading && this.state.user) && (
          <div className="meta">
            <Link to={`/user/${this.state.user.id}`} className="user">
              {this.state.user.name}
            </Link>

            {this.state.comments && (
              <span className="comments">
                <FormattedMessage
                  id="post.meta.comments"
                  values={{
                    amount: this.state.comments.length,
                  }}
                />
              </span>
            )}
            <Link to={`/post/${this.props.id}`}>
              <FormattedMessage id="post.meta.readMore" />
            </Link>
          </div>
        )}
      </article>
    )
  }
}

Post.propTypes = {
  id: PropTypes.number,
  userId: PropTypes.number,
  title: PropTypes.string,
  body: PropTypes.string,
};

export default Post;
