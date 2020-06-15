"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _blessed = _interopRequireDefault(require("blessed"));

var _detectSong = _interopRequireDefault(require("../detect-song"));

var _controls = require("./controls");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var keys = {
  VOLUME_DOWN: 'left',
  VOLUME_UP: 'right',
  GET_CURRENT_SONG: 'C-a',
  EXIT: 'C-c'
};

var init = function init(lofiStream) {
  var screen = _blessed["default"].screen({
    smartCSR: true,
    grabKeys: true
  });

  screen.title = 'lofi-cli';

  var title = _blessed["default"].text({
    left: 'center',
    tags: true,
    content: ' {bold}LOFI{/bold}',
    align: 'center',
    style: {
      bg: '#ad006e'
    }
  });

  var controls = (0, _controls.createControls)();
  screen.append(controls.box);
  screen.append(title);
  screen.render();
  var cli = {
    screen: screen,
    controls: controls
  };
  screen.on('keypress', onKeyPress(cli, lofiStream));
  return cli;
};

var onKeyPress = function onKeyPress(cli, lofiStream) {
  return function (ch, key) {
    var offset = 0.1;

    switch (key.full) {
      case keys.VOLUME_DOWN:
        if (lofiStream.volume.volume - offset >= 0) updateVolume(lofiStream.volume.volume - 0.1, cli, lofiStream);
        break;

      case keys.VOLUME_UP:
        if (lofiStream.volume.volume + offset <= 1) updateVolume(lofiStream.volume.volume + 0.1, cli, lofiStream);
        break;

      case keys.GET_CURRENT_SONG:
        (0, _detectSong["default"])().then(function (song) {
          return console.log("Current song: ".concat(song));
        });
        break;

      case keys.EXIT:
        process.exit(1);
    }
  };
};

var updateVolume = function updateVolume(volume, cli, lofiStream) {
  lofiStream.volume.setVolume(volume);
  cli.controls.volume = volume;
  (0, _controls.updateControls)(cli.controls);
  updateScreen(cli);
};

var updateScreen = function updateScreen(cli) {
  return cli.screen.render();
};

var _default = init;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jbGkvY2xpLmpzIl0sIm5hbWVzIjpbImtleXMiLCJWT0xVTUVfRE9XTiIsIlZPTFVNRV9VUCIsIkdFVF9DVVJSRU5UX1NPTkciLCJFWElUIiwiaW5pdCIsImxvZmlTdHJlYW0iLCJzY3JlZW4iLCJibGVzc2VkIiwic21hcnRDU1IiLCJncmFiS2V5cyIsInRpdGxlIiwidGV4dCIsImxlZnQiLCJ0YWdzIiwiY29udGVudCIsImFsaWduIiwic3R5bGUiLCJiZyIsImNvbnRyb2xzIiwiYXBwZW5kIiwiYm94IiwicmVuZGVyIiwiY2xpIiwib24iLCJvbktleVByZXNzIiwiY2giLCJrZXkiLCJvZmZzZXQiLCJmdWxsIiwidm9sdW1lIiwidXBkYXRlVm9sdW1lIiwidGhlbiIsInNvbmciLCJjb25zb2xlIiwibG9nIiwicHJvY2VzcyIsImV4aXQiLCJzZXRWb2x1bWUiLCJ1cGRhdGVTY3JlZW4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7OztBQUVBLElBQU1BLElBQUksR0FBRztBQUNUQyxFQUFBQSxXQUFXLEVBQUUsTUFESjtBQUVUQyxFQUFBQSxTQUFTLEVBQUUsT0FGRjtBQUdUQyxFQUFBQSxnQkFBZ0IsRUFBRSxLQUhUO0FBSVRDLEVBQUFBLElBQUksRUFBRTtBQUpHLENBQWI7O0FBT0EsSUFBTUMsSUFBSSxHQUFHLFNBQVBBLElBQU8sQ0FBQUMsVUFBVSxFQUFJO0FBQ3ZCLE1BQU1DLE1BQU0sR0FBR0Msb0JBQVFELE1BQVIsQ0FBZTtBQUMxQkUsSUFBQUEsUUFBUSxFQUFFLElBRGdCO0FBRTFCQyxJQUFBQSxRQUFRLEVBQUU7QUFGZ0IsR0FBZixDQUFmOztBQUlBSCxFQUFBQSxNQUFNLENBQUNJLEtBQVAsR0FBZSxVQUFmOztBQUVBLE1BQU1BLEtBQUssR0FBR0gsb0JBQVFJLElBQVIsQ0FBYTtBQUN2QkMsSUFBQUEsSUFBSSxFQUFFLFFBRGlCO0FBRXZCQyxJQUFBQSxJQUFJLEVBQUUsSUFGaUI7QUFHdkJDLElBQUFBLE9BQU8sRUFBRSxvQkFIYztBQUl2QkMsSUFBQUEsS0FBSyxFQUFFLFFBSmdCO0FBS3ZCQyxJQUFBQSxLQUFLLEVBQUU7QUFDSEMsTUFBQUEsRUFBRSxFQUFFO0FBREQ7QUFMZ0IsR0FBYixDQUFkOztBQVVBLE1BQU1DLFFBQVEsR0FBRywrQkFBakI7QUFFQVosRUFBQUEsTUFBTSxDQUFDYSxNQUFQLENBQWNELFFBQVEsQ0FBQ0UsR0FBdkI7QUFDQWQsRUFBQUEsTUFBTSxDQUFDYSxNQUFQLENBQWNULEtBQWQ7QUFDQUosRUFBQUEsTUFBTSxDQUFDZSxNQUFQO0FBRUEsTUFBTUMsR0FBRyxHQUFHO0FBQ1JoQixJQUFBQSxNQUFNLEVBQUVBLE1BREE7QUFFUlksSUFBQUEsUUFBUSxFQUFFQTtBQUZGLEdBQVo7QUFJQVosRUFBQUEsTUFBTSxDQUFDaUIsRUFBUCxDQUFVLFVBQVYsRUFBc0JDLFVBQVUsQ0FBQ0YsR0FBRCxFQUFNakIsVUFBTixDQUFoQztBQUNBLFNBQU9pQixHQUFQO0FBQ0gsQ0E3QkQ7O0FBK0JBLElBQU1FLFVBQVUsR0FBRyxTQUFiQSxVQUFhLENBQUNGLEdBQUQsRUFBTWpCLFVBQU47QUFBQSxTQUFxQixVQUFDb0IsRUFBRCxFQUFLQyxHQUFMLEVBQWE7QUFDakQsUUFBTUMsTUFBTSxHQUFHLEdBQWY7O0FBQ0EsWUFBUUQsR0FBRyxDQUFDRSxJQUFaO0FBQ0EsV0FBSzdCLElBQUksQ0FBQ0MsV0FBVjtBQUNJLFlBQUlLLFVBQVUsQ0FBQ3dCLE1BQVgsQ0FBa0JBLE1BQWxCLEdBQTJCRixNQUEzQixJQUFxQyxDQUF6QyxFQUE0Q0csWUFBWSxDQUFDekIsVUFBVSxDQUFDd0IsTUFBWCxDQUFrQkEsTUFBbEIsR0FBMkIsR0FBNUIsRUFBaUNQLEdBQWpDLEVBQXNDakIsVUFBdEMsQ0FBWjtBQUM1Qzs7QUFDSixXQUFLTixJQUFJLENBQUNFLFNBQVY7QUFDSSxZQUFJSSxVQUFVLENBQUN3QixNQUFYLENBQWtCQSxNQUFsQixHQUEyQkYsTUFBM0IsSUFBcUMsQ0FBekMsRUFBNENHLFlBQVksQ0FBQ3pCLFVBQVUsQ0FBQ3dCLE1BQVgsQ0FBa0JBLE1BQWxCLEdBQTJCLEdBQTVCLEVBQWlDUCxHQUFqQyxFQUFzQ2pCLFVBQXRDLENBQVo7QUFDNUM7O0FBQ0osV0FBS04sSUFBSSxDQUFDRyxnQkFBVjtBQUNJLHNDQUFhNkIsSUFBYixDQUFrQixVQUFBQyxJQUFJO0FBQUEsaUJBQUlDLE9BQU8sQ0FBQ0MsR0FBUix5QkFBNkJGLElBQTdCLEVBQUo7QUFBQSxTQUF0QjtBQUNBOztBQUNKLFdBQUtqQyxJQUFJLENBQUNJLElBQVY7QUFDSWdDLFFBQUFBLE9BQU8sQ0FBQ0MsSUFBUixDQUFhLENBQWI7QUFYSjtBQWFILEdBZmtCO0FBQUEsQ0FBbkI7O0FBaUJBLElBQU1OLFlBQVksR0FBRyxTQUFmQSxZQUFlLENBQUNELE1BQUQsRUFBU1AsR0FBVCxFQUFjakIsVUFBZCxFQUE2QjtBQUM5Q0EsRUFBQUEsVUFBVSxDQUFDd0IsTUFBWCxDQUFrQlEsU0FBbEIsQ0FBNEJSLE1BQTVCO0FBQ0FQLEVBQUFBLEdBQUcsQ0FBQ0osUUFBSixDQUFhVyxNQUFiLEdBQXNCQSxNQUF0QjtBQUNBLGdDQUFlUCxHQUFHLENBQUNKLFFBQW5CO0FBQ0FvQixFQUFBQSxZQUFZLENBQUNoQixHQUFELENBQVo7QUFDSCxDQUxEOztBQU9BLElBQU1nQixZQUFZLEdBQUcsU0FBZkEsWUFBZSxDQUFBaEIsR0FBRztBQUFBLFNBQUlBLEdBQUcsQ0FBQ2hCLE1BQUosQ0FBV2UsTUFBWCxFQUFKO0FBQUEsQ0FBeEI7O2VBRWVqQixJIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGJsZXNzZWQgZnJvbSAnYmxlc3NlZCdcbmltcG9ydCBkZXRlY3RTb25nIGZyb20gJy4uL2RldGVjdC1zb25nJ1xuaW1wb3J0IHsgY3JlYXRlQ29udHJvbHMsIHVwZGF0ZUNvbnRyb2xzIH0gZnJvbSAnLi9jb250cm9scydcblxuY29uc3Qga2V5cyA9IHtcbiAgICBWT0xVTUVfRE9XTjogJ2xlZnQnLFxuICAgIFZPTFVNRV9VUDogJ3JpZ2h0JyxcbiAgICBHRVRfQ1VSUkVOVF9TT05HOiAnQy1hJyxcbiAgICBFWElUOiAnQy1jJ1xufVxuXG5jb25zdCBpbml0ID0gbG9maVN0cmVhbSA9PiB7XG4gICAgY29uc3Qgc2NyZWVuID0gYmxlc3NlZC5zY3JlZW4oe1xuICAgICAgICBzbWFydENTUjogdHJ1ZSxcbiAgICAgICAgZ3JhYktleXM6IHRydWVcbiAgICB9KVxuICAgIHNjcmVlbi50aXRsZSA9ICdsb2ZpLWNsaSdcblxuICAgIGNvbnN0IHRpdGxlID0gYmxlc3NlZC50ZXh0KHtcbiAgICAgICAgbGVmdDogJ2NlbnRlcicsXG4gICAgICAgIHRhZ3M6IHRydWUsXG4gICAgICAgIGNvbnRlbnQ6ICcge2JvbGR9TE9GSXsvYm9sZH0nLFxuICAgICAgICBhbGlnbjogJ2NlbnRlcicsXG4gICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICBiZzogJyNhZDAwNmUnXG4gICAgICAgIH1cbiAgICB9KVxuXG4gICAgY29uc3QgY29udHJvbHMgPSBjcmVhdGVDb250cm9scygpXG5cbiAgICBzY3JlZW4uYXBwZW5kKGNvbnRyb2xzLmJveClcbiAgICBzY3JlZW4uYXBwZW5kKHRpdGxlKVxuICAgIHNjcmVlbi5yZW5kZXIoKVxuXG4gICAgY29uc3QgY2xpID0ge1xuICAgICAgICBzY3JlZW46IHNjcmVlbixcbiAgICAgICAgY29udHJvbHM6IGNvbnRyb2xzXG4gICAgfVxuICAgIHNjcmVlbi5vbigna2V5cHJlc3MnLCBvbktleVByZXNzKGNsaSwgbG9maVN0cmVhbSkpXG4gICAgcmV0dXJuIGNsaVxufVxuXG5jb25zdCBvbktleVByZXNzID0gKGNsaSwgbG9maVN0cmVhbSkgPT4gKGNoLCBrZXkpID0+IHtcbiAgICBjb25zdCBvZmZzZXQgPSAwLjFcbiAgICBzd2l0Y2ggKGtleS5mdWxsKSB7XG4gICAgY2FzZSBrZXlzLlZPTFVNRV9ET1dOOlxuICAgICAgICBpZiAobG9maVN0cmVhbS52b2x1bWUudm9sdW1lIC0gb2Zmc2V0ID49IDApIHVwZGF0ZVZvbHVtZShsb2ZpU3RyZWFtLnZvbHVtZS52b2x1bWUgLSAwLjEsIGNsaSwgbG9maVN0cmVhbSlcbiAgICAgICAgYnJlYWtcbiAgICBjYXNlIGtleXMuVk9MVU1FX1VQOlxuICAgICAgICBpZiAobG9maVN0cmVhbS52b2x1bWUudm9sdW1lICsgb2Zmc2V0IDw9IDEpIHVwZGF0ZVZvbHVtZShsb2ZpU3RyZWFtLnZvbHVtZS52b2x1bWUgKyAwLjEsIGNsaSwgbG9maVN0cmVhbSlcbiAgICAgICAgYnJlYWtcbiAgICBjYXNlIGtleXMuR0VUX0NVUlJFTlRfU09ORzpcbiAgICAgICAgZGV0ZWN0U29uZygpLnRoZW4oc29uZyA9PiBjb25zb2xlLmxvZyhgQ3VycmVudCBzb25nOiAke3Nvbmd9YCkpXG4gICAgICAgIGJyZWFrXG4gICAgY2FzZSBrZXlzLkVYSVQ6XG4gICAgICAgIHByb2Nlc3MuZXhpdCgxKVxuICAgIH1cbn1cblxuY29uc3QgdXBkYXRlVm9sdW1lID0gKHZvbHVtZSwgY2xpLCBsb2ZpU3RyZWFtKSA9PiB7XG4gICAgbG9maVN0cmVhbS52b2x1bWUuc2V0Vm9sdW1lKHZvbHVtZSlcbiAgICBjbGkuY29udHJvbHMudm9sdW1lID0gdm9sdW1lXG4gICAgdXBkYXRlQ29udHJvbHMoY2xpLmNvbnRyb2xzKVxuICAgIHVwZGF0ZVNjcmVlbihjbGkpXG59XG5cbmNvbnN0IHVwZGF0ZVNjcmVlbiA9IGNsaSA9PiBjbGkuc2NyZWVuLnJlbmRlcigpXG5cbmV4cG9ydCBkZWZhdWx0IGluaXRcbiJdfQ==