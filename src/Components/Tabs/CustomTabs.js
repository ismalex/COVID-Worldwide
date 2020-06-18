import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Tabs, Tab, Typography, Box, CircularProgress } from '@material-ui/core';
import { Cards, SelectCountry, CountriesList } from '../index';
import { fetchGlobalData } from '../../api';

const AntTabs = withStyles({
	root: {
		display: 'inline-grid',
		backgroundColor: '#eee',
		borderRadius: 10,
		minHeight: 10,
		minWidth: '100%',
		flexGrow: 1,
		margin: '15px 0'
	},
	flexContainer: {
		position: 'relative',
		padding: '0 2px',
		zIndex: 1
	},
	indicator: {
		top: 3,
		bottom: 3,
		right: 0,
		height: 'auto',
		borderRadius: 8,
		backgroundColor: '#fff',
		boxShadow: '0 4px 12px 0 rgba(0,0,0,0.16)'
	}
})(Tabs);

const AntTab = withStyles((theme) => ({
	root: {
		textTransform: 'none',
		minHeight: 10,
		minWidth: 10,
		fontWeight: theme.typography.fontWeightRegular,
		/*marginRight: theme.spacing(0), */
		fontFamily: [
			'-apple-system',
			'BlinkMacSystemFont',
			'"Segoe UI"',
			'Roboto',
			'"Helvetica Neue"',
			'Arial',
			'sans-serif',
			'"Apple Color Emoji"',
			'"Segoe UI Emoji"',
			'"Segoe UI Symbol"'
		].join(','),
		'&:hover': {
			/* color: '#40a9ff', */
			fontWeight: 600
			/* opacity: 1 */
		},
		'&$selected': {
			color: '##00000',
			fontWeight: 600
		},
		'&:focus': {
			color: '#00000'
		}
	},
	selected: {}
}))((props) => <Tab disableRipple {...props} />);

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
}

export default class CustomizedTabs extends Component {

	state = {
		value: 0,
		countriesInfo: null
	};

	async componentDidMount() {
		const dataFromApi = await fetchGlobalData();
		this.setState({ countriesInfo: dataFromApi });
	}

	handleChange = (event, newValue) => {
		this.setState({ value: newValue });
	};

	render() {

		if (!this.state.countriesInfo) {
			return <CircularProgress size={15} />;
		}

		const { value, countriesInfo } = this.state;

		return (
			<Fragment>
				<AntTabs
					value={value}
					onChange={this.handleChange}
					aria-label="ant example"
					position="static"
					variant="fullWidth"
				>
					<AntTab label="Global" />
					<AntTab label="Countries" />
					<AntTab label="Top Affected" />
				</AntTabs>
				<TabPanel value={value} index={0}>
					<Cards cardInfo={countriesInfo} />
				</TabPanel>
				<TabPanel value={value} index={1}>
					<SelectCountry />
				</TabPanel>
				<TabPanel value={value} index={2} >
					<Box style={{maxHeight: 400, overflow: 'auto',}}>
						<CountriesList />
					</Box>
				</TabPanel>
			</Fragment>
		);
	}
}
