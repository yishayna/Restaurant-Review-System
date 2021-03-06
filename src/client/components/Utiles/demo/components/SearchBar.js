import React from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { classnames } from '../helpers';
import {connect} from 'react-redux';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      errorMessage: '',
      latitude: null,
      longitude: null,
      isGeocoding: false,
    };
  }
  componentDidMount() {
  
  }

  handleChange = address => {
    this.props.onChangeValue('SearchBar.UPDATE', {name:'address', value:address});
    this.props.onChangeValue('SearchBar.UPDATE', {name:'latitude', value:null});
    this.props.onChangeValue('SearchBar.UPDATE', {name:'longitude', value:null});
    this.props.onChangeValue('SearchBar.UPDATE', {name:'errorMessage', value:''});

  };

  handleSelect = selected => {
    this.props.onChangeValue('SearchBar.UPDATE', {name:'address', value:selected});
    this.props.onChangeValue('SearchBar.UPDATE', {name:'isGeocoding', value:true});

    geocodeByAddress(selected)
      .then(res => getLatLng(res[0]))
      .then(({ lat, lng }) => {
        this.props.onChangeValue('SearchBar.UPDATE', {name:'latitude', value:lat});
        this.props.onChangeValue('SearchBar.UPDATE', {name:'longitude', value:lng});
        this.props.onChangeValue('SearchBar.UPDATE', {name:'isGeocoding', value:false});

      })
      .catch(error => {
        this.props.onChangeValue('SearchBar.UPDATE', {name:'isGeocoding', value:false});
        console.log('error', error); // eslint-disable-line no-console
      });
  };

  handleCloseClick = () => {
    this.props.onChangeValue('SearchBar.UPDATE', {name:'address', value:''});
    this.props.onChangeValue('SearchBar.UPDATE', {name:'latitude', value:null});
    this.props.onChangeValue('SearchBar.UPDATE', {name:'longitude', value:null});
  };

  handleError = (status, clearSuggestions) => {
    console.log('Error from Google Maps API', status); // eslint-disable-line no-console
    this.props.onChangeValue('SearchBar.UPDATE', {name:'errorMessage', value:status});
    clearSuggestions();
  };

  render() {
    const {address,errorMessage, latitude, longitude, isGeocoding} = this.props;
    return (
      <div>
        <PlacesAutocomplete
          onChange={this.handleChange}
          value={this.props.address}
          onSelect={this.handleSelect}
          onError={this.handleError}
          shouldFetchSuggestions={true}
        >
          {({ getInputProps, suggestions, getSuggestionItemProps }) => {
            return (
              <div className="Demo__search-bar-container">
                <div className="Demo__search-input-container">
                  <input
                    {...getInputProps({
                      placeholder: 'Enter Your Address',
                      
                      className: 'Demo__search-input',
                    })}
                  />
                  {this.props.address.length > 0 && (
                    <button
                      className="Demo__clear-button"
                      onClick={this.handleCloseClick}
                    >
                    </button>
                  )}
                </div>
                {suggestions.length > 0 && (
                  <div className="Demo__autocomplete-container">
                    {suggestions.map(suggestion => {
                      const className = classnames('Demo__suggestion-item', {
                        'Demo__suggestion-item--active': suggestion.active,
                      });

                      return (
                        /* eslint-disable react/jsx-key */
                        <div
                          {...getSuggestionItemProps(suggestion, { className })}
                        >
                          <strong>
                            {suggestion.formattedSuggestion.mainText}
                          </strong>{' '}
                          <small>
                            {suggestion.formattedSuggestion.secondaryText}
                          </small>
                        </div>
                      );
                      /* eslint-enable react/jsx-key */
                    })}
                    <div className="Demo__dropdown-footer">
                      <div>
                        <img
                          src={require('../images/powered_by_google_default.png')}
                          className="Demo__dropdown-footer-image"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          }}
        </PlacesAutocomplete>
        

        {((latitude && longitude) || isGeocoding) && (
          <div>
            {isGeocoding ? (
              <div>
                { /* SUCSEEDED   this.props.onChangeValue('SearchBar.UPDATE', {latitude:latitude,longitude:longitude}) */}
              </div>
            ) : (
              <div>
               
              </div>
            )}
          </div>
        )}0
        </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    latitude:  state.latitude,
    longitude: state.longitude,
  }

};

const mapDispatchToProps = (dispatch) => {
  return {
    onChangeValue: (name, value) => dispatch( () => {
      return {
        type: 'SearchBar.UPDATE',
        payload: {name, value}
    }})
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);

