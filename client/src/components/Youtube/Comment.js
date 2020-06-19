import React, { useState, useEffect } from 'react'
import { Typography, List, Avatar, TextField, ListItem, ListItemText, Button } from '@material-ui/core'
import axios from 'axios'

const initiaValues={

}

function Comment(props) {

    const videoId = props.video._id
    const [comments, setComments] = useState([])
    const [content, setContent] = useState("")

    useEffect(() => {
        axios.post('/api/comments/getComments', { videoId })
            .then(res => {

                setComments(res.data.comments)
            })
            .catch(err => {
            })

    }, [videoId])

    const handleChange = (e) => {
        setContent(e.target.value)
    }

    const onSubmit = () => {

        axios.post('/api/comments/saveComment', { content, videoId })
            .then(res => {
                if (res.data.success) {
                    setComments(result => [res.data.comment[0], ...result])
                    setContent("")
                }
            })
            .catch(err => {
                console.log(err);

            })
    }

    return (
        <div>
            <Typography variant="h6">{comments.length} Comments</Typography>
            <List>
                <ListItem>
                    <Avatar style={{ marginRight: "1rem", height: "2rem", width: "2rem" }}>R</Avatar>
                    <TextField label="Add a public comment" fullWidth onChange={handleChange} value={content}/>
                    <br />

                    <Button variant="contained" size="small" color="primary" onClick={onSubmit}>Submit</Button>


                </ListItem>
                {
                    comments.map((comment, key) =>
                        <ListItem>
                            <Avatar style={{ marginRight: "1rem", height: "2rem", width: "2rem" }}>R</Avatar>
                            <ListItemText
                                primary={<Typography variant="subtitle2">{comment.writer.name}</Typography>} 
                                secondary={<Typography variant="body2">{comment.content}</Typography>}
                            />
                        </ListItem>
                    )
                }

            </List>



        </div>
    )
}

export default Comment
