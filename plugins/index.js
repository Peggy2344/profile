;(win => {
    class TypeWriter {
      constructor (config) {
        var container = config.container;
        var strs = config.strs;
        var delay = config.delay || 500;
        var len = strs.length;
  
        function buildWord (str, index) {
          return index === len ? str.split('') : str.split('').concat('@!del'.repeat(str.length).split('@').slice(1));
        }
        function writeWord (word) {
          var innerHTML = container.innerHTML;
          if ('!del' === word) {
            container.innerHTML = innerHTML.slice(0, innerHTML.length - 1);
          } else {
            container.innerHTML = innerHTML + '' + word;
          }
        }

        function write (words, index) {
          var word = words.shift();
          if (!word) return ;
          word = buildWord(word, ++index);
          typing(word, true, write.bind(this, words, index));
        }

        function typing (words, type, callback) {
          setTimeout(() => {
            var word = words.shift();
            word ? typing(words, '!del' !== word, callback) : callback();
            writeWord(word || '');
          }, type ? delay : delay * 0.4);
        }
  
        write(strs, 0);
      }
    }
    win.TypeWriter = TypeWriter;
  })(window);