import React, { Fragment, Component } from 'react';
import { Typography, Grid, List, ListItem, Divider, Chip, CircularProgress } from '@material-ui/core';
import { fetchSortedCountriesData } from '../../api';

export default class CountriesList extends Component {
	state = {
		countriesInfo: []
	};

	async componentDidMount() {
		const dataFromApi = await fetchSortedCountriesData();
		this.setState({ countriesInfo: dataFromApi });
	}

	render() {
		if (!this.state.countriesInfo) {
			return <CircularProgress size={15} />;
			/* return null; */
		}

		const style = {
			width: '15%',
			marginRight: '5px',
			marginLeft: '5px',
			border: '0.5px solid #EBEBEB'
		};

		const numberFormat = new Intl.NumberFormat();
		// "1,234,567,890"

		return (
			<Grid item xs={12}>
				{this.state.countriesInfo.map((country, index) => (
					<Fragment>
						<List>
							<ListItem disableGutters>
								<Chip variant="outlined" size="small" label={(index < 9 ? '0' : '') + (index + 1)} />

								<img alt="" src={country.countryInfo.flag} style={style} />
								{country.country}
								<Grid container direction="row" /* alignItems="flex-end" */ spacing={0}>
									<Grid item xs>
										<Typography
											color="textSecondary"
											align="right"
											variant="subtitle2" 
										>
											Active:
										</Typography>
										<Typography
											color="textSecondary"
											align="right"
											variant="subtitle2" 
										>
											Recovered:{'  '}
										</Typography>
										<Typography
											color="textSecondary"
											align="right"
											variant="subtitle2" 
										>
											Death:
										</Typography>
									</Grid>
									<Grid item xs>
										<Typography
											color="textSecondary"
											variant="subtitle2" 
										>
											<span style={{ color: '#000000', paddingLeft: '7px' }}>
												{numberFormat.format(country.active)}
											</span>
										</Typography>
										<Typography color="textSecondary" variant="subtitle2" >
											<span style={{ color: '#000000', paddingLeft: '7px' }}>
												{numberFormat.format(country.recovered)}
											</span>
										</Typography>

										<Typography color="textSecondary" variant="subtitle2" >
											<span style={{ color: '#000000', paddingLeft: '7px' }}>
												{numberFormat.format(country.deaths)}
											</span>
										</Typography>
									</Grid>
								</Grid>
								{/*  { new Date(updated).toDateString() */}
							</ListItem>
							<Divider />
						</List>
					</Fragment>
				))}
				{/* </Box> */}
			</Grid>
		);
	}
}
