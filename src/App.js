import { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';

const initialState = {
  input: '',
  imageURL: '',
  box: {},
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  },
};

class App extends Component {  
  constructor() {
    super();
    this.state = initialState;
    // Load Particles here so that it doesn't keep being called everytime on render
    this.loadParticles(); 
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    });
  }

  loadParticles = async function() {
    try {
      // eslint-disable-next-line 
      await tsParticles.load("tsparticles", {
        preset: "bubbles",
        background: {
          size: "cover",
          opacity: 0.01
        },
      });
    } catch {}
  };

  calcFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);

    return {
      topRow: clarifaiFace.top_row * height,
      bottomRow: height - (clarifaiFace.bottom_row * height),
      leftCol: clarifaiFace.left_col * width,
      rightCol: width - (clarifaiFace.right_col * width),
    }
  }
  
  showFaceFrame = (box) => {
    this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageURL: this.state.input});
    fetch('http://localhost:3000/imageurl', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        input: this.state.input
      })
    })
      .then(response => response.json())
      .then(result => {
        if (result) {
          this.showFaceFrame(this.calcFaceLocation(result));
          fetch('http://localhost:3000/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, {entries: count}));
            })
        }
      })
      .catch(error => console.log('Error (Fetch URL): ', error));
  }

  onRouteChange = (route) => {
    this.setState({route: route});
    if (route === 'signout') {
      this.setState(initialState);
    } else if (route === 'home') {
      this.setState({isSignedIn: true});
    }
  }

  render() {
    const {imageURL, box, route, isSignedIn} = this.state;
    return (
      <div className='tc'>
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
        { 
          route === 'home'
          ? <>
              <Logo />
              <Rank name={this.state.user.name} entries={this.state.user.entries}/>
              <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
              <FaceRecognition imageURL={imageURL} box={box}/>
            </>
          : ( 
              route === 'register'
              ? <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
              : <SignIn onRouteChange={this.onRouteChange} loadUser ={this.loadUser} />
            )
        }
      </div>
    );
  }
}

export default App;
