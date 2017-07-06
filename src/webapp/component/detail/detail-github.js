import React from 'react';
import {Cancel} from './../wui-cancel'


const Image = ({ color }) =>
    <div style={{
        width: '100%',
        height: 400,
        background: color
    }}></div>


export default class DetailGithub extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            channel: '',
            // image: IMAGES[parseInt(props.match.params.id, 10)],
            history: props.history,
        }

    }


    back(e) {
        e.stopPropagation()
        this.state.history.goBack()
        return false;
    }


    render() {
        
        window.scrollTo(0, 0);

        return (
            <div className = 'detail-root'>
                <div className='detail-root-body'>
                    <h1>React-Router-History-Back-Style</h1>
                    <Image color={'#00838F'} />
                    <Cancel onTouch={this.back.bind(this)} />
                </div>
            </div>
        );
    }
};