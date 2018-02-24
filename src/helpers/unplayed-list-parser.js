/* eslint-disable */

import showdown from 'showdown'
import $ from 'jquery'

export default {
  BUTTONSTYLESLIST: ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark'],
  convertMarkdownToHtmlDom: (text) => {
    let html = (new showdown.Converter()).makeHtml(text);
    html = html.replace(/\(/g, '<span>').replace(/\)/g, '</span>');
    return $.parseHTML(html);
  },
  parseListUl: (listUl) => {
    let gamesLiElements = Array.from(listUl.getElementsByTagName('li'));
    let listObj = [];
    let buttonStylesList = Array.from(['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark']);

    gamesLiElements.forEach((element) => {        
      let link = '';
      if (element.getElementsByTagName('a').length > 0)
        link = element.getElementsByTagName('a')[0].getAttribute('href');

      let gameTitle = '';
      if (element.getElementsByTagName('a').length > 0)
        gameTitle = element.getElementsByTagName('a')[0].innerText;
      else
        gameTitle = element.childNodes[0].textContent.trim(); // For now assume game title is always the first line

      let consoleName = '';
      if (element.getElementsByTagName('span').length > 0)
        consoleName = element.getElementsByTagName('span')[0].innerText;

      let comment = '';
      if (element.getElementsByTagName('span').length > 1)
        comment = element.getElementsByTagName('span')[1].innerText;

      listObj.push({
        link,
        gameTitle,
        consoleName,
        comment
      });
    });

    return listObj;
  }  
}