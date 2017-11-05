import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import './Post.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import actions from '../../actions';

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
    this.initialFetch();
  }

  async initialFetch() {
    if (!!this.props.user && this.props.comments) return this.setState({ loading: false });

    await Promise.all([
      this.props.actions.loadUser(this.props.userId),
      this.props.actions.loadCommentsForPost(this.props.id),
    ]);

    this.setState({ loading: false })
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
        {(!this.props.loading && this.props.user) && (
          <div className="meta">
            <Link to={`/user/${this.props.user.id}`} className="user">
              {this.props.user.name}
            </Link>

            {this.state.comments && (
              <span className="comments">
                <FormattedMessage
                  id="post.meta.comments"
                  values={{
                    amount: this.props.comments.length,
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
  user: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  }),
  comments: PropTypes.arrayOf(
    PropTypes.object,
  ),
  actions: PropTypes.objectOf(PropTypes.func),
};

const mapStateToProps = (state, props) => {
  return {
    comments: state.comments.filter(comment => comment.postId === props.id),
    user: state.users[props.userId],
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Post)