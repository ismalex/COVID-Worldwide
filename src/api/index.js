import axios from 'axios';

const baseURL = 'https://disease.sh/v2';
// API calls for all the information to be used on the App

// General global information
export const fetchGlobalData = async () => {
	try {
		// Object destructuring
		// const response = await axios.get(baseURL);
		//const { data } = response;
		// all above in one line
		const {
			data: { active, cases, deaths, recovered, updated, todayCases, todayDeaths, todayRecovered }
		} = await axios.get(`${baseURL}/all`);
		const modifiedData = {
			active,
			cases,
			recovered,
			deaths,
			updated,
			todayCases,
			todayDeaths,
			todayRecovered
		};

		// return await axios.get(`${baseURL}/all`);
		return modifiedData;
	} catch (exception) {}
};

//Axios and .then examples
/* export const fetchCountryData = () =>{
    axios
        .get(`${baseURL}countries`)
        .then((response) => {
            const data = response;
            return data;
        })
        .catch(err => { console.log(err)})
} */

export const fetchCountriesData = async () => {
	try {
		//
		const { data } = await axios.get(`${baseURL}/countries`);
		return data;

	} catch (exeption) {}
};

// get the top 15 positions from the array
function getTopCountries(array) {
	const size = 15;
	let topItems = array.slice(0, size);
	return topItems;
}

//Top countries information
export const fetchSortedCountriesData = async () => {
	try {
		//https://disease.sh/v2/countries?yesterday=true&sort=cases&allowNull=false
		//const info =
		const { data } = await axios.get(`${baseURL}/countries?yesterday=true&sort=cases&allowNull=false`);
		const countries = getTopCountries(data);
		return countries;
	} catch (exeption) {}
};
