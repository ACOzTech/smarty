import './ImageLinkForm.css';

const ImageLinkForm = () => {
  return (
    <div className='tc'>
      <p className='f4 f3-ns'> {'Smarty will detect faces in your pictures! Try it out!'} </p>
      <div className='center'>
        <div className='form o-100 pa3 pa4-ns br3 shadow-5 f5 f4-ns '>
          <input className='pa1 pa2-ns w-75' type='text' />
          <button className='pa1 pa2-ns w-25 white bg-light-purple'>Detect</button>
        </div>
      </div>
    </div>
  )
}

export default ImageLinkForm;