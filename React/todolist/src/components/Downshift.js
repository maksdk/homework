import React from 'react';
import Downshift from 'downshift'

export default function QuickSearch({items, onChange}) {
  return (
    <Downshift
      onChange={onChange}>
      {({
        getInputProps,
        getItemProps,
        isOpen,
        inputValue,
        selectedItem,
        highlightedIndex,
		}) => {
			
      		return (
      			<div className ="listTasks__quickSearch">
      				<div className ="listTasks__quickSearch--input">
	      				<span
	      					className ="listTasks__quickSearch--input--icon"
	      					children={<i className="fa fa-search" aria-hidden="true"></i>}
	      				/>
	      				
				        	<input 

				        		className ="listTasks__quickSearch--field"
				        		{...getInputProps({placeholder: ' Быстрый поиск задачи...'})} 
	      				/>
      				</div>
			         {isOpen ? (
			            <div 
			            	className ="listTasks__quickSearch--select"
			            >
			               {items
			               .filter( i =>
			                    !inputValue ||
			                    i.toLowerCase().includes(inputValue.toLowerCase()),
			               )
			               .map((item, index) => (
				               <div
				                 	{...getItemProps({item})}
				                 	className ="listTasks__quickSearch--select--items"
				                  key={item}
				                  // style={{
				                  //    backgroundColor:
				                  //       highlightedIndex === index ? 'gray' : 'white',
				                  //    fontWeight: 
				                  //    	selectedItem === item ? 'bold' : 'normal',

				                  // }}
				               >
				                  
				                    {item}
				               </div>
			                ))}
			            </div>
			          ) : null}
			      </div>
      		);
      	}
  	}
    </Downshift>
  )
}

// function App() {
//   return (
//     <BasicAutocomplete
//       items={['apple', 'orange', 'carrot']}
//       defaultSelectedItem='maks'
//       onChange={selectedItem => console.log(selectedItem)}
//     />
//   )
// }

