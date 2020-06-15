"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _logger = _interopRequireDefault(require("../logger"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var fft = require('jsfft');

console.log(fft);
var buffers = [];

var audioVisualizer = function audioVisualizer(stream, updateColor) {
  stream.on('data', function (chunk) {
    // Do some stuff to interpolate the color from the frequency
    if (buffers.length === 512) {
      updateColor('#FFFF');
      buffers = [];
      console.log('done');
    } else {
      buffers.push(chunk);
      var data = new fft.ComplexArray(512).map(function (value, i, n) {
        value.real = i > n / 3 && i < 2 * n / 3 ? 1 : 0;
      });
      var frequencies = data.FFT(); // Implement a low-pass filter using the in-place mapper.

      frequencies.map(function (frequency, i, n) {
        if (i > n / 5 && i < 4 * n / 5) {
          frequency.real = 0;
          frequency.imag = 0;
        }
      });
      updateColor('#' + decimalToHexString(Math.pow(16, 6) / (frequencies.real['0'] * 1000)));
    }
  });
};

var decimalToHexString = function decimalToHexString(number) {
  if (number < 0) {
    number = 0xFFFFFFFF + number + 1;
  }

  return number.toString(16).toUpperCase();
};

var _default = audioVisualizer;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hdWRpby12aXN1YWxpemUvYXVkaW8tdmlzdWFsaXplci5qcyJdLCJuYW1lcyI6WyJmZnQiLCJyZXF1aXJlIiwiY29uc29sZSIsImxvZyIsImJ1ZmZlcnMiLCJhdWRpb1Zpc3VhbGl6ZXIiLCJzdHJlYW0iLCJ1cGRhdGVDb2xvciIsIm9uIiwiY2h1bmsiLCJsZW5ndGgiLCJwdXNoIiwiZGF0YSIsIkNvbXBsZXhBcnJheSIsIm1hcCIsInZhbHVlIiwiaSIsIm4iLCJyZWFsIiwiZnJlcXVlbmNpZXMiLCJGRlQiLCJmcmVxdWVuY3kiLCJpbWFnIiwiZGVjaW1hbFRvSGV4U3RyaW5nIiwiTWF0aCIsInBvdyIsIm51bWJlciIsInRvU3RyaW5nIiwidG9VcHBlckNhc2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFDQTs7OztBQURBLElBQU1BLEdBQUcsR0FBR0MsT0FBTyxDQUFDLE9BQUQsQ0FBbkI7O0FBR0FDLE9BQU8sQ0FBQ0MsR0FBUixDQUFZSCxHQUFaO0FBQ0EsSUFBSUksT0FBTyxHQUFHLEVBQWQ7O0FBQ0EsSUFBTUMsZUFBZSxHQUFHLFNBQWxCQSxlQUFrQixDQUFDQyxNQUFELEVBQVNDLFdBQVQsRUFBeUI7QUFDN0NELEVBQUFBLE1BQU0sQ0FBQ0UsRUFBUCxDQUFVLE1BQVYsRUFBa0IsVUFBQUMsS0FBSyxFQUFJO0FBQ3ZCO0FBRUEsUUFBSUwsT0FBTyxDQUFDTSxNQUFSLEtBQW1CLEdBQXZCLEVBQTRCO0FBQ3hCSCxNQUFBQSxXQUFXLENBQUMsT0FBRCxDQUFYO0FBQ0FILE1BQUFBLE9BQU8sR0FBRyxFQUFWO0FBQ0FGLE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLE1BQVo7QUFDSCxLQUpELE1BSU87QUFDSEMsTUFBQUEsT0FBTyxDQUFDTyxJQUFSLENBQWFGLEtBQWI7QUFDQSxVQUFNRyxJQUFJLEdBQUcsSUFBSVosR0FBRyxDQUFDYSxZQUFSLENBQXFCLEdBQXJCLEVBQTBCQyxHQUExQixDQUE4QixVQUFDQyxLQUFELEVBQVFDLENBQVIsRUFBV0MsQ0FBWCxFQUFpQjtBQUN4REYsUUFBQUEsS0FBSyxDQUFDRyxJQUFOLEdBQWNGLENBQUMsR0FBR0MsQ0FBQyxHQUFHLENBQVIsSUFBYUQsQ0FBQyxHQUFHLElBQUlDLENBQUosR0FBUSxDQUExQixHQUErQixDQUEvQixHQUFtQyxDQUFoRDtBQUNILE9BRlksQ0FBYjtBQUlBLFVBQU1FLFdBQVcsR0FBR1AsSUFBSSxDQUFDUSxHQUFMLEVBQXBCLENBTkcsQ0FPSDs7QUFDQUQsTUFBQUEsV0FBVyxDQUFDTCxHQUFaLENBQWdCLFVBQUNPLFNBQUQsRUFBWUwsQ0FBWixFQUFlQyxDQUFmLEVBQXFCO0FBQ2pDLFlBQUlELENBQUMsR0FBR0MsQ0FBQyxHQUFHLENBQVIsSUFBYUQsQ0FBQyxHQUFHLElBQUlDLENBQUosR0FBUSxDQUE3QixFQUFnQztBQUM1QkksVUFBQUEsU0FBUyxDQUFDSCxJQUFWLEdBQWlCLENBQWpCO0FBQ0FHLFVBQUFBLFNBQVMsQ0FBQ0MsSUFBVixHQUFpQixDQUFqQjtBQUNIO0FBQ0osT0FMRDtBQU9BZixNQUFBQSxXQUFXLENBQUMsTUFBTWdCLGtCQUFrQixDQUFDQyxJQUFJLENBQUNDLEdBQUwsQ0FBUyxFQUFULEVBQWEsQ0FBYixLQUFtQk4sV0FBVyxDQUFDRCxJQUFaLENBQWlCLEdBQWpCLElBQXdCLElBQTNDLENBQUQsQ0FBekIsQ0FBWDtBQUNIO0FBQ0osR0F4QkQ7QUF5QkgsQ0ExQkQ7O0FBNEJBLElBQU1LLGtCQUFrQixHQUFHLFNBQXJCQSxrQkFBcUIsQ0FBQUcsTUFBTSxFQUFJO0FBQ2pDLE1BQUlBLE1BQU0sR0FBRyxDQUFiLEVBQWdCO0FBQ1pBLElBQUFBLE1BQU0sR0FBRyxhQUFhQSxNQUFiLEdBQXNCLENBQS9CO0FBQ0g7O0FBQ0QsU0FBT0EsTUFBTSxDQUFDQyxRQUFQLENBQWdCLEVBQWhCLEVBQW9CQyxXQUFwQixFQUFQO0FBQ0gsQ0FMRDs7ZUFPZXZCLGUiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBmZnQgPSByZXF1aXJlKCdqc2ZmdCcpXG5pbXBvcnQgbG9nZ2VyIGZyb20gJy4uL2xvZ2dlcidcblxuY29uc29sZS5sb2coZmZ0KVxubGV0IGJ1ZmZlcnMgPSBbXVxuY29uc3QgYXVkaW9WaXN1YWxpemVyID0gKHN0cmVhbSwgdXBkYXRlQ29sb3IpID0+IHtcbiAgICBzdHJlYW0ub24oJ2RhdGEnLCBjaHVuayA9PiB7XG4gICAgICAgIC8vIERvIHNvbWUgc3R1ZmYgdG8gaW50ZXJwb2xhdGUgdGhlIGNvbG9yIGZyb20gdGhlIGZyZXF1ZW5jeVxuXG4gICAgICAgIGlmIChidWZmZXJzLmxlbmd0aCA9PT0gNTEyKSB7XG4gICAgICAgICAgICB1cGRhdGVDb2xvcignI0ZGRkYnKVxuICAgICAgICAgICAgYnVmZmVycyA9IFtdXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnZG9uZScpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBidWZmZXJzLnB1c2goY2h1bmspXG4gICAgICAgICAgICBjb25zdCBkYXRhID0gbmV3IGZmdC5Db21wbGV4QXJyYXkoNTEyKS5tYXAoKHZhbHVlLCBpLCBuKSA9PiB7XG4gICAgICAgICAgICAgICAgdmFsdWUucmVhbCA9IChpID4gbiAvIDMgJiYgaSA8IDIgKiBuIC8gMykgPyAxIDogMFxuICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgY29uc3QgZnJlcXVlbmNpZXMgPSBkYXRhLkZGVCgpXG4gICAgICAgICAgICAvLyBJbXBsZW1lbnQgYSBsb3ctcGFzcyBmaWx0ZXIgdXNpbmcgdGhlIGluLXBsYWNlIG1hcHBlci5cbiAgICAgICAgICAgIGZyZXF1ZW5jaWVzLm1hcCgoZnJlcXVlbmN5LCBpLCBuKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGkgPiBuIC8gNSAmJiBpIDwgNCAqIG4gLyA1KSB7XG4gICAgICAgICAgICAgICAgICAgIGZyZXF1ZW5jeS5yZWFsID0gMFxuICAgICAgICAgICAgICAgICAgICBmcmVxdWVuY3kuaW1hZyA9IDBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICB1cGRhdGVDb2xvcignIycgKyBkZWNpbWFsVG9IZXhTdHJpbmcoTWF0aC5wb3coMTYsIDYpIC8gKGZyZXF1ZW5jaWVzLnJlYWxbJzAnXSAqIDEwMDApKSlcbiAgICAgICAgfVxuICAgIH0pXG59XG5cbmNvbnN0IGRlY2ltYWxUb0hleFN0cmluZyA9IG51bWJlciA9PiB7XG4gICAgaWYgKG51bWJlciA8IDApIHtcbiAgICAgICAgbnVtYmVyID0gMHhGRkZGRkZGRiArIG51bWJlciArIDFcbiAgICB9XG4gICAgcmV0dXJuIG51bWJlci50b1N0cmluZygxNikudG9VcHBlckNhc2UoKVxufVxuXG5leHBvcnQgZGVmYXVsdCBhdWRpb1Zpc3VhbGl6ZXJcbiJdfQ==