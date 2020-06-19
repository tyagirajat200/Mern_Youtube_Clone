import React, { useEffect, useState } from 'react'
import axios from 'axios';

function Subscriber(props) {
    const SubsTo = props.SubsTo
   
    const [SubscribeNumber, setSubscribeNumber] = useState(0)
    const [IsSubscribed, setIsSubscribed] = useState(false)

    const onSubscribe = ( ) => {

        let subscribeVariables = {
            SubsTo : SubsTo,
            
        }

        if(IsSubscribed) {
            //when we are already Subscribed 
            axios.post('/api/subscribe/unSubscribe', subscribeVariables)
                .then(response => {
                    if(response.data.success){ 
                        setSubscribeNumber(SubscribeNumber - 1)
                        setIsSubscribed(!IsSubscribed)
                    } else {
                        alert('Failed to unsubscribe')
                    }
                })

        } else {
            // when we are not Subscribed yet
            
            axios.post('/api/subscribe/subscribe', subscribeVariables)
                .then(response => {
                    if(response.data.success) {
                        setSubscribeNumber(SubscribeNumber + 1)
                        setIsSubscribed(!IsSubscribed)
                    } else {
                        alert('Failed to subscribe')
                    }
                })
        }

    }


     useEffect(() => {

        const subscribeNumberVariables = { SubsTo: SubsTo}
        axios.post('/api/subscribe/subscribeNumber', subscribeNumberVariables)
            .then(response => {
                if (response.data.success) {
                    setSubscribeNumber(response.data.subscribeNumber)
                }
            })
            .catch(err=>{
                alert('Failed to get Subscriber Information')
            
            })


        axios.post('/api/subscribe/IsSubscribed', subscribeNumberVariables)
            .then(response => {
                if (response.data.success) {
                  
                    setIsSubscribed(response.data.IsSubcribed)
            }})
                .catch(err=>{
                    alert('Failed to get IsSubscribed Information')
                
                })

    }, [SubsTo])


    return (
        <div>
        <button 
       onClick={onSubscribe}
        style={{
            backgroundColor: `${IsSubscribed ? '#AAAAAA' : '#CC0000'}`,
            borderRadius: '4px', color: 'white',
            padding: '10px 16px', fontWeight: '500', fontSize: '1rem', textTransform: 'uppercase'
        }}>
            {SubscribeNumber} {IsSubscribed ? 'Subscribed' : 'Subscribe'}
        </button>
    </div>
    )
}

export default Subscriber