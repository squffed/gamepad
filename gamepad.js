/*
 * Gamepad API Test
 * Written in 2013 by Ted Mielczarek <ted@mielczarek.org>
 *
 * To the extent possible under law, the author(s) have dedicated all copyright and related and neighboring rights to this software to the public domain worldwide. This software is distributed without any warranty.
 *
 * You should have received a copy of the CC0 Public Domain Dedication along with this software. If not, see <http://creativecommons.org/publicdomain/zero/1.0/>.
 */
var haveEvents = 'GamepadEvent' in window;
var haveWebkitEvents = 'WebKitGamepadEvent' in window;
var controllers = {};
var rAF = window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.requestAnimationFrame;

var overlays = {};
var controllerOverlay = document.getElementById("controllerOverlay");

function connecthandler(e) {
  addgamepad(e.gamepad);
}
function addgamepad(gamepad) {
  controllers[gamepad.index] = gamepad; var d = document.createElement("div");
  d.setAttribute("id", "controller" + gamepad.index);
  var t = document.createElement("h1");
  t.appendChild(document.createTextNode("gamepad: " + gamepad.id));
  d.appendChild(t);
  var b = document.createElement("div");
  b.className = "buttons";
  for (var i=0; i<gamepad.buttons.length; i++) {
    var e = document.createElement("span");
    e.className = "button";
    //e.id = "b" + i;
    e.innerHTML = i;
    b.appendChild(e);
  }
  d.appendChild(b);
  var a = document.createElement("div");
  a.className = "axes";
  for (i=0; i<gamepad.axes.length; i++) {
    e = document.createElement("meter");
    e.className = "axis";
    //e.id = "a" + i;
    e.setAttribute("min", "-1");
    e.setAttribute("max", "1");
    e.setAttribute("value", "0");
    e.innerHTML = i;
    a.appendChild(e);
  }
  d.appendChild(a);
  document.getElementById("start").style.display = "none";
  document.body.appendChild(d);
  rAF(updateStatus);
}

function disconnecthandler(e) {
  removegamepad(e.gamepad);
}

function removegamepad(gamepad) {
  var d = document.getElementById("controller" + gamepad.index);
  document.body.removeChild(d);
  delete controllers[gamepad.index];
}

function updateStatus() {
  scangamepads();
  for (j in controllers) {
    var controller = controllers[j];
    var d = document.getElementById("controller" + j);
    var buttons = d.getElementsByClassName("button");
    for (var i=0; i<controller.buttons.length; i++) {
      var b = buttons[i];
      var val = controller.buttons[i];
      var pressed = val == 1.0;
      var touched = false;
      if (typeof(val) == "object") {
        pressed = val.pressed;
        if ('touched' in val) {
          touched = val.touched;
        }
        val = val.value;

        if(touched || pressed)
        {
          console.log(b.innerText)
          var name = b.innerText.trim();
          if(name == "0") //Y
          {
            document.getElementById("Y").style = "display: inline;";
          }
          else if(name == "1") //B
          {
            document.getElementById("B").style = "display: inline;";
          }
          else if(name == "2") //A
          {
            document.getElementById("A").style = "display: inline;";
          }
          else if(name == "3") //X
          {
            document.getElementById("X").style = "display: inline;";
          }
          else if(name == "4") //LB
          {
            document.getElementById("LB").style = "display: inline;";
          }
          else if(name == "5") //RB
          {
            document.getElementById("RB").style = "display: inline;";
          }
        }
        else
        {
          var name = b.innerText.trim();
          if(name == "0") //Y
          {
            document.getElementById("Y").style = "";
          }
          else if(name == "1") //B
          {
            document.getElementById("B").style = "";
          }
          else if(name == "2") //A
          {
            document.getElementById("A").style = "";
          }
          else if(name == "3") //X
          {
            document.getElementById("X").style = "";
          }
          else if(name == "4") //LB
          {
            document.getElementById("LB").style = "";
          }
          else if(name == "5") //RB
          {
            document.getElementById("RB").style = "";
          }
        }
      }
      var pct = Math.round(val * 100) + "%";
      b.style.backgroundSize = pct + " " + pct;
      b.className = "button";
      if (pressed) {
        b.className += " pressed";
      }
      if (touched) {
        b.className += " touched";
      }
    }

    var axes = d.getElementsByClassName("axis");
    for (var i=0; i<controller.axes.length; i++) {
      var a = axes[i];
      a.innerHTML = i + ": " + controller.axes[i].toFixed(4);
      var oldVal = a.getAttribute("value");
      a.setAttribute("value", controller.axes[i]);
      var newVal = a.getAttribute("value")
      if(i == 9) //DPAD
      {
        console.log(i + " " + a.getAttribute("value"));

        if(newVal == 0.7142857313156128) //Left
        {
          document.getElementById("Left").style = "display: inline;";
          document.getElementById("Up").style = "";
          document.getElementById("Down").style = "";
          document.getElementById("Right").style = "";
        }
        else if(newVal == -1) //Up
        {
          document.getElementById("Up").style = "display: inline;";
          document.getElementById("Left").style = "";
          document.getElementById("Down").style = "";
          document.getElementById("Right").style = "";
        }
        else if(newVal == 0.14285719394683838) //Down
        {
          document.getElementById("Down").style = "display: inline;";
          document.getElementById("Up").style = "";
          document.getElementById("Left").style = "";
          document.getElementById("Right").style = "";
        }
        else if(newVal == -0.4285714030265808) //Right
        {
          document.getElementById("Right").style = "display: inline;";
          document.getElementById("Up").style = "";
          document.getElementById("Left").style = "";
          document.getElementById("Down").style = "";
        }
        else if(newVal == 1) //Up Left
        {
          document.getElementById("Up").style = "display: inline;";
          document.getElementById("Left").style = "display: inline;";
          document.getElementById("Down").style = "";
          document.getElementById("Right").style = "";
        }
        else if(newVal == -0.7142857313156128) //Up Right
        {
          document.getElementById("Up").style = "display: inline;";
          document.getElementById("Right").style = "display: inline;";
          document.getElementById("Left").style = "";
          document.getElementById("Down").style = "";
        }
        else if(newVal == 0.4285714626312256) //Down Left
        {
          document.getElementById("Down").style = "display: inline;";
          document.getElementById("Left").style = "display: inline;";
          document.getElementById("Up").style = "";
          document.getElementById("Right").style = "";
        }
        else if(newVal == -0.1428571343421936) //Down Right
        {
          document.getElementById("Down").style = "display: inline;";
          document.getElementById("Right").style = "display: inline;";
          document.getElementById("Up").style = "";
          document.getElementById("Left").style = "";
        }
        else // Neutral
        {
          document.getElementById("Up").style = "";
          document.getElementById("Left").style = "";
          document.getElementById("Down").style = "";
          document.getElementById("Right").style = "";
        }
      }
    }
  }
  rAF(updateStatus);
}

function scangamepads() {
  var gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads() : []);
  for (var i = 0; i < gamepads.length; i++) {
    if (gamepads[i] && (gamepads[i].index in controllers)) {
      controllers[gamepads[i].index] = gamepads[i];
    }
  }
}

if (haveEvents) {
  window.addEventListener("gamepadconnected", connecthandler);
  window.addEventListener("gamepaddisconnected", disconnecthandler);
} else if (haveWebkitEvents) {
  window.addEventListener("webkitgamepadconnected", connecthandler);
  window.addEventListener("webkitgamepaddisconnected", disconnecthandler);
} else {
  setInterval(scangamepads, 500);
}
