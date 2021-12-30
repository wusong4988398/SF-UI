import React, { Component } from 'react';

import * as _memoryCacher from '../../model/memoryCacher'


/**
 *表单状态变化上下文
 */
  //const FormStatusContext = React.createContext<Object>('');
  let FormStatusContext = React.createContext();
  //FormStatusContext.displayName = 'FormStatusContext';

  export default FormStatusContext;