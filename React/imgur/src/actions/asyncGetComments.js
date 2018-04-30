export default id => dispatch => {
    let url = `https://api.imgur.com/3/gallery/${id}/comments`;
	let settings = {
		"async": true,
        "crossDomain": true,
        "method": "GET",
        "headers": {
            "authorization": "Client-ID aae62fab9956d5f"
    	}
	}
    
    fetch(url, settings)
        .then(response => {
            response.json()
            .then(({data}) => {
                dispatch({
                    type: 'FETCH__COMMENTS',
                    payload:{
                       data
                    }
                });
            })
        })
}