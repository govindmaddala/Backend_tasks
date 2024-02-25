import React, { useState, useEffect } from 'react';
import styles from '../Components/css/Toolbox_edit.module.css';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { styled } from '@mui/system';
import axios from "axios";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { useParams } from 'react-router-dom';
import { NavLink } from "react-router-dom";
import removeicon from "../../src/Components/removeicon.png";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";

const StyledTimePicker = styled(TimePicker)({
    width: '200px',
    height:"35px",
    border: 'none',
  });
  const StyledDatePicker = styled(DatePicker)({
    width: '220px',
    height:'10px',
    border: 'none',
  });

  const CustomDatePicker = styled(DatePicker)(({ theme }) => ({
    "& .MuiPickersBasePicker-pickerView": {
      backgroundColor: "#DADCE0",
      width: "150px",
      
    },
    "& .MuiOutlinedInput-root": {
      height: "35px",
     
      "&:hover": {
        "& fieldset": {
          borderColor: "#DADCE0",
          
          
        },
      },
      "&:not(.Mui-focused)": {
        "& fieldset": {
          borderColor: "#DADCE0",
          borderRadius: "8px",
          
        },
      },
      "&.Mui-focused": {
        "& fieldset": {
          borderColor: "#DADCE0",
          borderRadius: "8px",
          
        },
      },
    },
  }));



const Toolbox_edit = (props) => {
    const { selectedDate } = useParams();
    const decodedDate = decodeURIComponent(selectedDate);
    const [superexpand, setsuperexpand] = useState(false);
    const [projects,setProjects]=useState([]);
    const [attendexpand, setattendexpand] = useState(false);
    const [SuperArray, setSuperArray] = useState([]);
    const [TechArray, setTechArray] = useState([]);
    const [TrainArray, setTrainArray] = useState([]);
    const [AttendArray, setAttendArray] = useState([]);
    const [MergedArray, setMergedArray] = useState([]);
    const [selAttendArray, setselAttendArray] = useState([]);
    const [selSuperArray, setselSuperArray] = useState([]);
    const currentDate = new Date();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [deleteTaskDetails,setDeleteTaskDetails] = useState();
    const [selectedIndex, setSelectedIndex] = useState(false);
    const hours = currentDate.getHours().toString().padStart(2, '0');
    const minutes = currentDate.getMinutes().toString().padStart(2, '0');
    const currentTime = `${hours}:${minutes}`;
    const temparray = ['Element 1', 'Element 2', 'Element 3', 'Element 4'];
    const [removeSelected,setRemoveSQP] = useState(false)
    const [formdata, setformdata] = useState({
        date:"",
        time:"",
        conducted:""
    })
    const [dbdetails, setdbdetails] = useState([]);
    const [taskdetails, settaskdetails] = useState([]);
    const [taskDetails, setTaskDetails] = useState([]);
    useEffect(() => {
        async function fetchRigDetails() {
          try {
            const response = await axios.get(
              "http://localhost:8002/api/data/techworkshop_data"
            );
    
            console.log(response.data);
    
            const dataObject = response.data.data[0];
            
    
            const superarray1 = dataObject.Supervisor.split(",");
            const techarray1 = dataObject.Technicians.split(",");
            const trainarray1 = dataObject.Trainee.split(",");
            console.log(superarray1);
            setSuperArray(superarray1);
            setTechArray(techarray1);
            setTrainArray(trainarray1);
            setAttendArray([...techarray1, ...trainarray1]);
            setMergedArray([...superarray1, ...techarray1, ...trainarray1]);
            } catch (error) {
            console.error(error);
          }
        }
        fetchRigDetails();
      }, []);

      useEffect(() => {
        const fetchProjects = async () => {
          try {
            const response = await axios.get(
              "http://localhost:8002/api/data/workshop_project_details"
            );
            setProjects(response.data.data);
          } catch (error) {
            console.error(error);
          }
        };
    
        fetchProjects();
      }, []);

      useEffect(() => {
        async function fetchRigDetails() {
          try {
            const response = await axios.get(
                `http://localhost:8002/api/data/toolbox_talk_get?seldate=${decodedDate}`
              );
              const modifiedData = response.data.data.map(item => ({
                s_no: item.S_no,
                job_description: item.Task_description,
                project_so: item.Project_so.split(","),
                team:item.Team_assigned.split(","),
                target_units: item.Target_units,
                number: item.UOM,
                additional_tools: item.Additional_Tools,
                expand: false,
                project_expand: false,
                team_expand: false
              }));
                setdbdetails(modifiedData);
                setselAttendArray(response.data.data[0]?.Attendees.split(","));
                setselSuperArray(response.data.data[0]?.Supervisors.split(","));

                setformdata({
                    date:response.data.data[0]?.Date,
                    time : response.data.data[0]?.Time,
                    conducted: response.data.data[0]?.Conducted_by
                })
                console.log(modifiedData);

            } catch (error) {
            console.log(error);
          }
        }
        fetchRigDetails();
      }, []);

    const handleaddtask = () => {
        let temp = [...taskdetails];
        temp.push({
            expand: true,
            job_description:"",
            project_so:[],
            team:[],
            target_units:"",
            number:"Nos",
            additional_tools:"",
            project_expand: false,
            team_expand: false
        });
        settaskdetails(temp);
    }

    const handleexpand = (e, index) => {
        e.stopPropagation();
        let temp = [...taskdetails];
        temp[index].expand = !temp[index].expand;
        temp[index].project_expand = false;
        temp[index].team_expand = false;
        settaskdetails(temp);
    }
    const dbhandleexpand = (e, index) => {
        e.stopPropagation();
        let temp = [...dbdetails];
        temp[index].expand = !temp[index].expand;
        temp[index].project_expand = false;
        temp[index].team_expand = false;
        setdbdetails(temp);
    }

    const handleRemove = (e,index) =>{
        e.stopPropagation();
        setIsModalOpen(true);
          setSelectedIndex(index);
    }

    const handleYesClick = (index) => {
        let temp = [...taskdetails];
        console.log('Before Splice:', temp); // Log the array before splice
      
        // Ensure that the index is within the valid range
        if (index >= 0 && index < temp.length) {
          temp.splice(index, 1); // Remove the task at the specified index
          setTaskDetails(temp);
          setIsModalOpen(false);
        } else {
          console.error("Invalid index:", index);
        }
      };
      
      
      
      
    
      const handleNoClick = () => {
        // Close the modal without removing the row
        setIsModalOpen(false);
      };
    

    const handletaskdiv = (e, index) => {
        e.stopPropagation();
        let temp = [...taskdetails];
        temp[index].team_expand = false;
        temp[index].project_expand = false;
        settaskdetails(temp);
    }
    const handletimedatediv = (e) => {
        e.stopPropagation();
        setsuperexpand(false);
        setattendexpand(false);
    }
    const handleattendexpand = (e) => {
        e.stopPropagation();
        setattendexpand(!attendexpand);
        setsuperexpand(false);
    }
    const handlesuperexpand = (e) => {
        e.stopPropagation();
        setsuperexpand(!superexpand);
        setattendexpand(false);
    }
    const handleChangeattend = (e, index) => {
        const { value, checked } = e.target;
        if(checked){
           let temp = [...selAttendArray];
            temp.push(AttendArray[index]);
            setselAttendArray(temp);
        } else{
            let temp = selAttendArray.filter( (el) => {
                return el !== value;
            })
            setselAttendArray(temp);
        }
    }
    const handleChangesuper = (e, index) => {
        const { value, checked } = e.target;
        if(checked){
           let temp = [...selSuperArray];
            temp.push(SuperArray[index]);
            setselSuperArray(temp);
        } else{
            let temp = selSuperArray.filter( (el) => {
                return el !== value;
            })
            setselSuperArray(temp);
        }
    }
    const dbhandlechange33 = (e, index, ind) => {
        const { name, value, checked } = e.target;
        if(checked){
            let temp = [...dbdetails]
            temp[index][name].push(value);
            setdbdetails(temp);
         } else{
             let temp = [...dbdetails]
             temp[index][name] = temp[index][name].filter((el) => {
                return el !== value;
             })
             setdbdetails(temp);
         }
    }

    const dbhandlechange3 = (e, index, ind) => {
        const { name, value } = e.target;
        let temp = [...dbdetails];
        
        // Uncheck all options in the array for the specified 'name'
        temp[index][name] = [];
    
        // Check the selected option
        temp[index][name] = [value];
        
        setdbdetails(temp);
    }

    const handlechange33 = (e, index, ind) => {
        const { name, value, checked } = e.target;
        if(checked){
            let temp = [...taskdetails]
            temp[index][name].push(value);
            settaskdetails(temp);
         } else{
             let temp = [...taskdetails]
             temp[index][name] = temp[index][name].filter((el) => {
                return el !== value;
             })
             settaskdetails(temp);
         }
    }

    const handlechange3 = (e, index, ind) => {
        const { name, value } = e.target;
        let temp = [...taskdetails];
        
        // Uncheck all options in the array for the specified 'name'
        temp[index][name] = [];
    
        // Check the selected option
        temp[index][name] = [value];
        
        settaskdetails(temp);
    }

    const dbhandleprojectexpand = (e, index) => {
        e.stopPropagation();
        let temp = [...dbdetails];
        temp[index].project_expand = !temp[index].project_expand;
        setdbdetails(temp);
    }
    const handleprojectexpand = (e, index) => {
        e.stopPropagation();
        let temp = [...taskdetails];
        temp[index].project_expand = !temp[index].project_expand;
        settaskdetails(temp);
    }
    const dbhandleteamexpand = (e, index) => {
        e.stopPropagation();
        let temp = [...dbdetails];
        temp[index].team_expand = !temp[index].team_expand;
        setdbdetails(temp);
    }
    const handleteamexpand = (e, index) => {
        e.stopPropagation();
        let temp = [...taskdetails];
        temp[index].team_expand = !temp[index].team_expand;
        settaskdetails(temp);
    }

    const checksuper = (e) => {
        e.stopPropagation();
        setsuperexpand(true);
    }
    const checkattend = (e) => {
        e.stopPropagation();
        setattendexpand(true);
    }

    const checkproject = (e, index) => {
        e.stopPropagation();
        let temp = [...taskdetails];
        temp[index].project_expand = true;
        settaskdetails(temp);
    }

    const dbcheckproject = (e, index) => {
        e.stopPropagation();
        let temp = [...dbdetails];
        temp[index].project_expand = true;
        setdbdetails(temp);
    }

    const checkteam = (e, index) => {
        e.stopPropagation();
        let temp = [...taskdetails];
        temp[index].team_expand = true;
        settaskdetails(temp);
    } 
    const dbcheckteam = (e, index) => {
        e.stopPropagation();
        let temp = [...dbdetails];
        temp[index].team_expand = true;
        setdbdetails(temp);
    }

    const handlechange = (e) => {
        const {name, value} = e.target;
        if(name === 'date'){
            setformdata((prevData) => ({
                ...prevData,
                [name]: value,
              }));
        }
        else {
            setformdata((prevData) => ({
            ...prevData,
            [name]: value,
            }));
        }
    }
    const handlechangedate = (name, value) => {
        const selectedDate2 = value?.format("DD/MM/YYYY");
        setformdata((prevData) => ({
            ...prevData,
            [name]: selectedDate2,
        }))
        
    }
    const handledbdiv = (e, index) => {
        e.stopPropagation();
        let temp = [...dbdetails];
        temp[index].team_expand = false;
        temp[index].project_expand = false;
        setdbdetails(temp);
    }
    const dbhandlechange2 = (e, index) => {
        const {name, value} = e.target;
        let temp = [...dbdetails]
        temp[index][name] = value;
        setdbdetails(temp);
    }
    const handlechange2 = (e, index) => {
        const {name, value} = e.target;
        let temp = [...taskdetails]
        temp[index][name] = value;
        settaskdetails(temp);
    }
    const handlesubmit = async (e) => {
        e.preventDefault();
        const {
          date,
          time,
          conducted,
        } = formdata;

        let showAlert = false;

        taskdetails.map((el, index) => {
            if(el.project_so.length == 0){
                console.log(el.project_so)
                showAlert = true;
                return;
            }
        })

        if (showAlert) {
            alert("Add Project to every task");
            return;
          }
      
        const superarray = selSuperArray.join(",");
        const attendarray = selAttendArray.join(",");
        if(dbdetails && dbdetails.length > 0){
            await Promise.all(
                dbdetails.map(async (el, index) => {
                  const {
                    job_description,
                    target_units,
                    number,
                    additional_tools,
                  } = el;
            
                  const selteam = el.team.join(",");
                  const selproject = el.project_so.join(",");
                  const payload = {
                    Date: date,
                    Time: time,
                    Conducted_by: conducted,
                    Supervisors: superarray,
                    Attendees: attendarray,
                    Task_description: job_description,
                    Project_so: selproject,
                    Team_assigned: selteam,
                    Additional_Tools: additional_tools,
                    Target_units: target_units,
                    UOM: number,
                  };
            
                  try {
                    const res = await axios.put(`http://localhost:8002/api/data/toolbox_talk_update?s_no=${el.s_no}`, payload);
                      console.log(res);
                  } catch (error) {
                    console.log("Error:", error);
                  }
                })
              ); 
        }

        if(taskdetails && taskdetails.length > 0){
            await Promise.all(
                taskdetails.map(async (el, index) => {
                  const {
                    job_description,
                    target_units,
                    number,
                    additional_tools,
                  } = el;
            
                  const selteam = el.team.join(",");
                  const selproject = el.project_so.join(",");
                  const payload = {
                    Date: date,
                    Time: time,
                    Conducted_by: conducted,
                    Supervisors: superarray,
                    Attendees: attendarray,
                    Task_description: job_description,
                    Project_so: selproject,
                    Team_assigned: selteam,
                    Additional_Tools: additional_tools,
                    Target_units: target_units,
                    UOM: number,
                  };
            
                  try {
                    const res = await axios.post("http://localhost:8002/api/data/toolbox_talk_insert", payload);
                      console.log(res);
                  } catch (error) {
                    console.log("Error:", error);
                  }
                })
              );
        }

        window.location = `/toolbox_edit_table/${encodeURIComponent(decodedDate)}`;

        // settaskdetails([{
        //     expand: true,
        //     job_description:"",
        //     project_so:[],
        //     team:[],
        //     target_units:"",
        //     number:"Nos",
        //     additional_tools:"",
        //     project_expand: false,
        //     team_expand: false
        // }]);
        // setformdata({
        //     date:currentDate.toISOString().split('T')[0],
        //     time:currentTime,
        //     conducted:"shubham"
        // })
        // setselAttendArray([]);
        // setselSuperArray([]);
      };
      

return(
    <>
   
    <div className={styles.maindiv}>
        <div onClick={handletimedatediv}>
        <div className={styles.backsvg}>
        <NavLink to={`/toolbox_edit_table/${encodeURIComponent(decodedDate)}`}><svg xmlns="http://www.w3.org/2000/svg" width="26" height="24" viewBox="0 0 26 24" fill="none">
<path d="M0.939342 10.9393C0.353556 11.5251 0.353556 12.4749 0.939342 13.0607L10.4853 22.6066C11.0711 23.1924 12.0208 23.1924 12.6066 22.6066C13.1924 22.0208 13.1924 21.0711 12.6066 20.4853L4.12132 12L12.6066 3.51472C13.1924 2.92893 13.1924 1.97919 12.6066 1.3934C12.0208 0.807611 11.0711 0.807611 10.4853 1.3934L0.939342 10.9393ZM26 10.5L2 10.5V13.5L26 13.5V10.5Z" fill="white"/>
</svg></NavLink>
            <h5>Toolbox Talk</h5>
        </div>
        <div className={styles.datetimediv}>
            <div>
                <label>Date: </label>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <CustomDatePicker
                            name="date"
                            value={dayjs(formdata.date, "DD/MM/YYYY")}
                            onChange={
                               (value) => handlechangedate("date", value)
                            }
                            slotProps={{ textField: { size: "small" } }}
                            format="DD/MM/YYYY"
                            sx={{
                              backgroundColor: "white",
                              borderRadius: "8px",
                            }}
                          />
                        </LocalizationProvider>
                {/* <input 
                    type='date'
                    name='date'
                    value={formdata.date}
                    onChange={handlechange}
                    style={{marginLeft:"50px"}}
                /> */}
            </div>
            <hr style={{borderTop: "2px solid #5B6BE1", height:"2px",backgroundColor:" black", marginTop:"20px"}}></hr>
            <div className={styles.timeinput}>
                <label>Time: </label>
                {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                <StyledTimePicker
                    label=""
                    value={formdata.time ? formdata.time : defaultTime}
                    name="time"
                    onChange={(value) => handlechange('time', value)}
                />
                </LocalizationProvider> */}
                <input
                    type='time'
                    name='time'
                    value={formdata.time}
                    onChange={handlechange}
                />
            </div>
            <div className={styles.timeinput}>
                <label>Conducted by: </label>
                <input 
                    type='text'
                    style={{width:"250px"}}
                    name="conducted"
                    value={formdata.conducted}
                    onChange={handlechange}
                />
            </div>
        </div>
        <div className={styles.superdiv}>
            <label>Supervisors: </label>
            <div >
                <div onClick={handlesuperexpand} className={styles.superselect}>
                {selSuperArray ? selSuperArray.join(', '): null}
                </div>
                {superexpand && <div className={styles.superselect2} onClick={checksuper}>

                    {SuperArray && SuperArray.map((el, index) => (
                        <div className={styles.optionsList}>
                        <h5>{el}</h5>
                        <input
                        type="checkbox"
                        value={el}
                        checked={selSuperArray.includes(el)}
                        onChange={(e) => handleChangesuper(e, index)}
                        />
                    </div>
                    )
                    )}
                
                </div>}
            </div>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{marginTop:"12px", marginLeft:"-45px"}}>
            <path d="M17.9188 8.17969H11.6888H6.07877C5.11877 8.17969 4.63877 9.33969 5.31877 10.0197L10.4988 15.1997C11.3288 16.0297 12.6788 16.0297 13.5088 15.1997L15.4788 13.2297L18.6888 10.0197C19.3588 9.33969 18.8788 8.17969 17.9188 8.17969Z" fill="black"/>
            </svg>

        </div>

        <div className={styles.attenddiv}>
            <label>Attendees: </label>
            <div >
                <div onClick={handleattendexpand} className={styles.attendselect}>
                    {selAttendArray ? selAttendArray.join(', '): null}
                </div>
                {attendexpand && <div className={styles.attendselect2} onClick={checkattend}>
                    {AttendArray && AttendArray.map((el, index) => (
                        <div className={styles.optionsList}>
                        <h5>{el}</h5>
                        <input
                        type="checkbox"
                        value={el}
                        checked={selAttendArray.includes(el)}
                        onChange={(e) => handleChangeattend(e, index)}
                        />
                    </div>
                    ))}
                    {/* {TrainArray && TrainArray.map((el, index) => (
                        <div className={styles.optionsList}>
                        <h5>{el}</h5>
                        <input
                        type="checkbox"
                        name="Month"
                        // value={(currentMonth % 12)+1}
                        // checked={filmonval.includes(((currentMonth % 12)+1).toString())}
                        // onChange={handleChange1}
                        />
                    </div>
                    ))} */}
                
                </div>}
            </div>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{marginTop:"12px", marginLeft:"-60px"}}>
                <path d="M17.9188 8.17969H11.6888H6.07877C5.11877 8.17969 4.63877 9.33969 5.31877 10.0197L10.4988 15.1997C11.3288 16.0297 12.6788 16.0297 13.5088 15.1997L15.4788 13.2297L18.6888 10.0197C19.3588 9.33969 18.8788 8.17969 17.9188 8.17969Z" fill="black"/>
            </svg>

        </div>
        </div>

        {dbdetails && dbdetails.map((el, index) => {
            // console.log(el.job_description);
            return (
                <>
                <div>
                <Modal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)} // Close the modal when clicked outside
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
                slots={{ backdrop: Backdrop }}
                slotProps={{
                  backdrop: {
                    timeout: 500,
                  },
                }}
                sx={{
                  backdropFilter: "blur(3px)",
                }}>
                {/* Modal content goes here */}
                <Fade in={isModalOpen}>
                  <Box
                    className={styles.ModalBox}
                    sx={{
                      width: 700,
                      height: 300,
                      p: 3,
                      backgroundColor: "#fff",
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      boxShadow: "5px 4px 20px 0px rgba(0, 0, 0, 0.2)",
                      borderRadius: "8px",
                    }}>
                    <label variant="h6" component="h2" className={styles.mstyl}>
                      Are you sure you want to remove row?
                    </label>
                    <label className={styles.mstyl1}>
                      (This will remove the row from all monthly attendance)
                    </label>
                    <button
                      style={{
                        marginLeft: "120px",
                      }}
                      className={styles.btnyes}
                      onClick={(e) => handleYesClick(selectedIndex)}>
                      Yes
                    </button>
                    <button className={styles.btnyes} onClick={handleNoClick}>
                      No
                    </button>
                  </Box>
                </Fade>
              </Modal>
              </div>
                <div  onClick={(e) => handledbdiv(e, index)}>
                    <div className={styles.taskdiv} onClick={(e) => dbhandleexpand(e, index)}>
                        <span>Task {index+1}</span>
                        <img src={removeicon} className={styles.ergonlogo} style={{marginLeft:"1020px",height:"23px"}} onClick={(e)=>handleRemove(e,index)}/>
                        {el.expand ? (<svg width="28" height="28" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                      
                        <path d="M7.60154 19.7754H15.389L22.4015 19.7754C23.6015 19.7754 24.2015 18.3254 23.3515 17.4754L16.8765 11.0004C15.839 9.96289 14.1515 9.96289 13.114 11.0004L10.6515 13.4629L6.63904 17.4754C5.80154 18.3254 6.40154 19.7754 7.60154 19.7754Z" fill="white"/>
                        </svg>):(
                            <svg width="28" height="28" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22.3985 10.2246L14.611 10.2246L7.59846 10.2246C6.39846 10.2246 5.79846 11.6746 6.64846 12.5246L13.1235 18.9996C14.161 20.0371 15.8485 20.0371 16.886 18.9996L19.3485 16.5371L23.361 12.5246C24.1985 11.6746 23.5985 10.2246 22.3985 10.2246Z" fill="white"/>
                            </svg>
                            
                        )}
                    </div>
                    {el.expand && (<div className={styles.subtaskdiv1}>
                        <div className={styles.subtaskdiv11}>
                            <label>Task Description: </label>
                            <textarea
                                // style={{resize:"none"}}
                                name='job_description'
                                value={el.job_description}
                                onChange={(e) => dbhandlechange2(e, index)}
                            />
                        </div>
                        <div className={styles.subtaskdiv12}>
                            <label>Project-SO No: </label>
                                <div className={styles.projectsono}>
                                    <div  className={styles.projectsono2} onClick={(e) => dbhandleprojectexpand(e, index)}>
                                    {el.project_so ? el.project_so.join(", "): ""}
                                    </div>
                                    {el.project_expand && <div className={styles.projectsono3} onClick={(e) => dbcheckproject(e, index)}>
                                    {projects.map((elm, ind) => {
                                        let temp = [];
                                        if(elm.Design){
                                            temp.push(elm.Design)
                                        }
                                        if(elm.Project_Name){
                                            temp.push(elm.Project_Name)
                                        }
                                        if(elm.Scope){
                                            temp.push(elm.Scope)
                                        }
                                        if(elm.Sales_Order_No){
                                            temp.push(elm.Sales_Order_No)
                                        }
                                        return (<div className={styles.optionsList} >
                                            <h5>{temp.join('-')}</h5>
                                            <input
                                                type="checkbox"
                                                name='project_so'
                                                value={temp.join('-')}
                                                checked={el.project_so.includes(temp.join('-'))}
                                                onChange={(e) => dbhandlechange3(e, index, ind)}
                                            />
                                        </div>)})}
                                        
                                    </div>}
                                </div>
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{marginTop:"28px", marginLeft:"-60px"}}>
                                <path d="M17.9188 8.17969H11.6888H6.07877C5.11877 8.17969 4.63877 9.33969 5.31877 10.0197L10.4988 15.1997C11.3288 16.0297 12.6788 16.0297 13.5088 15.1997L15.4788 13.2297L18.6888 10.0197C19.3588 9.33969 18.8788 8.17969 17.9188 8.17969Z" fill="black"/>
                            </svg>
                        </div>
                    </div>)}
                    {el.expand && (<div className={styles.subtaskdiv2}>
                        <div className={styles.subtaskdiv22} style={{marginLeft:"40px"}}>
                            <label>Team assigned: </label>
                            <div className={styles.teamex}>
                                <div className={styles.teamex1} onClick={(e) => dbhandleteamexpand(e, index)}>
                                    {el.team ? el.team.join(', ') : ""}
                                </div>
                                {el.team_expand && <div className={styles.teamex2} onClick={(e) => dbcheckteam(e, index)}>
                                    {MergedArray && MergedArray.map((elm, ind) => (<div className={styles.optionsList} >
                                            <h5>{elm}</h5>
                                            <input
                                                type="checkbox"
                                                value={elm}
                                                name='team'
                                                checked={el.team.includes(elm)}
                                                onChange={(e) => dbhandlechange33(e, index, ind)}
                                            />
                                    </div>))}
                                </div>}

                            </div>
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{marginTop:"28px", marginLeft:"-60px"}}>
                                <path d="M17.9188 8.17969H11.6888H6.07877C5.11877 8.17969 4.63877 9.33969 5.31877 10.0197L10.4988 15.1997C11.3288 16.0297 12.6788 16.0297 13.5088 15.1997L15.4788 13.2297L18.6888 10.0197C19.3588 9.33969 18.8788 8.17969 17.9188 8.17969Z" fill="black"/>
                            </svg>
                        </div>
                        <div className={styles.subtaskdiv21}>
                            <div>
                                <label>Additional Tools requested:</label>
                                <span style={{fontSize:"15px"}}>(separated by semicolon)</span>
                                </div>
                            <textarea
                            name='additional_tools'
                            value={el.additional_tools}
                            onChange={(e) => dbhandlechange2(e, index)}
                            />
                        </div>
                    </div>)}
                    {el.expand && (<div className={styles.subtaskdiv2}>
                        <div className={styles.subtaskdiv31}>
                            <label>Target Units:</label>
                            <input
                                type='number'
                                name='target_units'
                                value={el.target_units}
                                onChange={(e) => dbhandlechange2(e, index)}
                            />
                            <select 
                                name='number'
                                value={el.number}
                                onChange={(e) => dbhandlechange2(e, index)}
                            >
                                <option value="Nos">Nos</option>
                                <option value="%">%</option>
                                <option value="Sets">Sets</option>
                                <option value="Boxes">Boxes</option>
                            </select>
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{marginTop:"10px", marginLeft:"-55px"}}>
                                <path d="M17.9188 8.17969H11.6888H6.07877C5.11877 8.17969 4.63877 9.33969 5.31877 10.0197L10.4988 15.1997C11.3288 16.0297 12.6788 16.0297 13.5088 15.1997L15.4788 13.2297L18.6888 10.0197C19.3588 9.33969 18.8788 8.17969 17.9188 8.17969Z" fill="black"/>
                            </svg>
                        </div>
                    </div>)}
                </div>
                </>
            )
            })}

        {taskdetails && taskdetails.map((el, index) => {

            return (
                <div  onClick={(e) => handletaskdiv(e, index)}>
                    <div className={styles.taskdiv} onClick={(e) => handleexpand(e, index)}>
                        <span>Task {dbdetails.length+index+1}</span>
                        {el.expand ? (<svg width="28" height="28" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.60154 19.7754H15.389L22.4015 19.7754C23.6015 19.7754 24.2015 18.3254 23.3515 17.4754L16.8765 11.0004C15.839 9.96289 14.1515 9.96289 13.114 11.0004L10.6515 13.4629L6.63904 17.4754C5.80154 18.3254 6.40154 19.7754 7.60154 19.7754Z" fill="white"/>
                        </svg>):(
                            <svg width="28" height="28" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22.3985 10.2246L14.611 10.2246L7.59846 10.2246C6.39846 10.2246 5.79846 11.6746 6.64846 12.5246L13.1235 18.9996C14.161 20.0371 15.8485 20.0371 16.886 18.9996L19.3485 16.5371L23.361 12.5246C24.1985 11.6746 23.5985 10.2246 22.3985 10.2246Z" fill="white"/>
                            </svg>
                            
                        )}
                    </div>
                    {el.expand && (<div className={styles.subtaskdiv1}>
                        <div className={styles.subtaskdiv11}>
                            <label>Task Description: </label>
                            <textarea
                                // style={{resize:"none"}}
                                name='job_description'
                                value={el.job_description}
                                onChange={(e) => handlechange2(e, index)}
                            />
                        </div>
                        <div className={styles.subtaskdiv12}>
                            <label>Project-SO No: </label>
                                <div className={styles.projectsono}>
                                    <div  className={styles.projectsono2} onClick={(e) => handleprojectexpand(e, index)}>
                                    {el.project_so ? el.project_so.join(', ') : ""}
                                    </div>
                                    {el.project_expand && <div className={styles.projectsono3} onClick={(e) => checkproject(e, index)}>
                   
                                        {projects.map((elm, ind) => {
                                            let temp = [];
                                            if(elm.Design){
                                                temp.push(elm.Design)
                                            }
                                            if(elm.Project_Name){
                                                temp.push(elm.Project_Name)
                                            }
                                            if(elm.Scope){
                                                temp.push(elm.Scope)
                                            }
                                            if(elm.Sales_Order_No){
                                                temp.push(elm.Sales_Order_No)
                                            }
                                            return(<div className={styles.optionsList} >
                                            <h5>{temp.join('-')}</h5>
                                            <input
                                                type="checkbox"
                                                name='project_so'
                                                value={temp.join('-')}
                                                checked={el.project_so.includes(temp.join('-'))}
                                                onChange={(e) => handlechange3(e, index, ind)}
                                            />
                                        </div>)})}
                                        
                                    </div>}
                                </div>
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{marginTop:"28px", marginLeft:"-60px"}}>
                                <path d="M17.9188 8.17969H11.6888H6.07877C5.11877 8.17969 4.63877 9.33969 5.31877 10.0197L10.4988 15.1997C11.3288 16.0297 12.6788 16.0297 13.5088 15.1997L15.4788 13.2297L18.6888 10.0197C19.3588 9.33969 18.8788 8.17969 17.9188 8.17969Z" fill="black"/>
                            </svg>
                        </div>
                    </div>)}
                    {el.expand && (<div className={styles.subtaskdiv2}>
                        <div className={styles.subtaskdiv22} style={{marginLeft:"40px"}}>
                            <label>Team assigned: </label>
                            <div className={styles.teamex}>
                                <div className={styles.teamex1} onClick={(e) => handleteamexpand(e, index)}>
                                    {el.team ? el.team.join(', ') : ""}
                                </div>
                                {el.team_expand && <div className={styles.teamex2} onClick={(e) => checkteam(e, index)}>
                                    {MergedArray && MergedArray.map((elm, ind) => (<div className={styles.optionsList}>
                                            <h5>{elm}</h5>
                                            <input
                                                type="checkbox"
                                                value={elm}
                                                name='team'
                                                checked={el.team.includes(elm)}
                                                onChange={(e) => handlechange33(e, index, ind)}
                                            />
                                    </div>))}
                                </div>}

                            </div>
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{marginTop:"28px", marginLeft:"-60px"}}>
                                <path d="M17.9188 8.17969H11.6888H6.07877C5.11877 8.17969 4.63877 9.33969 5.31877 10.0197L10.4988 15.1997C11.3288 16.0297 12.6788 16.0297 13.5088 15.1997L15.4788 13.2297L18.6888 10.0197C19.3588 9.33969 18.8788 8.17969 17.9188 8.17969Z" fill="black"/>
                            </svg>
                        </div>
                        <div className={styles.subtaskdiv21}>
                            <div>
                                <label>Additional Tools requested:</label>
                                <span style={{fontSize:"15px"}}>(separated by semicolon)</span>
                                </div>
                            <textarea
                               name='additional_tools'
                               value={el.additional_tools}
                               onChange={(e) => handlechange2(e, index)}
                            />
                        </div>
                    </div>)}
                    {el.expand && (<div className={styles.subtaskdiv2}>
                        <div className={styles.subtaskdiv31}>
                            <label>Target Units:</label>
                            <input
                                type='number'
                                name='target_units'
                                value={el.target_units}
                                onChange={(e) => handlechange2(e, index)}
                            />
                            <select 
                                name='number'
                                value={el.number}
                                onChange={(e) => handlechange2(e, index)}
                            >
                                <option value="Nos">Nos</option>
                                <option value="%">%</option>
                                <option value="Sets">Sets</option>
                                <option value="Boxes">Boxes</option>
                            </select>
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{marginTop:"10px", marginLeft:"-55px"}}>
                                <path d="M17.9188 8.17969H11.6888H6.07877C5.11877 8.17969 4.63877 9.33969 5.31877 10.0197L10.4988 15.1997C11.3288 16.0297 12.6788 16.0297 13.5088 15.1997L15.4788 13.2297L18.6888 10.0197C19.3588 9.33969 18.8788 8.17969 17.9188 8.17969Z" fill="black"/>
                            </svg>
                        </div>
                    </div>)}
                </div>
            )
        })}

        <div className={styles.buttonsdiv}>
            <button className={styles.buttons} onClick={handleaddtask}>Add Task</button>
            <button className={styles.buttons} onClick={handlesubmit}>Save</button>
        </div>



    </div>
    </>
)
} 

export default Toolbox_edit;
