import showdown from 'showdown'
import $ from 'jquery'

/* eslint-disable */
let MarkdownParserMixin = {
  methods: {
    convertMarkdownToHtmlDom: function(text) {
      let html = (new showdown.Converter()).makeHtml(text);
      html = html.replace(/\(/g, '<span>').replace(/\)/g, '</span>');
      return $.parseHTML(html);
    },
    parseLink: function(element) {
      if (element.getElementsByTagName('a').length > 0)
        return element.getElementsByTagName('a')[0].getAttribute('href');
      return '';
    },
    parseGameTitle: function(element) {
      if (element.getElementsByTagName('a').length > 0)
        return element.getElementsByTagName('a')[0].innerText;
      else
        return element.childNodes[0].textContent.trim(); // For now assume game title is always the first line
    },
    parseConsoleName: function(element) {
      if (element.getElementsByTagName('span').length > 0)
        return element.getElementsByTagName('span')[0].innerText;
      return '';
    },
    parseComment: function(element) {
      if (element.getElementsByTagName('span').length > 1)
        return element.getElementsByTagName('span')[1].innerText;
      return '';
    },
    parseListUl: function(listUl, consoleList) {
      let gamesLiElements = Array.from(listUl.getElementsByTagName('li'));
      let listObj = [];
      let randomIndex = 0;
      let colorStyle = '';

      gamesLiElements.forEach((element) => {
        let link = this.parseLink(element);
        let gameTitle = this.parseGameTitle(element);
        let consoleName = this.parseConsoleName(element);
        let comment = this.parseComment(element);

        let foundConsoleIndex = consoleList.findIndex(obj => obj.consoleName == consoleName);
        if ( foundConsoleIndex === -1 ) {
          randomIndex = Math.floor(Math.random() * this.colorList.length);
          colorStyle = this.colorList[randomIndex];
          consoleList.push({
            consoleName,
            'count': 1,
            colorStyle,
            'isSelected': false
          });
          this.colorList.splice(randomIndex, 1);
        } else {
          consoleList[foundConsoleIndex].count++;
          colorStyle = consoleList[foundConsoleIndex].colorStyle;
        }

        listObj.push({
          link,
          gameTitle,
          consoleName,
          comment,
          colorStyle
        });
      });

      return listObj;
    }
  }
  
};

export default MarkdownParserMixin;
