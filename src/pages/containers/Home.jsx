import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';

import Post from '../../posts/containers/Post.jsx';
import Loading from '../../shared/components/Loading.jsx';
import './Page.css';

import api from '../../api.js';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 1,
      posts: [],
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
    const posts = await api.posts.getList(this.state.page);

    this.setState({
      posts,
      page: this.state.page + 1,
      loading: false,
    });
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
        const posts = await api.posts.getList(this.state.page);

        this.setState({
          posts: this.state.posts.concat(posts),
          page: this.state.page + 1,
          loading: false,
        });
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
          <FormattedMessage id="title.home"/>
        </h1>

        <section className="list">
          {this.state.posts
            .map(post => <Post key={post.id} {...post} />)}
          {this.state.loading && (
            <Loading />
          )}
        </section>
      </section>
    );
  }
}

export default Home;
