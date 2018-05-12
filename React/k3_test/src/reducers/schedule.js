import {
   SET__NEW__TIME,
   CHECK__ALL__DAY,
   CLEAR__ALL__WEEK,
   FETCH__DATA__REQUEST
} from "../actions/actions.js";

export default (state = {}, action) => {
   if (action.type === FETCH__DATA__REQUEST) {
      return Object.assign({}, state, action.payload);
   } else if (action.type === SET__NEW__TIME) {
      let { dayName, newStart, newEnd } = action.payload;
      let allDay = state[dayName];
      let marge = true;

      if (!allDay.length) {
         allDay.push({ bt: newStart, et: newEnd });
      } else {
         for (let index = 0; index < allDay.length; index++) {
            let oldStart = allDay[index].bt;
            let oldEnd = allDay[index].et;

            if (oldStart < newStart && newEnd < oldEnd) {
               let cut = [
                  { bt: oldStart, et: newStart - 1 },
                  { bt: newEnd + 1, et: oldEnd }
               ];
               allDay.splice(index, 1, ...cut);
               marge = false;
               break;
            } else if (oldStart === newStart && newEnd < oldEnd) {
               allDay[index].bt = newEnd + 1;
               marge = false;
               break;
            } else if ( oldStart === newStart && newEnd === oldEnd) {
               allDay.splice(index, 1);
               marge = false;
               break;
            } else if (oldStart < newStart &&newEnd === oldEnd) {
               allDay[index].et = newStart - 1;
               marge = false;
               break;
            }
         }
         if (marge) {
            allDay.push({ bt: newStart, et: newEnd });
            allDay.sort(sortIntervals);
            
            for (let index = 1; index < allDay.length;index++) {
               let prevStart = allDay[index - 1].bt;
               let prevEnd = allDay[index - 1].et;
               let currentStart = allDay[index].bt;
               let currentEnd = allDay[index].et;
               if (currentStart <= prevEnd + 1) {
                  allDay.splice(index - 1, 2);
                  allDay.splice(index - 1, 0, {
                     bt: prevStart,
                     et: currentEnd
                  });
                  index = index - 1;
               }
            }
            function sortIntervals(interval_1, interval_2) {
               return interval_1.bt - interval_2.bt;
            }
         }
      }
      return Object.assign({}, state);
   } else if (action.type === CHECK__ALL__DAY) {
      let dayName = action.payload;
      if (JSON.stringify(state[dayName]) ===
         JSON.stringify([{ bt: 0, et: 1439 }])) {
         state[dayName] = [];
      } else {
         state[dayName] = [{ bt: 0, et: 1439 }];
      }
      return Object.assign({}, state);
   } else if (action.type === CLEAR__ALL__WEEK) {
      Object.keys(state).map(key => {
         state[key] = [];
      });
      return Object.assign({}, state);
   }
   return Object.assign({}, state);
};
