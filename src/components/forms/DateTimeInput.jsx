import { useState, useRef, useEffect } from "react";
import styled from "styled-components";

/* 
  <DateTimeInput labels="Schedule Call Date" names='scheduled_date' requires={true} defaultValues="2023-02-27T23:40:00+01:00"/>
*/

const DateTimeInput = (props) =>{
  const [dateObject, setDateObject] = useState('')
  const [defaultDateObjects, setDefaultDateObjects] = useState(
    (props.defaultValues) ? new Date(props.defaultValues) : false
  )
  const [date, setDate] = useState({
    day: "",
    month: "",
    year: "",
    hour: "",
    minute: ""
  });

  const dayInputRef = useRef(null);
  const monthInputRef = useRef(null);
  const yearInputRef = useRef(null);
  const hourInputRef = useRef(null);
  const minuteInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const numericValue = value.replace(/[^0-9]/g, '');
    setDate((prevDate) => ({
      ...prevDate,
      [name]: numericValue
    }));

    if (name === "day" && numericValue.length === 2) {
      monthInputRef.current.focus();
    } else if (name === "month" && numericValue.length === 2) {
      yearInputRef.current.focus();
    } else if (name === "year" && numericValue.length === 4) {
      hourInputRef.current.focus();
    } else if (name === "hour" && numericValue.length === 2) {
      minuteInputRef.current.focus();
    }
  };

  const lessThanTen = (num) =>{
    if (num < 10){
        return `0${num}`
    }
    else{
        return num
    }

  }
  if (defaultDateObjects && typeof(defaultDateObjects) === 'object') {
    // Handle default date time.
    setDate({
      day: lessThanTen(defaultDateObjects.getDate()),
      month: lessThanTen(defaultDateObjects.getMonth() + 1),
      year: defaultDateObjects.getFullYear(),
      hour: lessThanTen(defaultDateObjects.getHours()),
      minute: lessThanTen(defaultDateObjects.getMinutes())
    })

    setDefaultDateObjects(false)

  }

  const setToday = (add) =>{
    // add is used to add additional day for tomorrow
    const dateObjects = new Date();
    setDate({
        day: lessThanTen(dateObjects.getDate()+add),
        month: lessThanTen(dateObjects.getMonth() + 1),
        year: dateObjects.getFullYear(),
        hour: lessThanTen(dateObjects.getHours()),
        minute: lessThanTen(dateObjects.getMinutes())
    })
  }

  const clearDate = () =>{
    setDate({
        day: "",
        month: "",
        year: "",
        hour: "",
        minute: ""
    })
  }

    useEffect(()=>{
        setDateObject(`${date.year}-${date.month}-${date.day} ${date.hour}:${date.minute}:00.000000`)
    },[date.year, date.month, date.day, date.hour, date.minute])

  return (
    <div className={props.names} >
        <div className="field">
            <h5 className='mt-3'>{props.labels}</h5>
            <input type="text" hidden value={(dateObject && date.day) ? dateObject : null} name={props.names} />
        <DateInputContainer>
          <div className="date_wrapper">
            <input
                type="text"
                name="day"
                value={date.day}
                onChange={handleChange}
                maxLength="2"
                placeholder="DD"
                ref={dayInputRef}
                required={props.requireds}
            />
            <input
                type="text"
                name="month"
                value={date.month}
                onChange={handleChange}
                maxLength="2"
                placeholder="MM"
                ref={monthInputRef}
                required={props.requireds}
            />
            <input
                type="text"
                name="year"
                value={date.year}
                onChange={handleChange}
                maxLength="4"
                placeholder="YYYY"
                ref={yearInputRef}
                className="date_year"
                required={props.requireds}
            />
            </div>
            <div>-</div>
            <div className="time_wrapper">
              <input
                  type="text"
                  name="hour"
                  value={date.hour}
                  onChange={handleChange}
                  maxLength="2"
                  placeholder="HH"
                  ref={hourInputRef}
                  required={props.requireds}
              />
              <input
                  type="text"
                  name="minute"
                  value={date.minute}
                  onChange={handleChange}
                  maxLength="2"
                  placeholder="MM"
                  ref={minuteInputRef}
                  required={props.requireds}
              />
            </div>
            </DateInputContainer>
            <ReactAutoDate className="auto_date">
                <span className="set_today" onClick={()=>setToday(0)}>Today</span>
                <span className="separator">|</span>
                <span className="set_tomorrow" onClick={()=>setToday(1)}>Tomorrow</span>
                <span className="separator">|</span>
                <span className="clear_date" onClick={clearDate}>Clear</span>
            </ReactAutoDate>
        </div>
    </div>
  );
}

export default DateTimeInput

const DateInputContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 200px;
    position: relative;
    margin-top: 25px;

    .date_wrapper,
    .time_wrapper{
      display: flex;
    }
    input{
        width: 60px;
        height: 50px;
        text-align: center;
        border: var(--borderDefault);
        border-radius: 5px;
        margin: 0 5px;
        outline: none;
        &:focus {
            border-color: var(--ViridianGreen);
        }
    } 
    input.date_year{
        width: 70px;
    }
    @media(max-width: 500px){
      display: block;
    }
`;

const ReactAutoDate = styled.p`
    span{
        display: inline-block !important;
        color: var(--ViridianGreen);
        &.separator{
            color: grey;
            margin-right: 10px;
            margin-left: 10px;
        }
    }
    span.set_today, 
    span.set_tomorrow, 
    span.clear_date{
        cursor: pointer;
    }
`;
