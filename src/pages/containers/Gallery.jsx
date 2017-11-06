import React, { Component } from 'react';
import './Page.css';
import api from '../../api';
import Image from 'react-lazy-image';

class Gallery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            gallery: [],
        };
    }

    async componentDidMount() {
        this.initialFetch();
    }

    async initialFetch() {
        const gallery = await api.gallery.getPage(1);
        this.setState({ loading: false, gallery });
    }

    render() {
        return (
            <section name="Home" className="section">
                <h1>Gallery</h1>
                <section>
                    {this.state.gallery
                        .map(image => <Image
                            source={image.url}
                            width="600"
                            height="600"
                            offset={300}
                        />)
                    }
                </section>
            </section>
        );
    }
}

export default Gallery;