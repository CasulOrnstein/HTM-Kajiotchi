import React from 'react'
import petChild from '../images/petChild.gif'
import petChildCry from '../images/petChildCry.gif'
import petPoo from '../images/petPoo.gif'
import petChildMask from '../images/petChildMask.gif'
import petChildCryMask from '../images/petChildCryMask.gif'
import hexToFilter from '../hexToFilter'
import petSparkles from '../images/petSparkles.gif'
import petBigSparkles from '../images/petBigSparkles.gif'

function PetScreen2({petPosIndex, pooIndices, happiness, petColor}) {
    const pooCount = happiness > 0 ? 0 : Math.min(6, Math.ceil(happiness / -10))
    const petGifSrc = happiness > -30 ? petChild : petChildCry
    const petGifMaskSrc = happiness > -30 ? petChildMask : petChildCryMask
    const petPositions = [
        { top: 65, left: 32 },
        { top:68, left: 12 },
        { top:75, left: 80 },
        { top:57, left: 5 },
    ]

    const pooPositions = [
        { top:80, left: 67 },
        { top:82, left: 72 },
        { top:59, left: 92 },
        { top:23, left: 94 },
        { top:87, left: 56 },
        { top:85, left: 25 },
    ]

    const orderedPooPositions = pooIndices.map(index => pooPositions[index]).slice(0,pooCount)
    return (
        <div style={{width:'100%', height:'100%', position:'relative'}}>
            <Pet 
                top={petPositions[petPosIndex].top}
                left={petPositions[petPosIndex].left}
                petGifSrc={petGifSrc}
                petGifMask={petGifMaskSrc}
                happiness={happiness}
                color={petColor}
            />
            {orderedPooPositions.map(pooPos => (     
                <Poo {...pooPos}/>
            ))}
        </div>
    )
}

function Pet({top=65, left=32, petGifSrc=petChild, petGifMask=petChildMask, happiness=0, color='#FFFFFF'}) {
    const filter = hexToFilter(color)

    return (
        <>
            <img
                src={petGifSrc}
                style={{width:'200px', position: 'absolute', left:`${left}%`, top:`${top}%`}}
            />
            <img
                src={petGifMask}
                style={{width:'200px', position: 'absolute', left:`${left}%`, top:`${top}%`, filter: filter.substring(8, filter.length -1), mixBlendMode: 'multiply'}}
            />
            {happiness > 0 
                ? <img
                    src={petSparkles}
                    style={{width:'100px', position: 'absolute', left:`${left + 6}%`, top:`${top-3}%`}}
                />
                :
                <></>
            }
            {happiness > 20
                ? 
                <>
                    <img
                        src={petBigSparkles}
                        style={{width:'50px', position: 'absolute', left:`${left + 7}%`, top:`${top + 8}%`}}
                    />
                    <img
                        src={petBigSparkles}
                        style={{width:'50px', position: 'absolute', left:`${left+2.5}%`, top:`${top + 8}%`}}
                    />
                </>
                :
                <></>
            }
        </>
    )
}

function Poo({top=87, left=56}) {
    return (
        <img
            src={petPoo}
            style={{width:'100px', position: 'absolute', left:`${left}%`, top:`${top}%`}}
        />
    )
}

export default PetScreen2