import React from 'react';
import Logo from '../logo/logo';

const Header = ({currentUser, logout, sidebar, id, favorited, toggleFavorite, router}) => {
  const buttonContent = currentUser ? 'LOGOUT ' + currentUser.username : 'SIGN IN';
  const buttonClick = currentUser ? logout : () => router.push('/addSession');

  let favorite = favorited ? 'http://image.flaticon.com/icons/svg/60/60993.svg' : 'http://image.flaticon.com/icons/png/128/126/126471.png';

  function _toggleSidebar(){
    $('.sidebar').addClass('visible');
    $(document).one('click', () => {
      $('.sidebar').removeClass('visible');
    });
  }

  return (
    <div className='header group'>
      <img id='header_sidebar' onClick={_toggleSidebar} src='https://cdn2.iconfinder.com/data/icons/bank/100/Bankicons_Set-13-512.png'></img>
      <Logo />
      <button id='sign_in' onClick={buttonClick}>{buttonContent}</button>
      <img id='header_search' src='https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-ios7-search-strong-128.png' onClick={() => $('.search_bar').addClass('visible')}></img>
      <img className='header_favorites invisible' src={favorite} onClick={() => toggleFavorite(id)}></img>
    </div>
  );
};

export default Header;
