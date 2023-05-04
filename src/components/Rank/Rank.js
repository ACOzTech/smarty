const Rank = ({ name, entries }) => {
  return (
    <div>
      <div className='f4 f3-ns white'> 
        {`${name}, your current number of entries is ...`} 
      </div>
      <div className='f3 f2-ns white'> 
        {`${entries}!`} 
      </div>
    </div>
  );
}

export default Rank;