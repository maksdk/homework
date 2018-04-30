//d3ed5fbf5e7fc2079a236434b5db8cc7b0116f8c
//aae62fab9956d5f
export default (
   section, 
   sort, 
   page, 
   period
) => dispatch => {
  let url = `https://api.imgur.com/3/gallery/${section}/${sort}/${period}/${page}?album_previews=true`;
  let settings = {
      "async": true,
      "crossDomain": true,
      "method": "GET",
      "headers": {
            "authorization": "Client-ID aae62fab9956d5f"
    	}
  };
    
  fetch(url, settings)
      .then(response => {
         response.json()
         .then(({data}) => {
             dispatch({
                 type: page > 0 
                        ? "LOADING__WITH__SCROLLING" 
                        : 'FETCH__GALLERIES',
                 payload:{
                    data
                 }
             });
         })
      })
}
