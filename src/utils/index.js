export const mapApiData = (arr = []) => {
	return arr.length ? arr.map(data=> {
		return  {value: data.k , label: data.n}
		
	} ) : []
};