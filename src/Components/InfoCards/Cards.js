import React, { Fragment } from 'react';
import { Card, CardContent, Typography, Grid, Box } from '@material-ui/core';
import CountUp from 'react-countup';

/* const spanInfo = makeStyles({
	box: { */
	/* 	borderRadius: 10,
		fontSize: '1rem',
		fontWeight: 700,
		margin: 8,
		border: 'solid 1px',
		padding: 8 */
		/* borderColor: 'red', */
		/* color: 'red' */
/* 	}
}); */

/* const MyButton = styled(Button)({
	background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
	border: 0,
	borderRadius: 3,
	boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
	color: 'white',
	height: 48,
	padding: '0 30px',
  });
  
  export default function StyledComponents() {
	return <MyButton>Styled Components</MyButton>;
  }
 */

export default function Cards(props) {
/* 	const classes = spanInfo(); */
	const numberFormat = new Intl.NumberFormat();

	if (!props.cardInfo) {
		return null;
		/* return <CircularProgress size={15} />; */
	}

	const { active, recovered, deaths, todayCases, todayDeaths, todayRecovered, updated } = props.cardInfo;

	return (
		<Fragment>
			<Grid item component={Card} xs={12} /* variant="outlined" */>
				<CardContent p={0}>
					<Typography color="textSecondary" gutterBottom>
						Infected
					</Typography>
					<Typography variant="h5" gutterBottom>
						<CountUp start={0} end={active} duration={2.5} separator="," />
						{/* 	<Box component="span" className={classes.root} color="error.main" borderColor="error.main">
							+{numberFormat.format(todayCases)} Today
						</Box> */}
						<Box
							component="span"
							m={1}
							p={1}
							border={1}
							color="error.main"
							borderColor="error.main"
							borderRadius={10}
							fontSize="subtitle1.fontSize"
							fontWeight="fontWeightBold"
						>
							+{numberFormat.format(todayCases)} Today
						</Box>
					</Typography>
					<Typography variant="body2" color="textSecondary" gutterBottom>
						Number of Active Cases
					</Typography>
				</CardContent>
			</Grid>
			<Grid item xs component={Card} /* variant="outlined" */>
				<CardContent>
					<Typography color="textSecondary" gutterBottom>
						Recovered
					</Typography>
					<Typography variant="h5" gutterBottom>
						<CountUp start={0} end={recovered} duration={2.5} separator="," />
						<Box
							component="span"
							m={1}
							p={1}
							border={1}
							color="blue"
							borderColor="blue"
							borderRadius={10}
							fontSize="subtitle1.fontSize"
							fontWeight="fontWeightBold"
						>
							+{numberFormat.format(todayRecovered)} Today
						</Box>
					</Typography>
					<Typography variant="body2" color="textSecondary" /* gutterBottom */>
						Number of Recovered Cases
					</Typography>
				</CardContent>
			</Grid>
			<Grid item xs component={Card} /* variant="outlined" */ >
				<CardContent>
					<Typography color="textSecondary" gutterBottom>
						Deaths
					</Typography>
					<Typography variant="h5" gutterBottom>
						<CountUp start={0} end={deaths} duration={2.5} separator="," />
						<Box component="span"
							m={1}
							p={1}
							border={1}
							color="grey.500"
							borderColor="grey.500"
							borderRadius={10}
							fontSize="subtitle1.fontSize"
							fontWeight="fontWeightBold">
							+{numberFormat.format(todayDeaths)} Today
						</Box>
					</Typography>
					<Typography variant="body2" color="textSecondary" /* gutterBottom */>
						Number of Deaths
					</Typography>
				</CardContent>
			</Grid>
			<Typography variant="subtitle2" color="textSecondary">
				Updated {new Date(updated).getMinutes()} minutes ago.
			</Typography>
		</Fragment>
	);
}
