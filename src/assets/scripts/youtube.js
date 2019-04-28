function reloadYoutube() {
    setTimeout(() => {
      //var v = document.getElementsByClassName("youtube-player");
      var v = document.querySelectorAll(".youtube-player");
      //console.log("v:" + v);
      //console.log("v.length:" + v.length);
      for (var n = 0; n < v.length; n++) {
        //console.log("v[n].id:" + v[n].id);
        v[n].onclick = function () {
          var iframe = document.createElement("iframe");
          //console.log("this.dataset.id:" + this.dataset.id);
          iframe.setAttribute("src", "//www.youtube.com/embed/" + this.dataset.id + "?autoplay=1&autohide=2&border=0&wmode=opaque&enablejsapi=1&rel="+ this.dataset.related +"&controls="+this.dataset.control+"&showinfo=" + this.dataset.info);
          iframe.setAttribute("frameborder", "0");
          iframe.setAttribute("id", "youtube-iframe-" + this.dataset.id);
          iframe.setAttribute("style", "width: 100%; height: 100%; position: absolute; top: 0; left: 0;");
          if (this.dataset.fullscreen == 1){
            iframe.setAttribute("allowfullscreen", "");
          } 
          while (this.firstChild) {
            this.removeChild(this.firstChild);
          }
          this.appendChild(iframe);
        }
      }
      console.log("timeout 500ms reloadYoutube");
    }, 500);
  }