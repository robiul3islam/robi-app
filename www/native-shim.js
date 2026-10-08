
/* ROBI native shim: makes blob downloads work inside the Android app */
(function () {
  var cap = window.Capacitor;
  var isNative = cap && cap.isNativePlatform && cap.isNativePlatform();
  if (!isNative) return;                       // PC / browser: default behaviour
  var blobs = new Map();
  var origCreate = URL.createObjectURL.bind(URL);
  URL.createObjectURL = function (b) { var u = origCreate(b); if (b instanceof Blob) blobs.set(u, b); return u; };
  function toBase64(blob) {
    return new Promise(function (res, rej) {
      var r = new FileReader();
      r.onload = function () { res(String(r.result).split(',')[1]); };
      r.onerror = rej; r.readAsDataURL(blob);
    });
  }
  async function saveAndShare(blob, name) {
    var P = cap.Plugins, data = await toBase64(blob);
    var w = await P.Filesystem.writeFile({ path: name, data: data, directory: 'CACHE' });
    await P.Share.share({ title: name, url: w.uri, dialogTitle: 'Save / Share: ' + name });
  }
  var origClick = HTMLAnchorElement.prototype.click;
  HTMLAnchorElement.prototype.click = function () {
    var a = this;
    if (a.hasAttribute('download') && a.href && a.href.indexOf('blob:') === 0) {
      var blob = blobs.get(a.href);
      if (blob) {
        saveAndShare(blob, a.getAttribute('download') || 'file').catch(function (e) {
          console.error(e); alert('Save failed: ' + (e && e.message ? e.message : e));
        });
        return;
      }
    }
    return origClick.apply(a, arguments);
  };
})();
