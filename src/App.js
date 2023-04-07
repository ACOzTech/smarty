import { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';

class App extends Component {  
  constructor() {
    super();
    this.state = {
      input: '',
      imageURL: '',
      box: {},
      route: 'signin',
      isSignedIn: false,
    }
    // Load Particles here so that it doesn't keep being called everytime on render
    this.loadParticles(); 
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

  getClarifaiRequestOptions = (imageURL) => {
    // Your PAT (Personal Access Token) can be found in the Clarifai portal
    const PAT = '730aa9e7383a4392be746176c2e4a129';
    const USER_ID = 'clarifai';       
    const APP_ID = 'main';      
    const IMAGE_URL = imageURL;
    
    const raw = JSON.stringify({
      "user_app_id": {
        "user_id": USER_ID,
        "app_id": APP_ID
      },
      "inputs": [
        {
          "data": {
            "image": {
              "url": IMAGE_URL
            }
          }
        }
      ]
    });

    const requestOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Key ' + PAT
      },
      body: raw
    };

    return requestOptions;
  }

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
    const CLARIFAI_URL = 'https://api.clarifai.com/v2/models/';
    const MODEL_ID = 'face-detection';

    fetch(CLARIFAI_URL + MODEL_ID + '/outputs', this.getClarifaiRequestOptions(this.state.input))
      .then(response => response.json())
      .then(result => this.showFaceFrame(this.calcFaceLocation(result)))
      .catch(error => console.log('Error (Fetch URL): ', error));
  }

  onRouteChange = (route) => {
    this.setState({route: route});
    if (route === 'signout') {
      this.setState({isSignedIn: false});
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
              <Rank />
              <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
              <FaceRecognition imageURL={imageURL} box={box}/>
            </>
          : ( 
              route === 'register'
              ? <Register onRouteChange={this.onRouteChange} />
              : <SignIn onRouteChange={this.onRouteChange} />
            )
        }
      </div>
    );
  }
}

export default App;
