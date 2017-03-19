(function() {
  'use strict';

  angular
    .module('numbers')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
