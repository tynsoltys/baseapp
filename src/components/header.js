console.log('this is the header');
import './header.scss';

export const Header = (content) => {
  return `<header>
      <h1>${content}</h1>
    </header>`;
};
