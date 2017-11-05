import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Post from '../../posts/containers/Post.jsx';
import Loading from '../../shared/components/Loading.jsx';
import './Page.css';

import api from '../../api.js';
import actions from '../../actions';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
    };

    this.handleScroll = this.handleScroll.bind(this);
  }

  async componentDidMount() {
    this.initialFetch();

    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  async initialFetch() {
    await this.props.actions.postsNextPage();
    this.setState({ loading: false, });
  }

  handleScroll() {
    if (this.state.loading) return null;

    const scrolled = window.scrollY;
    const viewportHight = window.innerHeight;
    const fullHeight = document.body.clientHeight;

    if (!(scrolled + viewportHight + 300 >= fullHeight)) {
      return null;
    }

    return this.setState({ loading: true }, async () => {
      try {
        this.props.actions.postsNextPage();
        this.setState({ loading: false, });
      } catch (error) {
        console.error(error);
        this.setState({ loading: false });
      }
    });
  }

  render() {
    return (
      <section name="Home" className="section">
        <h1>
          <FormattedMessage id="title.home" />
        </h1>

        <section className="list">
          {this.props.posts
            .map(post => <Post key={post.id} {...post} />)}
          {this.state.loading && (
            <Loading />
          )}
        </section>
      </section>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    posts: state.posts.entities,
    page: state.posts.page,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)