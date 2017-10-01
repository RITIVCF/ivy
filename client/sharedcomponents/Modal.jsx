import React, {PropTypes} from 'react';
import { inject } from 'narcissus';
import {ModalContainer, ModalDialog} from 'react-modal-dialog';

Modal = function({children, open, onClose}){
	if(open){
		return (
			<ModalContainer className={className} style={styles.Container} onClose={()=>{onClose()}}>
				<ModalDialog style={styles.Dialog} onClose={()=>{onClose()}}>
					{open&&children}
				</ModalDialog>
			</ModalContainer>
		)
	} else {
		return null;
	}
}

const styles = {
	"Container": {
		cursor: "default"
	},
	"Dialog": {
		cursor: "default",
		width: "80%",
		height: "auto"
	}
};

const className = inject({
  cursor: 'default',
});
