import React, { useState, useEffect } from 'react'
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import { Button } from '@material-ui/core';
import axios from 'axios'

import { useSelector } from "react-redux";


function LIkeDislike(props) {

    const [Likes, setLikes] = useState(0)
    const [Dislikes, setDislikes] = useState(0)
    const [IsLiked, setIsLIked] = useState(false)
    const [IsDisliked, setIsDisliked] = useState(false)


    const user = useSelector((state) => {
        return state.auth.user
    })

    const video = props.video

    useEffect(() => {

        const likes = video.likes         // array of all users who liked the video
        const dislikes = video.dislikes        // array of all users who disliked the video
        setLikes(likes.length)
        console.log(likes.length);

        setDislikes(dislikes.length)

        const a = likes.find(data => data === user.id)  //     if not found it return undefined
        const b = dislikes.find(data => data === user.id)

        a ? setIsLIked(true) : setIsLIked(false)

        b ? setIsDisliked(true) : setIsDisliked(false)


    }, [video])


    var vedioId = video._id
    const onLike = () => {

        if (IsLiked === false) {

            axios.put("/api/likes/onlike", { vedioId })
                .then(res => {
                    if (res.data.success) {
                        setLikes(Likes + 1)
                        setIsLIked(res.data.liked)
                        if (IsDisliked) {
                            setIsDisliked(false)
                            setDislikes(Dislikes - 1)
                        }
                    }
                })
        }

        else {

            axios.put("/api/likes/unlike", { vedioId })
                .then(res => {
                    if (res.data.success) {
                        setLikes(Likes - 1)
                        setIsLIked(res.data.liked)
                    }
                })
        }

    }


    const onDisLike = () => {

        if (IsDisliked === false) {

            axios.put("/api/likes/ondislike", { vedioId })
                .then(res => {
                    if (res) {
                        setDislikes(Dislikes + 1)
                        setIsDisliked(res.data.disliked)
                        if (IsLiked) {
                            setIsLIked(false)
                            setLikes(Likes - 1)
                        }
                    }
                })
        }
        else {


            console.log(vedioId);

            axios.put("/api/likes/undislike", { vedioId })
                .then(res => {
                    if (res) {
                        setDislikes(Dislikes - 1)
                        setIsDisliked(res.data.disliked)
                    }
                })

        }
    }


    return (
        <div>

            <Button onClick={onLike}><ThumbUpIcon color={IsLiked ? 'primary' : 'disabled'} />{Likes} </Button>
            <Button onClick={onDisLike}> <ThumbDownIcon color={IsDisliked ? 'primary' : 'disabled'} />{Dislikes}</Button>
        </div>
    )
}

export default LIkeDislike
