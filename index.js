const Browser = function (userAgent) {
  var u = userAgent || navigator.userAgent
  var that = this
  var match = {
    //The kernel
    Trident: u.indexOf('Trident') > 0 || u.indexOf('NET CLR') > 0,
    Presto: u.indexOf('Presto') > 0,
    WebKit: u.indexOf('AppleWebKit') > 0,
    Gecko: u.indexOf('Gecko/') > 0,
    //The browser
    UC: u.indexOf('UC') > 0 || u.indexOf(' UBrowser') > 0,
    QQ: u.indexOf('QQBrowser') > 0,
    BaiDu: u.indexOf('Baidu') > 0 || u.indexOf('BIDUBrowser') > 0,
    Maxthon: u.indexOf('Maxthon') > 0,
    LBBROWSER: u.indexOf('LBBROWSER') > 0,
    SouGou: u.indexOf('MetaSr') > 0 || u.indexOf('Sogou') > 0,
    IE: u.indexOf('MSIE') > 0 || u.indexOf('Trident') > 0,
    Firefox: u.indexOf('Firefox') > 0,
    Opera: u.indexOf('Opera') > 0 || u.indexOf('OPR') > 0,
    Safari: u.indexOf('Safari') > 0,
    Chrome: u.indexOf('Chrome') > 0 || u.indexOf('CriOS') > 0,
    Wechat: u.indexOf('MicroMessenger') > 0,
    Edge: u.indexOf('Edge') > 0 || u.indexOf('edge') > 0,
    //System or platform
    Windows: u.indexOf('Windows') > 0,
    Linux: u.indexOf('Linux') > 0,
    Mac: u.indexOf('Macintosh') > 0,
    Android: u.indexOf('Android') > 0 || u.indexOf('Adr') > 0,
    WP: u.indexOf('IEMobile') > 0,
    BlackBerry: u.indexOf('BlackBerry') > 0 || u.indexOf('RIM') > 0 || u.indexOf('BB') > 0,
    MeeGo: u.indexOf('MeeGo') > 0,
    Symbian: u.indexOf('Symbian') > 0,
    iOS: u.indexOf('like Mac OS X') > 0,
    iPhone: u.indexOf('iPh') > 0,
    iPad: u.indexOf('iPad') > 0,
    //equipment
    Mobile: u.indexOf('Mobi') > 0 || u.indexOf('iPh') > 0 || u.indexOf('480') > 0,
    Tablet: u.indexOf('Tablet') > 0 || u.indexOf('iPad') > 0 || u.indexOf('Nexus 7') > 0,
  }
  //correction
  if (match.Chrome) {
    match.Chrome = !(match.Opera + match.BaiDu + match.Maxthon + match.SouGou + match.UC + match.QQ + match.LBBROWSER + match.Edge)
  }
  if (match.Safari) {
    match.Safari = !(match.Chrome + match.Opera + match.BaiDu + match.Maxthon + match.SouGou + match.UC + match.QQ + match.LBBROWSER + match.Edge)
  }
  if (match.Mobile) {
    match.Mobile = !match.iPad
  }
  //The basic information
  var hash = {
    engine: ['WebKit', 'Trident', 'Gecko', 'Presto'],
    browser: ['Chrome', 'IE', 'Firefox', 'Opera', 'Safari', 'UC', 'QQ', 'BaiDu', 'Maxthon', 'SouGou', 'LBBROWSER', 'Wechat', 'Edge'],
    os: ['Windows', 'Linux', 'Mac', 'Android', 'iOS', 'iPhone', 'iPad', 'WP', 'BlackBerry', 'MeeGo', 'Symbian'],
    device: ['Mobile', 'Tablet'],
  }
  that.device = 'PC'
  that.language = (function () {
    var g = (navigator.browserLanguage || navigator.language).toLowerCase()
    return g === 'c' ? 'zh-cn' : g
  })()
  for (var s in hash) {
    for (var i = 0; i < hash[s].length; i++) {
      var value = hash[s][i]
      if (match[value]) {
        that[s] = value
      }
    }
  }
  //Version information
  var version = {
    Chrome: function () {
      return u.replace(/^.*Chrome\/([\d.]+).*$/, '$1')
    },
    Edge: function () {
      return u.replace(/^.*Edge\/([\d.]+).*$/, '$1')
    },
    IE: function () {
      var v = u.replace(/^.*MSIE ([\d.]+).*$/, '$1')
      if (v === u) {
        v = u.replace(/^.*rv:([\d.]+).*$/, '$1')
      }
      return v !== u ? v : ''
    },
    Firefox: function () {
      return u.replace(/^.*Firefox\/([\d.]+).*$/, '$1')
    },
    Safari: function () {
      return u.replace(/^.*Version\/([\d.]+).*$/, '$1')
    },
    Maxthon: function () {
      return u.replace(/^.*Maxthon\/([\d.]+).*$/, '$1')
    },
    QQ: function () {
      return u.replace(/^.*QQBrowser\/([\d.]+).*$/, '$1')
    },
    BaiDu: function () {
      return u.replace(/^.*BIDUBrowser[\s\/]([\d.]+).*$/, '$1')
    },
    UC: function () {
      return u.replace(/^.*UBrowser\/([\d.]+).*$/, '$1')
    },
    Wechat: function () {
      return u.replace(/^.*MicroMessenger\/([\d.]+).*$/, '$1')
    },
  }
  that.version = ''
  if (version[that.browser]) {
    that.version = version[that.browser]()
  }
}

function navigatorInfo(userAgent) {
  return new Browser(userAgent)
}
module.exports = navigatorInfo
