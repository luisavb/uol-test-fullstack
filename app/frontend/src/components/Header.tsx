// Header.tsx
import React from 'react';
import logo from '../assets/LogoBrancaUOL.png';

const Header: React.FC = () => {
  return (
    <>
    <header className="bg-gray-800 h-20 flex items-center justify-center">
      {/* <div className="flex item-center justify-center"> */}
        <img src={logo} alt="Logo UOL" className=" h-20 max-h-full px-4"/>
      {/* </div> */}
    </header>
    </>
  );
}

export default Header;
