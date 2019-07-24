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
    /*  @function 剪切成摘要添加省略号
     *  @param {String} str —— 目标字符串
     *  @param {Number} num —— 限制字数个数
     *  @param {String} tar —— 末尾添加的字符串
     */
    Vue.prototype.summary = function (str, num, tar) {
      if (!tar) {
        tar = '...'
      }
      let newStr, oLength = str.length, tLength = tar.length;
      if (oLength > num) {
        newStr = str.substring(0, num - 1) + tar;
      } else {
        newStr = str;
      }
      return newStr
    }
    /*  @function 防抖函数
     *  @param {Function} fn —— 需要防抖的函数
     *  @param {Number} delay —— 防抖延迟时间
     */
    Vue.prototype.debounce = function (fn, delay) {
      let timer;
      return function () {
        clearTimeout(timer);
        timer = setTimeout(() => {
          fn.apply(this, arguments)
        }, delay)
      }
    };

    /*  @function 节流函数
     *  @param {Function} fn —— 需要节流的函数
     *  @param {Number} wait —— 节流等待时间
     */
    Vue.prototype.throttling = function (fn, wait) {
      let canRun = true;
      return function () {
        if (!canRun) return;
        canRun = false;
        setTimeout(() => {
          fn.apply(this, arguments);
          canRun = true;
        }, wait)
      }
    };

    /*  @function 判断数据类型
     *  @param {All} data —— 判断数据
     *  @param {String} type [String|Object|Number|...] —— 类型
     */
    Vue.prototype.judgeType = function (data, type) {
      let typeName = Object.prototype.toString.call(data);
      let reg = new RegExp(type);
      return reg.test(typeName);
    };

    /* @function 根据当前分辨率动态赋值像素
     * @param {Number} size
     * @param {Number} base
     * @return
     */
    Vue.prototype.rem2Px = function (size, base) {
      let e = document.body.clientWidth || document.documentElement.clientWidth;
      let baseWidth = 1920;
      return e / (base || baseWidth) * size;
    };

    /* @function 将时间戳或者中国标准时间处理成标准格式
     * @param {Number} timestamp —— 时间戳或者中国标准时间
     * @param {String} format —— 输出格式 (YYYY-MM-DD hh:mm:ss)
     *        {Boolean} format —— 是否为日期(true返回YYYY-MM-DD false返回hh:mm:ss)
     * @param {String} type —— 连接语种种类(CHS中文 默认符号连接)
     */
    Vue.prototype.timestampToTime = function (timestamp, format, type) {
      let dateStr = '';
      let date = timestamp ? new Date(timestamp) : new Date(); // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
      let Y = date.getFullYear();
      let M = String(date.getMonth() + 1).padStart(2, 0);
      let D = String(date.getDate()).padStart(2, 0);
      let h = String(date.getHours()).padStart(2, 0);
      let m = String(date.getMinutes()).padStart(2, 0);
      let s = String(date.getSeconds()).padStart(2, 0);
      switch (Object.prototype.toString.call(format)) {
        case '[object String]':
          let strArray = format.trim().split(' ');
          if (strArray.length > 1) {

          } else {

          }
          break;
        case '[object Boolean]':
          if (format) {
            switch (type) {
              case 'CHS':
                dateStr = Y + '年' + M + '月' + D + '日';
                break;
              default:
                dateStr = Y + '-' + M + '-' + D;
                break;
            }
          } else {
            switch (type) {
              case 'CHS':
                dateStr = h + '时' + m + '分' + s + '秒';
                break;
              default:
                dateStr = h + ':' + m + ':' + s;
                break;
            }
          }
          break;
      }
      console.log(Object.prototype.toString.call(format));
      return dateStr;
    }
  }
}
