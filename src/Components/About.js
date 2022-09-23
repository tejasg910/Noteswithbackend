import React, {useContext, useEffect} from 'react'
import noteContext from '../Context/notes/noteContext';
const About = () => {
    const data  = "This is data"
    useEffect(() => {
  
    }, []);
    return (
        <div className='container'>
            
          <p>This project is made by Tejas Giri altough some features and UI are copied. And this application is only for the represenatational purpose. We haven't used this app as business purpose</p>
          <p>If you want to know more about us then go through these links</p>
          <div className='d-flex flex-column sociallinks'>
            <a href="">GitHub</a>
            <a href="">Instagram</a>
            <a href="">Twitter</a>
            <a href="">Portfolio</a>
          </div>
            <p>Thank for reaching us. Have a good day. Bye ♥</p>
        </div>
        
    );
}

export default About;
