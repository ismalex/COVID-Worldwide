import React, { Component } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import { CircularProgress, Tooltip, Typography, Fade } from '@material-ui/core';
import { fetchCountriesData } from '../../api';
/* import Fade from '@material-ui/core/Fade'; */

const viewPort = {
	width: '75vw',
	height: '96vh',
	latitude: 15.7577,
	longitude: 10.4376,
	zoom: 1.5
};

/* 	const [viewport, setViewport] = useState({
				width: '100vw',
				height: '95vh',
				latitude: 12.7577,
				longitude: 25.4376, 
				zoom: 2,
			}
		);
	 */

/* CHANGE THIS? */
const mapInfo = {
	mapboxApiAccessToken: process.env.REACT_APP_MAPBOX_TOKEN,
	mapStyle: 'mapbox://styles/mapbox/dark-v10'
};

export default class MapInfo extends Component {
	state = {
		countriesInfo: []
	};

	async componentDidMount() {
		const dataFromApi = await fetchCountriesData();
		this.setState({ countriesInfo: dataFromApi });
		console.log('map', this.state.countriesInfo)
	}

	defineMarkerSize = (numberOfCases) => {
		let obj = {};

		if (numberOfCases > 1000000) {
			obj = {
				width: '120px',
				height: '120px',
				opacity: 0.3
			};
		}
		if (numberOfCases < 500000 && numberOfCases > 90000) {
			obj = {
				width: '90px',
				height: '90px',
				opacity: 0.3
			};
		}
		if (numberOfCases < 90000 && numberOfCases > 10000) {
			obj = {
				width: '50px',
				height: '50px',
				opacity: 0.3
			};
		}
		if (numberOfCases < 10000 && numberOfCases > 1000) {
			obj = {
				width: '20px',
				height: '20px',
				opacity: 0.3
			};
		}
		if (numberOfCases < 1000) {
			obj = {
				width: '10px',
				height: '10px',
				opacity: 0.3
			};
		}
		return obj;
		/*console.log('Selected Value'); */
	};

	render() {
		const numberFormat = new Intl.NumberFormat();

		const { countriesInfo } = this.state;

		if (!countriesInfo) {
			return <CircularProgress size={15} />;
		}

		return (
			<ReactMapGL
				{...viewPort}
				mapboxApiAccessToken={mapInfo.mapboxApiAccessToken}
				mapStyle={mapInfo.mapStyle}
				/* 	onViewportChange = { (viewport) =>	{ setViewport(viewport) } } */
			>
				{countriesInfo.map((country, index) => (
					<Marker key={index} latitude={country.countryInfo.lat + 7} longitude={country.countryInfo.long - 7}>
						{console.log(country)}
						<Tooltip
							TransitionComponent={Fade}
							aria-label="add"
							title={
								<React.Fragment>
									<Typography color="inherit">{country.country}</Typography>
									<b>
										{' '}
										 Active cases: {numberFormat.format(country.active)} • Deaths: {country.deaths}{' '}
										• Recovered: {country.recovered}
									</b>
								</React.Fragment>
							}
						>
							{/* <div> */}
								<img
									src="./Red_Circle(small).svg"
									alt="a"
									style={this.defineMarkerSize(country.active)}
								/>
							{/* </div> */}
						</Tooltip>
					</Marker>
				))}
			</ReactMapGL>
		);
	}
}
