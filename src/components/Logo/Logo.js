import Tilt from 'react-parallax-tilt';
import './Logo.css';

const Logo = () => {
  return (
    <div className='ma4 mt0'>
      <Tilt 
        perspective={500}
        glareEnable={true}
        glareMaxOpacity={0.3}
        scale={1.03}
        gyroscope={true}
        className='Tilt flex flex-column items-center justify-center h3 w3 h4-ns w4-ns f5 f3-ns br2 shadow-5'
      >
        <div className='i white smarty-translateZ60'>
          <div>Smarty</div>
          <div>👀</div>
        </div>
      </Tilt>
    </div>
  )
}

export default Logo;