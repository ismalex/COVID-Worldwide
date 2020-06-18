import React, { Component, Fragment } from 'react';
import Select from 'react-select';
import Cards from '../InfoCards/Cards';
import { fetchCountriesData } from '../../api';

export default class SelectCountry extends Component {
	state = {
		CountriesList: [],
		SelectedCountryInfo: null
	};

	async componentDidMount() {
		const dataFromApi = await fetchCountriesData();
		this.setState({ CountriesList: dataFromApi });
	}

	onChangeInput = (selectedValue) => {
		if(selectedValue) {
			this.setState({ SelectedCountryInfo: selectedValue.value });
		} 
		 /* console.log('selected', selectedValue.value) */
	};

	render() {
		const { CountriesList } = this.state;


		const style = {
			width: '30px',
			marginRight: '10px',
		/* 	display: 'inline-block' */
		};

		const dataInfo = CountriesList.map((opt) => ({ label: opt.country, value: opt }));
		/* console.log(dataInfo) */

		const formatOptionLabel = ({ label, value }) => (
			<div style={{ display: 'flex' }}> {/* CHANGE STYLES TO CLASSES */}
				<img src={value.countryInfo.flag} style={style} alt="" />
				{label}
			</div>
		);

		return (
			<Fragment>
				<Select
					formatOptionLabel={formatOptionLabel}
					onChange={this.onChangeInput}
					options={dataInfo}
					placeholder="Select or search a country"
					classNamePrefix="select"
					autoFocus
					isSearchable
					isClearable
				/>
				{/* <br /> */}
				<Cards cardInfo={this.state.SelectedCountryInfo} />
			</Fragment>
		);
	}
}
