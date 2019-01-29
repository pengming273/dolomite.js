Object.defineProperty(exports, '__esModule', {
  value: true
});

/*
 * export a Package instance from a `/packageName` directory
 */

exports['default'] = function (registry, packageInstance) {
  Object.defineProperty(registry, '__esModule', { value: true });

  Object.keys(packageInstance.exports).forEach(function (exportName) {
    registry[exportName] = packageInstance.exports[exportName];
  });

  registry['default'] = packageInstance;
};

module.exports = exports['default'];