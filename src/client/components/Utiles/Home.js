import React, { Component } from 'react';
import Map from './Map';
import {connect} from 'react-redux';

class Home extends Component {

	render() {
		return(
			<div style={{ margin: '0px' }}>
				<Map
					google={this.props.google}
					center={{lat: 18.5204, lng: 73.8567}}
					height='0%'
					width='0%'
					length='0%'
					zoom={0}
				/>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
	
	}
  };
  
  const mapDispatchToProps = (dispatch) => {
	return {
	
	}
  };

export default connect(mapStateToProps, mapDispatchToProps)(Home);
