import React from 'react'

function PetInfo({name, birthday, happiness}) {
    const diffTime = Math.abs(new Date() - new Date(birthday));
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

    return(
        <div style={{display:'flex', height:'100%', width:'75%', position:'absolute'}}>
            <InfoBox title='Name:' content={name}/>
            <InfoBox title='Age:' content={`${diffDays} days`}/>
            <InfoBox title='Status:' content={happiness > 20 ? 'Overjoyed' : happiness > 0 ? 'Happy' : happiness > -30 ? 'Sad' : 'Heartbroken'}/>
        </div>
    )
}

function InfoBox({title, content}) {
    return (
        <div style={{width:'33.3%', height: '100px', padding:'20px'}}>
            <div style={{height: '100px', backgroundColor:'#FEE0BE', borderRadius:'2px'}}> 
                <div style={{paddingLeft:'10px', fontSize:'15pt', textAlign:'left'}}>{title}</div>
                <div style={{fontSize:'26pt', fontWeight: 'bold'}}>{content}</div>
            </div>
        </div>
    )
}

export default PetInfo