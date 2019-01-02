export default {
  install: function (Vue, options) {
    // 设置cookie
    Vue.prototype.$setCookie = function (options) {
      let self = this;
      let setCookie = {
        _cookieInit: function () {
          options.isSave ? this._cookieSave() : this._cookieShow()
        },
        _cookieSave: function () {
          let encodeName = encodeURI(options.data.userName);
          if (options.data.isRemember) {
            this._cookieSet(options.name, options.data.userName, options.time);
            this._cookieSet(encodeName, options.data.passWord, options.time);
          } else {
            this._cookieSet(options.name, '', -1);
            this._cookieSet(encodeName, '', -1);
          }
        },
        _cookieShow: function () {
          let name = this._cookieGet(options.name);
          if (name !== '' && name !== undefined) {
            let encodeName = encodeURI(name);
            let word = this._cookieGet(encodeName);
            Vue.set(self, options.data.userName, name);
            Vue.set(self, options.data.passWord, word);
            Vue.set(self, options.data.isRemember, true);
          }
        },
        _cookieSet: function (name, value, days) {
          let date = new Date();
          date.setTime(date.getTime() + (days * 86400000));
          let expires = 'expires=' + date.toUTCString();
          document.cookie = name + '=' + escape(value) + '; ' + expires;
        },
        _cookieGet: function (name) {
          let start = document.cookie.indexOf(name + '=');
          if (start !== -1) {
            start = start + name.length + 1;
            //获取value的终止位置
            let end = document.cookie.indexOf(';', start);
            if (end === -1) {
              end = document.cookie.length;
            }
            //截获cookie的value值,并返回
            return unescape(document.cookie.substring(start, end));
          }
        }
      };
      setCookie._cookieInit();
    };
    // 深拷贝
    Vue.prototype.$cloneSun = function (target, obj) {
      let sunObj = target || {};
      let toStr = Object.prototype.toString;
      for (let prop in obj) {
        if (obj.hasOwnProperty(prop)) {
          if (typeof obj[prop] !== 'object' && obj[prop] !== 'null') {
            sunObj[prop] = obj[prop];
          } else {
            sunObj[prop] = toStr.call(obj[prop]) === '[object Object]' ? {} : [];
            this.$cloneSun(obj[prop], sunObj[prop]);
          }
        }
      }
      return sunObj
    };
    // set token
    Vue.prototype.setToken = function (name, val) {
      let type = Object.prototype.toString;
      if (window.sessionStorage) {
        if (type.call(name) === '[object Object]') {
          for (let key in name) {
            if (name.hasOwnProperty(key)) {
              sessionStorage.setItem(key, name[key]);
            }
          }
        } else if (type.call(name) === '[object Array]') {
          name.forEach(function (item, i) {
            sessionStorage.setItem(item.name, item.value);
          });
        } else if (type.call(name) === '[object String]') {
          sessionStorage.setItem(name, val);
        }
      }
    };
    // get token
    Vue.prototype.getToken = function (name) {
      let token = sessionStorage.getItem(name);
      if (token) {
        return token
      } else {
        return ''
      }
    };
    // remove Token
    Vue.prototype.removeToken = function (name) {
      let type = Object.prototype.toString;
      if (window.sessionStorage) {
        if (type.call(name) === '[object Array]') {
          name.forEach(function (item, i) {
            sessionStorage.removeItem(item);
          });
        } else if (type.call(name) === '[object String]') {
          if (name === 'all') {
            sessionStorage.clear();
          } else {
            sessionStorage.removeItem(name);
          }
        }
      }
    };
    // 循环验证 (object/array)
    // object: { 提示语: 需要验证的值 }
    // array: [{val: 需要验证的值, prompt: 提示语}]
    Vue.prototype.validate = function (data) {
      let type = Object.prototype.toString;
      if (type.call(data) === '[object Array]') {
        for (let i = 0; i < data.length; i++) {
          if (!data[i].val) {
            this.$alert(data[i].prompt, '提示', {
              confirmButtonText: '确定',
              type: 'warning',
              callback: action => {
              }
            });
            return false;
          }
        }
        return true
      } else if (type.call(data) === '[object Object]') {
        for (let key in data) {
          if (data.hasOwnProperty(key)) {
            if (!data[key]) {
              this.$alert(key, '提示', {
                confirmButtonText: '确定',
                type: 'warning',
                callback: action => {
                }
              });
              return false;
            }
          }
        }
        return true
      }
    }
    // 剪切成摘要添加省略号
    //
    Vue.prototype.summary = function (str, num, tar) {
      if (!tar) {
        tar = '...'
      }
      let newStr, oLength = str.length, tLength = tar.length;
      if (oLength > num) {
        newStr = str.substring(0, num - tLength) + tar;
      } else if (oLength === num) {
        newStr = str;
      } else {
        if (oLength + tLength <= num) {
          newStr = str;
        } else {
          let s = oLength + tLength - num;
          newStr = str.substring(0, str.length - s) + tar;
        }
      }
      return newStr
    }
  }
}
