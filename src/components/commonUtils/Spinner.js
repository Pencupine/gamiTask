import React from 'react';
import { Spinner, Intent } from '@blueprintjs/core';

export default () => {
	return (
		<div className="text-center m-auto">
			<div style={{ paddingTop: '40%' }} />
			<Spinner size={Spinner.SIZE_STANDARD} intent={Intent.PRIMARY} />
		</div>
	);
};
