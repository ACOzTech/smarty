import './FaceRecognition.css';

const FaceRecognition = ({imageURL, box}) => {
  if (imageURL) {
    return (
      <div className='center ma'>
        <div className='absolute mt2'>
          <img id='inputImage' alt='' src={imageURL} className='smarty-w-80vw smarty-w-50vw-l height={auto}'/>
          <div 
            className='bounding-box' 
            style={{top: box.topRow, bottom: box.bottomRow, left: box.leftCol, right: box.rightCol}} 
          >
          </div>
        </div>
      </div>
    )
  }
}

export default FaceRecognition;