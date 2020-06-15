"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _blessed = _interopRequireDefault(require("blessed"));

var _detectSong = _interopRequireDefault(require("../detect-song"));

var _controls = require("./controls");

var _audioVisualizer = _interopRequireDefault(require("../audio-visualize/audio-visualizer"));

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
  (0, _audioVisualizer["default"])(lofiStream.stream, (0, _controls.updateColor)(controls, screen));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jbGkvY2xpLmpzIl0sIm5hbWVzIjpbImtleXMiLCJWT0xVTUVfRE9XTiIsIlZPTFVNRV9VUCIsIkdFVF9DVVJSRU5UX1NPTkciLCJFWElUIiwiaW5pdCIsImxvZmlTdHJlYW0iLCJzY3JlZW4iLCJibGVzc2VkIiwic21hcnRDU1IiLCJncmFiS2V5cyIsInRpdGxlIiwidGV4dCIsImxlZnQiLCJ0YWdzIiwiY29udGVudCIsImFsaWduIiwic3R5bGUiLCJiZyIsImNvbnRyb2xzIiwiYXBwZW5kIiwiYm94IiwicmVuZGVyIiwiY2xpIiwib24iLCJvbktleVByZXNzIiwic3RyZWFtIiwiY2giLCJrZXkiLCJvZmZzZXQiLCJmdWxsIiwidm9sdW1lIiwidXBkYXRlVm9sdW1lIiwidGhlbiIsInNvbmciLCJjb25zb2xlIiwibG9nIiwicHJvY2VzcyIsImV4aXQiLCJzZXRWb2x1bWUiLCJ1cGRhdGVTY3JlZW4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUVBLElBQU1BLElBQUksR0FBRztBQUNUQyxFQUFBQSxXQUFXLEVBQUUsTUFESjtBQUVUQyxFQUFBQSxTQUFTLEVBQUUsT0FGRjtBQUdUQyxFQUFBQSxnQkFBZ0IsRUFBRSxLQUhUO0FBSVRDLEVBQUFBLElBQUksRUFBRTtBQUpHLENBQWI7O0FBT0EsSUFBTUMsSUFBSSxHQUFHLFNBQVBBLElBQU8sQ0FBQUMsVUFBVSxFQUFJO0FBQ3ZCLE1BQU1DLE1BQU0sR0FBR0Msb0JBQVFELE1BQVIsQ0FBZTtBQUMxQkUsSUFBQUEsUUFBUSxFQUFFLElBRGdCO0FBRTFCQyxJQUFBQSxRQUFRLEVBQUU7QUFGZ0IsR0FBZixDQUFmOztBQUlBSCxFQUFBQSxNQUFNLENBQUNJLEtBQVAsR0FBZSxVQUFmOztBQUVBLE1BQU1BLEtBQUssR0FBR0gsb0JBQVFJLElBQVIsQ0FBYTtBQUN2QkMsSUFBQUEsSUFBSSxFQUFFLFFBRGlCO0FBRXZCQyxJQUFBQSxJQUFJLEVBQUUsSUFGaUI7QUFHdkJDLElBQUFBLE9BQU8sRUFBRSxvQkFIYztBQUl2QkMsSUFBQUEsS0FBSyxFQUFFLFFBSmdCO0FBS3ZCQyxJQUFBQSxLQUFLLEVBQUU7QUFDSEMsTUFBQUEsRUFBRSxFQUFFO0FBREQ7QUFMZ0IsR0FBYixDQUFkOztBQVVBLE1BQU1DLFFBQVEsR0FBRywrQkFBakI7QUFFQVosRUFBQUEsTUFBTSxDQUFDYSxNQUFQLENBQWNELFFBQVEsQ0FBQ0UsR0FBdkI7QUFDQWQsRUFBQUEsTUFBTSxDQUFDYSxNQUFQLENBQWNULEtBQWQ7QUFDQUosRUFBQUEsTUFBTSxDQUFDZSxNQUFQO0FBRUEsTUFBTUMsR0FBRyxHQUFHO0FBQ1JoQixJQUFBQSxNQUFNLEVBQUVBLE1BREE7QUFFUlksSUFBQUEsUUFBUSxFQUFFQTtBQUZGLEdBQVo7QUFJQVosRUFBQUEsTUFBTSxDQUFDaUIsRUFBUCxDQUFVLFVBQVYsRUFBc0JDLFVBQVUsQ0FBQ0YsR0FBRCxFQUFNakIsVUFBTixDQUFoQztBQUVBLG1DQUFnQkEsVUFBVSxDQUFDb0IsTUFBM0IsRUFBbUMsMkJBQVlQLFFBQVosRUFBc0JaLE1BQXRCLENBQW5DO0FBQ0EsU0FBT2dCLEdBQVA7QUFDSCxDQS9CRDs7QUFpQ0EsSUFBTUUsVUFBVSxHQUFHLFNBQWJBLFVBQWEsQ0FBQ0YsR0FBRCxFQUFNakIsVUFBTjtBQUFBLFNBQXFCLFVBQUNxQixFQUFELEVBQUtDLEdBQUwsRUFBYTtBQUNqRCxRQUFNQyxNQUFNLEdBQUcsR0FBZjs7QUFDQSxZQUFRRCxHQUFHLENBQUNFLElBQVo7QUFDQSxXQUFLOUIsSUFBSSxDQUFDQyxXQUFWO0FBQ0ksWUFBSUssVUFBVSxDQUFDeUIsTUFBWCxDQUFrQkEsTUFBbEIsR0FBMkJGLE1BQTNCLElBQXFDLENBQXpDLEVBQTRDRyxZQUFZLENBQUMxQixVQUFVLENBQUN5QixNQUFYLENBQWtCQSxNQUFsQixHQUEyQixHQUE1QixFQUFpQ1IsR0FBakMsRUFBc0NqQixVQUF0QyxDQUFaO0FBQzVDOztBQUNKLFdBQUtOLElBQUksQ0FBQ0UsU0FBVjtBQUNJLFlBQUlJLFVBQVUsQ0FBQ3lCLE1BQVgsQ0FBa0JBLE1BQWxCLEdBQTJCRixNQUEzQixJQUFxQyxDQUF6QyxFQUE0Q0csWUFBWSxDQUFDMUIsVUFBVSxDQUFDeUIsTUFBWCxDQUFrQkEsTUFBbEIsR0FBMkIsR0FBNUIsRUFBaUNSLEdBQWpDLEVBQXNDakIsVUFBdEMsQ0FBWjtBQUM1Qzs7QUFDSixXQUFLTixJQUFJLENBQUNHLGdCQUFWO0FBQ0ksc0NBQWE4QixJQUFiLENBQWtCLFVBQUFDLElBQUk7QUFBQSxpQkFBSUMsT0FBTyxDQUFDQyxHQUFSLHlCQUE2QkYsSUFBN0IsRUFBSjtBQUFBLFNBQXRCO0FBQ0E7O0FBQ0osV0FBS2xDLElBQUksQ0FBQ0ksSUFBVjtBQUNJaUMsUUFBQUEsT0FBTyxDQUFDQyxJQUFSLENBQWEsQ0FBYjtBQVhKO0FBYUgsR0Fma0I7QUFBQSxDQUFuQjs7QUFpQkEsSUFBTU4sWUFBWSxHQUFHLFNBQWZBLFlBQWUsQ0FBQ0QsTUFBRCxFQUFTUixHQUFULEVBQWNqQixVQUFkLEVBQTZCO0FBQzlDQSxFQUFBQSxVQUFVLENBQUN5QixNQUFYLENBQWtCUSxTQUFsQixDQUE0QlIsTUFBNUI7QUFDQVIsRUFBQUEsR0FBRyxDQUFDSixRQUFKLENBQWFZLE1BQWIsR0FBc0JBLE1BQXRCO0FBQ0EsZ0NBQWVSLEdBQUcsQ0FBQ0osUUFBbkI7QUFDQXFCLEVBQUFBLFlBQVksQ0FBQ2pCLEdBQUQsQ0FBWjtBQUNILENBTEQ7O0FBT0EsSUFBTWlCLFlBQVksR0FBRyxTQUFmQSxZQUFlLENBQUFqQixHQUFHO0FBQUEsU0FBSUEsR0FBRyxDQUFDaEIsTUFBSixDQUFXZSxNQUFYLEVBQUo7QUFBQSxDQUF4Qjs7ZUFFZWpCLEkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYmxlc3NlZCBmcm9tICdibGVzc2VkJ1xuaW1wb3J0IGRldGVjdFNvbmcgZnJvbSAnLi4vZGV0ZWN0LXNvbmcnXG5pbXBvcnQgeyBjcmVhdGVDb250cm9scywgdXBkYXRlQ29udHJvbHMsIHVwZGF0ZUNvbG9yIH0gZnJvbSAnLi9jb250cm9scydcbmltcG9ydCBhdWRpb1Zpc3VhbGl6ZXIgZnJvbSAnLi4vYXVkaW8tdmlzdWFsaXplL2F1ZGlvLXZpc3VhbGl6ZXInXG5cbmNvbnN0IGtleXMgPSB7XG4gICAgVk9MVU1FX0RPV046ICdsZWZ0JyxcbiAgICBWT0xVTUVfVVA6ICdyaWdodCcsXG4gICAgR0VUX0NVUlJFTlRfU09ORzogJ0MtYScsXG4gICAgRVhJVDogJ0MtYydcbn1cblxuY29uc3QgaW5pdCA9IGxvZmlTdHJlYW0gPT4ge1xuICAgIGNvbnN0IHNjcmVlbiA9IGJsZXNzZWQuc2NyZWVuKHtcbiAgICAgICAgc21hcnRDU1I6IHRydWUsXG4gICAgICAgIGdyYWJLZXlzOiB0cnVlXG4gICAgfSlcbiAgICBzY3JlZW4udGl0bGUgPSAnbG9maS1jbGknXG5cbiAgICBjb25zdCB0aXRsZSA9IGJsZXNzZWQudGV4dCh7XG4gICAgICAgIGxlZnQ6ICdjZW50ZXInLFxuICAgICAgICB0YWdzOiB0cnVlLFxuICAgICAgICBjb250ZW50OiAnIHtib2xkfUxPRkl7L2JvbGR9JyxcbiAgICAgICAgYWxpZ246ICdjZW50ZXInLFxuICAgICAgICBzdHlsZToge1xuICAgICAgICAgICAgYmc6ICcjYWQwMDZlJ1xuICAgICAgICB9XG4gICAgfSlcblxuICAgIGNvbnN0IGNvbnRyb2xzID0gY3JlYXRlQ29udHJvbHMoKVxuXG4gICAgc2NyZWVuLmFwcGVuZChjb250cm9scy5ib3gpXG4gICAgc2NyZWVuLmFwcGVuZCh0aXRsZSlcbiAgICBzY3JlZW4ucmVuZGVyKClcblxuICAgIGNvbnN0IGNsaSA9IHtcbiAgICAgICAgc2NyZWVuOiBzY3JlZW4sXG4gICAgICAgIGNvbnRyb2xzOiBjb250cm9sc1xuICAgIH1cbiAgICBzY3JlZW4ub24oJ2tleXByZXNzJywgb25LZXlQcmVzcyhjbGksIGxvZmlTdHJlYW0pKVxuXG4gICAgYXVkaW9WaXN1YWxpemVyKGxvZmlTdHJlYW0uc3RyZWFtLCB1cGRhdGVDb2xvcihjb250cm9scywgc2NyZWVuKSlcbiAgICByZXR1cm4gY2xpXG59XG5cbmNvbnN0IG9uS2V5UHJlc3MgPSAoY2xpLCBsb2ZpU3RyZWFtKSA9PiAoY2gsIGtleSkgPT4ge1xuICAgIGNvbnN0IG9mZnNldCA9IDAuMVxuICAgIHN3aXRjaCAoa2V5LmZ1bGwpIHtcbiAgICBjYXNlIGtleXMuVk9MVU1FX0RPV046XG4gICAgICAgIGlmIChsb2ZpU3RyZWFtLnZvbHVtZS52b2x1bWUgLSBvZmZzZXQgPj0gMCkgdXBkYXRlVm9sdW1lKGxvZmlTdHJlYW0udm9sdW1lLnZvbHVtZSAtIDAuMSwgY2xpLCBsb2ZpU3RyZWFtKVxuICAgICAgICBicmVha1xuICAgIGNhc2Uga2V5cy5WT0xVTUVfVVA6XG4gICAgICAgIGlmIChsb2ZpU3RyZWFtLnZvbHVtZS52b2x1bWUgKyBvZmZzZXQgPD0gMSkgdXBkYXRlVm9sdW1lKGxvZmlTdHJlYW0udm9sdW1lLnZvbHVtZSArIDAuMSwgY2xpLCBsb2ZpU3RyZWFtKVxuICAgICAgICBicmVha1xuICAgIGNhc2Uga2V5cy5HRVRfQ1VSUkVOVF9TT05HOlxuICAgICAgICBkZXRlY3RTb25nKCkudGhlbihzb25nID0+IGNvbnNvbGUubG9nKGBDdXJyZW50IHNvbmc6ICR7c29uZ31gKSlcbiAgICAgICAgYnJlYWtcbiAgICBjYXNlIGtleXMuRVhJVDpcbiAgICAgICAgcHJvY2Vzcy5leGl0KDEpXG4gICAgfVxufVxuXG5jb25zdCB1cGRhdGVWb2x1bWUgPSAodm9sdW1lLCBjbGksIGxvZmlTdHJlYW0pID0+IHtcbiAgICBsb2ZpU3RyZWFtLnZvbHVtZS5zZXRWb2x1bWUodm9sdW1lKVxuICAgIGNsaS5jb250cm9scy52b2x1bWUgPSB2b2x1bWVcbiAgICB1cGRhdGVDb250cm9scyhjbGkuY29udHJvbHMpXG4gICAgdXBkYXRlU2NyZWVuKGNsaSlcbn1cblxuY29uc3QgdXBkYXRlU2NyZWVuID0gY2xpID0+IGNsaS5zY3JlZW4ucmVuZGVyKClcblxuZXhwb3J0IGRlZmF1bHQgaW5pdFxuIl19