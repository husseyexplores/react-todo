import React from 'react';

// Development component
const ReflectState = props => (
  <pre
    style={{
      background: '#323640',
      fontSize: '1.3rem',
      padding: '1.5rem',
      color: '#fff',
    }}
  ><code><strong style={{ color: '#ffbe00' }}>state</strong> ={' '}
    {JSON.stringify(props, null, 2)}
    </code></pre>
);

export default ReflectState;