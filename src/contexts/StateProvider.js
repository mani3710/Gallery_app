import React, {cloneElement} from 'react';

import {ThemeProvider} from './theme';

const ProviderComposer = ({contexts, children}) => {
  return contexts.reduceRight(
    (kids, parent) => cloneElement(parent, {children: kids}),
    children,
  );
};

const StateProvider = ({children}) => {
  return (
    <ProviderComposer contexts={[<ThemeProvider />]}>
      {children}
    </ProviderComposer>
  );
};

export default StateProvider;
