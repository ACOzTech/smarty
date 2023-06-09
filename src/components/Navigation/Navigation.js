const Navigation = ({ onRouteChange, isSignedIn }) => {  
  if (isSignedIn) {
    return (
      <nav className='flex justify-end'>
      <p onClick={() => onRouteChange('signout')} className='f5 f4-ns link dim black underline pa3 pointer'>Sign Out</p>
    </nav>
    );
  } else {
    return (
      <nav className='flex justify-end'>
        <p onClick={() => onRouteChange('signin')} className='f5 f4-ns link dim black underline pa3 pointer'>Sign In</p>
        <p onClick={() => onRouteChange('register')} className='f5 f4-ns link dim black underline pa3 pointer'>Register</p>
      </nav>
    );
  }
}

export default Navigation;