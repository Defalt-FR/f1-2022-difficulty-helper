import React, {useState, useEffect } from 'react'
import InputNumber from 'react-input-number';

import { DateTime } from 'luxon'

export const MILLISECONDS_PER_MINUTE = 60000;
export const MILLISECONDS_PER_SECOND = 1000;
export const toMillis = (dtObject) => 
{
    console.debug(JSON.stringify(dtObject));
    return dtObject.minute * MILLISECONDS_PER_MINUTE + dtObject.second * MILLISECONDS_PER_SECOND + dtObject.millisecond;
}


function ChronoTime(props) {
  let time = DateTime.fromMillis(props.value)  

  const [timeMin, setTimeMin] = useState()
  const [timeSec, setTimeSec] = useState()
  const [timeMs, setTimeMs] = useState()

  const handleChange =  (unit, selection) => 
        {  
          var newTime, newTimeStr;
          
          console.log('Unit:', unit);
          console.log('Selection:', selection);
          console.log('State:', timeMin, timeSec, timeMs);

          switch(unit)
          {
              case 'm':                
                newTimeStr = ''.concat(selection, ':', timeSec, ':', timeMs);
                setTimeMin(selection)
                break;
              
              case 's':                  
                newTimeStr = ''.concat(timeMin, ':', selection, ':', timeMs);
                setTimeSec(selection)
                break;
              
              case 'ms':
                newTimeStr = ''.concat(timeMin, ':', timeSec, ':', selection);
                setTimeMs(selection)
                break;
  
              default:
                break;
          
          }
          
          newTime = DateTime.fromFormat(newTimeStr, "m:s:SSS");
          props.setLap(toMillis(newTime)); //update the "lap" state in App.js  
        } 


  useEffect(() => {
    // this let you "init" all 3 states of the ChronoTime component to the current lap (stored in App.js component) infos (min, sec & ms)
    // and prevent it to be reset at every re-render of the app, which was happening before
    let time = DateTime.fromMillis(props.value)
    setTimeMin(time.minute)
    setTimeSec(time.second)
    setTimeMs(time.millisecond)
  },[])

  return (
      <span class='chrono-number mt-4'>
                <InputNumber
                    id='timeMin'
                    className='chrono-number'
                    type='number'
                    autocomplete
                    min={0}
                    max={9}
                    step={1}
                    value={timeMin}
                    onChange={ (selection) => handleChange('m',selection) }
                />
                <span class='chrono-separator'>:</span>
                <InputNumber
                    id='timeSec'
                    className='chrono-number'
                    type='number'
                    min={0}
                    max={59}
                    step={1}
                    value={timeSec}
                    onChange={(selection) => handleChange('s', selection) }
                />
                <span class='chrono-separator'>.</span>
                <InputNumber
                    id='timeMili'
                    className='chrono-number chrono-number-wide'
                    type='number'
                    min={0}
                    max={999}
                    step={1}
                    value={timeMs}
                    onChange={(selection) => handleChange('ms',selection) }
                />
        </span> 
  )
}

export default ChronoTime;