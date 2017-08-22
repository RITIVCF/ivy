import React from 'react';
import EmailIFrame from '../email/EmailIFrame.jsx';

export var BlankLayout = ({content}) => (   // export const MainLayout
  <div>
		<EmailIFrame contentstring={content} />
	</div>
)
