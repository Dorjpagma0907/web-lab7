import React, {useState} from 'react'
import Button from '@material-ui/core/Button'
import "./ZuragOruulah.css"
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import axios from './axios'


const ImageUpload = ({username}) => {
    const [image, setImage] = useState(null)
    const [url, setUrl] = useState("");
    const [progress, setProgress] = useState(0)
    const [caption, setCaption] = useState('')
    
    const handleChange = (e) => {
        if (e.target.file[0]) {
            setImage(e.target.files[0]);
        }
    };

    const [open, setOpen] = useState(false);
    const handleUpload = () => {

    }

    const useStyles = makeStyles((theme) => ({
        paper: {
          position: 'absolute',
          width: 400,
          backgroundColor: theme.palette.background.paper,
          border: '2px solid #000',
          boxShadow: theme.shadows[5],
          padding: theme.spacing(2, 4, 3),

        },
      }));

      function getModalStyle(){
        const top = 50;
        const left = 50; 
      
        return{
          top: `${top}%`,
          left: `${left}%`,
          transform: `translate(-${top}%, -${left}%)`,
        };
      }

      const [modalStyle] = useState(getModalStyle);
        const classes = useStyles();

        axios.post('/upload', {
          caption: caption,
          user: username, 
          image: url,
        });

    return (
        <div>
            <div>
                <Button onClick = {() => setOpen(true)}>Upload Image</Button>
            </div>
        <Modal
        open = {open}
        onClose = {() => setOpen(false)}
        >
          <div style = {modalStyle} className = {classes.paper}>
          <div className = "Zurag">
            <h1>Zurag Oruulah</h1>

            <progress className = "Zurag_oruulahYwts" value = {progress} max = "100" />
            <input className = "Zurag_text" type = "text" placeholder = "Enter a caption..." onChange = {event => setCaption(event.target.value)} value = {caption}/>
            <input className = "Zurag_text" type = "file" onChange = {handleChange} />
            <Button onClick = {handleUpload}>Upload</Button>
        </div>
            
          </div>
      </Modal>
        
        </div>
    )
}

export default ImageUpload