import React, { Component } from 'react';
import { matrix } from './static/matrix.js';

class App extends Component {
   constructor(props) {
      super(props);
      this.state = {
         matrix: matrix
      }
      this.onClickCell = this.onClickCell.bind(this);
      this.resetSelectedCell = this.resetSelectedCell.bind(this);
   }
   onClickCell(cell){
      let { matrix } = this.state;
      let typeCell = cell.type;
      let lengthRow = matrix[0].length;
      let lengthMatrix = matrix.length;
      
      this.resetSelectedCell(matrix);
      selectCell(cell.x, cell.y);

      this.setState({
         matrix: matrix
      })

      function selectCell(x, y) {
         matrix[x][y].isSelected = true;

         let leftCell = (x - 1 >= 0) && (matrix[x - 1][y].type === typeCell) && !matrix[x - 1][y].isSelected;
         let rightCell = (x + 1 < lengthMatrix) && (matrix[x + 1][y].type === typeCell) && !matrix[x + 1][y].isSelected;
         let topCell = (y - 1 >= 0) && (matrix[x][y - 1].type === typeCell) && !matrix[x][y - 1].isSelected;
         let bottomCell = (y + 1 < lengthRow) && (matrix[x][y + 1].type === typeCell) && !matrix[x][y + 1].isSelected;
         
         if (leftCell) selectCell(x - 1, y);
         if (rightCell) selectCell(x + 1, y);
         if (topCell) selectCell(x, y - 1);
         if (bottomCell) selectCell(x, y + 1);
      }  
   }
   resetSelectedCell(matrix) {
      matrix.map( row => (
         row.map( cell => (
            cell.isSelected = false
         ))
      ))
   }
   render() {
      let { matrix } = this.state;
      return (
         <div className='container'>
            <div className="matrix">
               {matrix && matrix.map( row => (
                     row.map( cell => (
                        <div
                           onClick={() => this.onClickCell(cell)}
                           className={`matrix__cell ${cell.type} ${cell.isSelected ? 'activeCell' : ''}`}
                           key={`${cell.x}${cell.y}`}
                        /> 
                     ))
                  ))
               }
            </div>
         </div>
      );
   }
}

export default App; 

