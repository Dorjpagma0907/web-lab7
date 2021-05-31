import Modal from '@material-ui/core/Modal';
import React, {useEffect, useState} from 'react' ;
import './App.css';
import Post from './Post';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
import Input from '@material-ui/core/Input';
import ZuragOruulah from './ZuragOruulah';
import InstagramEmbed from 'react-instagram-embed';
import InputBase from '@material-ui/core/InputBase';
import axios from './axios'
import FlipMove from 'react-flip-move';
import Pusher from 'pusher-js';


function getModalStyle(){
  const top = 50;
  const left = 50; 

  return{
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

  const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),

    search: {
        backgroundColor: '#B6B6B4',
        position: 'relative',
        
        border: '1px solid #000',
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(3),
          width: 'auto',
        },
      },
    
    },
  }));
function App() {

  const [modalStyle] = useState(getModalStyle);
  const classes = useStyles();
  const [posts, setPosts] = useState([
    {
      username: "John",
      caption: "Hi ", 
      ImageUrl: "https://i.pinimg.com/originals/83/f9/37/83f937b69f30bb886ab8a03390da6771.jpg"
    },
    {
      username: "Brown", 
      caption: "Nice to meet u ", 
      ImageUrl: "https://filedn.com/ltOdFv1aqz1YIFhf4gTY8D7/ingus-info/BLOGS/Photography-stocks3/stock-photography-slider.jpg"
    },
    {
      username: "Lurk", 
      caption: "Rebibe me Jett", 
      ImageUrl: "https://static.remove.bg/remove-bg-web/a72f919da581145bc8a52ac0c5d21f5c4741f367/assets/start-0e837dcc57769db2306d8d659f53555feb500b3c5d456879b9c843d1872e7baa.jpg"
    },
    {
      username: "New to MUIS", 
      caption: "Chill", 
      ImageUrl: "https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg"
    },
  ]);

  const fetchPosts = async () => 
  await axios.get('/sync').then(response => {
    console.log(response);
    setPosts(response.data)
  });

  useEffect(() => {
    const pusher = new Pusher('ee918b54463fdf47be77', {
      cluster: 'eu'
    });

    const channel = pusher.subscribe('posts');
    channel.bind('inserted', (data) => {
      console.log("data recieved", data);
      fetchPosts();
    });
  }, [])
  useEffect(() => {
    fetchPosts()
;  }, []);

  console.log('posts are >>>', posts);
  

  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [user, setUser] = useState(null);
  const [openSignIn, setOpenSignIn] = useState(false);

  const signUp = (event) => {
    event.preventDefault();
    
  }

  return (
    <div className="App">

      <Modal
        open = {open}
        onClose = {() => setOpen(false)}
        >
          <div style = {modalStyle} className = {classes.paper}>
            <form className = "newtreh">
                <center>
                  <img
                        className="insta_logo"
                        src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                        alt=""
                      />
                </center> 
                      <Input 
                        placeholder = 'Username'
                        type = 'text'
                        value = {username}
                        onChange = {(e) => setUsername(e.target.value)}
                      />
                      <Input 
                        placeholder = 'Email'
                        type = 'text'
                        value = {email}
                        onChange = {(e) => setEmail(e.target.value)}
                      />
                      <Input 
                        placeholder = 'Password'
                        type = 'password'
                        value = {password}
                        onChange = {(e) => setPassword(e.target.value)}
                      />
                      <Button type = "submit" onClick = {signUp}>
                        Sign Up
                      </Button>
            </form>
          </div>
      </Modal>

      <Modal
        open = {openSignIn}
        onClose = {() => setOpenSignIn(false)}
        >
          <div style = {modalStyle} className = {classes.paper}>
            <form className = "newtreh">
                <center>
                  <img
                        className="insta_logo"
                        src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                        alt=""
                      />
                </center> 
                      <Input 
                        placeholder = 'Email'
                        type = 'text'
                        value = {email}
                        onChange = {(e) => setEmail(e.target.value)}
                      />
                      <Input 
                        placeholder = 'Password'
                        type = 'password'
                        value = {password}
                        onChange = {(e) => setPassword(e.target.value)}
                      />
                      <Button type = "submit" onClick = {signUp}>Sign In</Button>
            </form>
          </div>
      </Modal>


      <div className = "tolgoi">
            <img
                className="insta_logo"
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                alt=""
              />
              <div className={classes.search}>
                  <InputBase
                    placeholder="Search…"
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput,
                    }}
                    inputProps={{ 'aria-label': 'Search' }}
                  />
              </div>
              <div className = "app_loginContainer">
                <Button onClick = {() => setOpen(true)}>Sign Up</Button>
                <Button onClick = {() => setOpenSignIn(true)}>Sign In</Button>
              </div>
      </div>

      {/*{user ? (
        <Button onClick = {() => setOpen(true)}>Logout</Button>
      ):(
        <Button onClick = {() => setOpen(true)}>Logout</Button>
      )}*/}

      <div className = "postuud">
        <div className = "postuudZvvn">
          <FlipMove>
                {posts.map((post) => (
                  <Post 
                  user = {user}
                  key = {post._id}
                  username = {post.username} 
                  caption = {post.caption} 
                  ImageUrl = {post.ImageUrl}/>
                ))
              }
          </FlipMove>
          </div>
      


      <div className = "postuudBaruun">
            <InstagramEmbed
                url='https://www.instagram.com/p/B_uf9dmAGPw/'
                clientAccessToken='123|456'
                maxWidth={320}
                hideCaption={false}
                containerTagName='div'
                protocol=''
                injectScript
                onLoading={() => {}}
                onSuccess={() => {}}
                onAfterRender={() => {}}
                onFailure={() => {}}
            />
      </div>

      
      </div>
        <ZuragOruulah />
      </div>
  );
}

export default App;
