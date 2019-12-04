import React, { Component } from 'react';
import { Icon } from '@blueprintjs/core';

import TreeComp from '../../menu/TreeComp';

class SideBar extends Component {
	render() {
		return (
			<div>
				<div className="navBarPadding" />
				<div className="sidebar" style={{ backgroundColor: '#381F46', height: '93.90vh' }}>
					{/* <div className="row"> */}
					<div className="row">
						<div
							className="col-md-1 text-center"
							style={{
								height: '93.90vh',
								width: '65px',
								backgroundColor: '#2D1B36'
							}}
						>
							<div style={{ width: '40px', paddingLeft: '8px' }}>
								<div className="navBarPadding" />
								<button
									className="bp3-button bp3-minimal bp3-intent-primary non-dragable"
									style={{ marginTop: '3px' }}
								>
									<Icon icon="new-object" iconSize={20} />
								</button>
								<button
									className="bp3-button bp3-minimal bp3-intent-primary non-dragable"
									style={{ marginTop: '3px' }}
								>
									<Icon icon="new-link" iconSize={20} />
								</button>
								<button
									className="bp3-button bp3-minimal bp3-intent-primary  non-dragable"
									style={{ marginTop: '3px' }}
								>
									<Icon icon="document" iconSize={20} />
								</button>
								<hr
									style={{
										paddingLeft: '33px',
										color: '#657a8b',
										opacity: '0.4'
									}}
								/>
								<button className="bp3-button bp3-minimal  non-dragable" style={{ marginTop: '3px' }}>
									<Icon icon="add" iconSize={20} />
								</button>
								<button className="bp3-button bp3-minimal non-dragable" style={{ marginTop: '3px' }}>
									<Icon icon="new-text-box" iconSize={20} />
								</button>
								<button className="bp3-button bp3-minimal  non-dragable" style={{ marginTop: '3px' }}>
									<Icon icon="th" iconSize={20} />
								</button>
								<hr
									style={{
										paddingLeft: '33px',
										color: '#657a8b',
										opacity: '0.4'
									}}
								/>
								<button className="bp3-button bp3-minimal  non-dragable" style={{ marginTop: '3px' }}>
									<Icon icon="edit" iconSize={20} />
								</button>
								<button className="bp3-button bp3-minimal  non-dragable" style={{ marginTop: '3px' }}>
									<Icon icon="cut" iconSize={20} />
								</button>
								<button className="bp3-button bp3-minimal  non-dragable" style={{ marginTop: '3px' }}>
									<Icon icon="duplicate" iconSize={20} />
								</button>
								<button className="bp3-button bp3-minimal  non-dragable" style={{ marginTop: '3px' }}>
									<Icon icon="clipboard" iconSize={20} />
								</button>
								<hr
									style={{
										paddingLeft: '33px',
										color: '#657a8b',
										opacity: '0.4'
									}}
								/>
								<button className="bp3-button bp3-minimal  non-dragable" style={{ marginTop: '3px' }}>
									<Icon icon="delete" iconSize={20} />
								</button>
							</div>
						</div>
						<div className="col">{this.props.menuOpen ? <TreeComp /> : ' '}</div>
					</div>
				</div>
			</div>
		);
	}
}

export default SideBar;
