import React from 'react'

const Biography = ({imgUrl}) => {
  return (
    <div className='container biography'>
      <div className="banner">
        <img src={imgUrl} alt="aboutImg" />
      </div>
      <div className="banner">
        <p>Biography</p>
        <h3 style={{marginLeft:"157px", marginTop:"-20px"}}>Who We Are</h3>
        <p style={{textAlign:"justify"}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil aperiam eos officia. Ut illum, nihil, odio similique facere eveniet, et quaerat maxime at cum animi perspiciatis! Ipsam mollitia, harum fugit nisi illum error! Aspernatur itaque nemo fugiat eveniet magnam corrupti perferendis deserunt maxime ipsa? Quod provident cupiditate perspiciatis perferendis! Amet!</p>
        <p style={{textAlign:"justify", marginTop:"-20px"}}>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        <p style={{textAlign:"justify" , marginTop:"-20px"}}>Lorem ipsum dolor sit amet.</p>
       
          
        

      </div>
    </div>
  )
}

export default Biography