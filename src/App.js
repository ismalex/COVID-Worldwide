import React, { Component } from 'react';
import { Grid, Box, Typography, Link } from '@material-ui/core';
import LanguageTwoToneIcon from '@material-ui/icons/LanguageTwoTone';
import GitHubIcon from '@material-ui/icons/GitHub';
import { CustomTabs, MapInfo } from './Components';

export default class App extends Component {
	render() {
		return (
			<Grid container spacing={2}>
				<Grid item xs={12} md={3} lg>
					<Box p={2}>
						<Typography variant="h2" fontWeight="fontWeightBold">
							<LanguageTwoToneIcon style={{ fontSize: 40 }} />
							COVID-19 WorldWide
						</Typography>
						<br />
						<br />
						<Link href="http://github.com/ismalex">
							<div style={{ display: 'flex' }}> 
								<GitHubIcon style={{ fontSize: 20 }} />/ismalex
							</div>
						</Link>
						<CustomTabs />
					</Box>
				</Grid>
				<Grid item xs={12} md={9} lg={9} style={{ overflow: 'none',}}>
					<MapInfo />
				</Grid>
			</Grid>
		);
	}
}
