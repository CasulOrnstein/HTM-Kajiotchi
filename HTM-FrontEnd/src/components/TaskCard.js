import React, { useEffect, useState } from "react";

function TaskCard({taskId, taskName = '', taskDescription = '', completed = false, overdueDays = 0}) {
  const [isCompleted, setTaskCompleted] = useState(completed);

  const handleComplete = (e) => {
    e.preventDefault();
    if(!isCompleted) {
      fetch(`http://localhost:5000/users/87/tasks/${taskId}/complete`, { method: 'POST' })
      setTaskCompleted(true)
    }
  }


  return (
    <div style={{backgroundColor: '#FEE0BE', width: '100%', color: '#323840', display:'inline-flex', borderRadius: '2px'}}>
        <div 
            style={{backgroundColor: isCompleted?'#86C1A5':'#D96262', width: '40px', height: '40px', margin: 'auto 10px', cursor:'pointer', minWidth:'40px'}}
            onClick={handleComplete}
        />
        <div style={{textAlign: 'left', display:'grid', width:'100%', marginBottom: '10px'}}>
            <div style={{margin:'0 5px -7pt 0', fontSize:'10pt', color:'#D96262', textAlign: 'end', minHeight:'10pt'}}>{(overdueDays > 0 && !isCompleted) ? `Overdue by ${overdueDays} days`: ''}</div>
            <div style={{fontWeight:'bold', fontSize:'18pt', paddingRight:'10px'}}>{taskName}</div>
            <div style={{fontSize:'10pt', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace:'nowrap', paddingRight: '10px'}}>{taskDescription}</div>    
        </div>
    </div>
  );
}

export default TaskCard;
